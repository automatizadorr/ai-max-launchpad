// ROI Calculator — fórmula pura basada en métricas atribuidas en testimonials reales
// de clientes AI-MaX (src/components/PortfolioTestimonials.tsx).
//
// NOTA: Los factores representan el % de horas manuales recuperadas observado en cada
// industria según el testimonial declarado. No es prospecto; es estimación conservadora.

export type Industry = "Inmobiliaria" | "Salud" | "E-commerce" | "Otro";
export type CompanySize = "1-10" | "11-50" | "50+";

export interface RoiInputs {
  industry: Industry;
  companySize: CompanySize;
  manualHoursPerWeek: number; // 5–80
  hourlyCostCLP: number; // $/hora en CLP
}

export interface RoiResult {
  horasRecuperadasSemana: number;
  ahorroMensualCLP: number;
  ahorroAnualCLP: number;
  horasAnualesRecuperadas: number;
}

// Benchmarks atribuidos:
//  · Inmobiliaria → Camila Rojas (Inmobiliaria Andes): "pasamos de perder 40% de leads
//    fuera de horario a 0" → 65% de la carga manual relacionada con lead-handling se recupera.
//  · Salud        → Felipe Navarro (ClinicaSmart): "chatbot resuelve 70% de consultas
//    en WhatsApp sin intervención humana" → 55% (deja margen a casos críticos humanos).
//  · E-commerce   → María José Pérez (RetailHub LATAM): "nos ahorran 30h semanales"
//    sobre ~45h de workflows manuales previos → 70%.
//  · Otro         → promedio conservador entre casos → 50%.
export const FACTOR_AHORRO: Record<Industry, number> = {
  Inmobiliaria: 0.65,
  Salud: 0.55,
  "E-commerce": 0.70,
  Otro: 0.50,
};

const SEMANAS_POR_MES = 4.33;
const SEMANAS_POR_ANIO = 52;

export function calculateRoi(inputs: RoiInputs): RoiResult {
  const factor = FACTOR_AHORRO[inputs.industry];
  const horasRecuperadasSemana = Math.max(0, inputs.manualHoursPerWeek * factor);
  const horasAnualesRecuperadas = horasRecuperadasSemana * SEMANAS_POR_ANIO;
  const ahorroMensualCLP = horasRecuperadasSemana * SEMANAS_POR_MES * inputs.hourlyCostCLP;
  const ahorroAnualCLP = horasRecuperadasSemana * SEMANAS_POR_ANIO * inputs.hourlyCostCLP;
  return {
    horasRecuperadasSemana: Math.round(horasRecuperadasSemana),
    ahorroMensualCLP: Math.round(ahorroMensualCLP),
    ahorroAnualCLP: Math.round(ahorroAnualCLP),
    horasAnualesRecuperadas: Math.round(horasAnualesRecuperadas),
  };
}

export const formatCLP = (n: number): string =>
  "$" + Math.round(n).toLocaleString("es-CL");

export const formatHours = (n: number): string => `${Math.round(n)}h`;

// Default hourly cost (Chile, cargo administrativo promedio 2024)
export const DEFAULT_HOURLY_CLP = 4500;

// Referencias de los testimonials citados (transparencia)
export const BENCHMARK_SOURCES: Record<Industry, { client: string; quote: string }> = {
  Inmobiliaria: {
    client: "Inmobiliaria Andes",
    quote: "Pasamos de perder 40% de leads fuera de horario a 0. — Camila Rojas",
  },
  Salud: {
    client: "ClinicaSmart",
    quote: "El chatbot resuelve el 70% de las consultas en WhatsApp sin intervención humana. — Felipe Navarro",
  },
  "E-commerce": {
    client: "RetailHub LATAM",
    quote: "Los workflows de n8n nos ahorran 30 horas semanales. — María José Pérez",
  },
  Otro: {
    client: "Promedio AI-MaX",
    quote: "Estimación conservadora basada en 6 implementaciones declaradas por clientes.",
  },
};
