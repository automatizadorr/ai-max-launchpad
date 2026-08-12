// Prerender build-time: inyecta el HTML del árbol React (SSR) dentro de dist/index.html
// para que el hero y el contenido estático se pinten antes de cargar el JS (mejor FCP/LCP).
// Se ejecuta al final de `npm run build`, tras el build de cliente y el de SSR.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import Beasties from "beasties";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "server-dist", "entry-server.js");

const template = readFileSync(path.join(dist, "index.html"), "utf-8");

// Shim de Web Storage: algunas libs (p.ej. supabase-js) tocan localStorage al importarse.
// En Node 25 el `localStorage` nativo lanza sin `--localstorage-file`; lo reemplazamos por
// un stub en memoria (los componentes solo leen storage en efectos, no en render).
const memoryStorage = () => {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    clear: () => map.clear(),
    key: (i) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  };
};
for (const name of ["localStorage", "sessionStorage"]) {
  Object.defineProperty(globalThis, name, {
    value: memoryStorage(),
    writable: true,
    configurable: true,
  });
}

const { render } = await import(pathToFileURL(serverEntry).href);

// Inlinea la CSS crítica (above-the-fold) y difiere el resto → deja de bloquear el render.
// pruneSource:false conserva la hoja completa (se carga diferida) como red de seguridad.
const beasties = new Beasties({
  path: dist,
  publicPath: "/",
  preload: "swap",
  pruneSource: false,
  reduceInlineStyles: false,
  logLevel: "silent",
});

// Solo la home: es la ruta crítica de conversión y la que mide Lighthouse.
const routes = ["/"];

for (const url of routes) {
  const { html } = render(url);
  const marker = '<div id="root"></div>';
  if (!template.includes(marker)) {
    throw new Error(`No se encontró "${marker}" en dist/index.html`);
  }
  const merged = template.replace(marker, `<div id="root">${html}</div>`);
  const out = await beasties.process(merged);
  writeFileSync(path.join(dist, "index.html"), out, "utf-8");
  console.log(`✓ prerender+critical-css ${url} → dist/index.html (${(out.length / 1024).toFixed(1)} KB)`);
}

// El bundle SSR no se despliega: se limpia.
rmSync(path.join(root, "server-dist"), { recursive: true, force: true });
