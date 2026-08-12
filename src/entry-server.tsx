import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { AppContent } from "./App";

/**
 * Entrada SSR usada solo en build-time por `prerender.mjs`.
 * Renderiza la app a HTML estático para inyectarlo en index.html
 * (mejora FCP/LCP: el hero se pinta antes de que cargue el JS).
 */
export function render(url: string): { html: string } {
  const helmetContext: Record<string, unknown> = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </HelmetProvider>
  );
  return { html };
}
