import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Building2, Globe2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NAP = {
  name: "AI-MaX — Automatización con IA y Desarrollo de Software",
  street: "La Serena",
  city: "La Serena",
  region: "Coquimbo",
  country: "Chile",
  postalCode: "1700000",
  phone: "+56971806730",
  phoneDisplay: "+56 9 7180 6730",
  email: "automatizador.ex@gmail.com",
  url: "https://ai-max.lovable.app",
  hours: "Lun a Vie · 09:00 – 19:00 (CLT)",
  geo: { lat: -29.9027, lng: -71.2519 },
};

const areas = [
  "La Serena", "Coquimbo", "Ovalle", "Vicuña", "Santiago",
  "Valparaíso", "Antofagasta", "Concepción", "Latinoamérica", "España",
];

const LocalSEO = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${NAP.url}/#localbusiness`,
    name: NAP.name,
    image: `${NAP.url}/favicon.png`,
    url: NAP.url,
    telephone: NAP.phone,
    email: NAP.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.street,
      addressLocality: NAP.city,
      addressRegion: NAP.region,
      postalCode: NAP.postalCode,
      addressCountry: "CL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.lat,
      longitude: NAP.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: areas.map((a) => ({ "@type": "Place", name: a })),
    sameAs: [
      "https://wa.me/56971806730",
      "https://ai-max.lovable.app",
    ],
  };

  return (
    <section
      id="seo-local"
      aria-label="Información de contacto local — AI-MaX La Serena, Chile"
      className="relative py-20 md:py-28 bg-background overflow-hidden"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      {/* subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-action uppercase mb-4">
            AI-MaX en La Serena · Chile
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-foreground leading-tight">
            Agencia de IA con base en{" "}
            <span className="text-gradient-primary">La Serena</span>, operando en toda Latinoamérica
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            Desarrollamos soluciones de inteligencia artificial, automatización de procesos
            y software a medida para empresas de la Región de Coquimbo, Chile y todo Latam.
            Atención remota y presencial.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* NAP card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Información oficial (NAP)
              </h3>
            </div>

            <dl className="space-y-5">
              <div className="flex gap-4">
                <Building2 className="w-5 h-5 text-action shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Razón comercial</dt>
                  <dd className="text-foreground font-semibold" itemProp="name">{NAP.name}</dd>
                </div>
              </div>

              <div className="flex gap-4" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <MapPin className="w-5 h-5 text-action shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dirección</dt>
                  <dd className="text-foreground">
                    <span itemProp="addressLocality">{NAP.city}</span>,{" "}
                    <span itemProp="addressRegion">Región de {NAP.region}</span>,{" "}
                    <span itemProp="addressCountry">{NAP.country}</span>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-action shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Teléfono / WhatsApp</dt>
                  <dd>
                    <a
                      href={`tel:${NAP.phone}`}
                      className="text-foreground font-semibold hover:text-action transition-colors"
                      itemProp="telephone"
                    >
                      {NAP.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-action shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${NAP.email}`}
                      className="text-foreground font-semibold hover:text-action transition-colors break-all"
                      itemProp="email"
                    >
                      {NAP.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-action shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Horario de atención</dt>
                  <dd className="text-foreground">{NAP.hours}</dd>
                </div>
              </div>

              <div className="flex gap-4">
                <Globe2 className="w-5 h-5 text-action shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Sitio web</dt>
                  <dd>
                    <a
                      href={NAP.url}
                      className="text-foreground font-semibold hover:text-action transition-colors"
                      itemProp="url"
                    >
                      ai-max.lovable.app
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </motion.div>

          {/* Map + areas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl overflow-hidden border border-border shadow-card aspect-[4/3] bg-muted">
              <iframe
                title="Ubicación de AI-MaX en La Serena, Chile"
                src="https://www.google.com/maps?q=La+Serena,+Coquimbo,+Chile&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card">
              <h3 className="font-display font-bold text-lg text-foreground mb-4">
                Zonas de atención
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label="Ciudades y regiones donde operamos">
                {areas.map((a) => (
                  <li key={a}>
                    <span className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-foreground text-sm font-medium">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                Trabajamos 100% en remoto con clientes de toda Latinoamérica y España.
                Reuniones presenciales disponibles en La Serena y Coquimbo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocalSEO;
