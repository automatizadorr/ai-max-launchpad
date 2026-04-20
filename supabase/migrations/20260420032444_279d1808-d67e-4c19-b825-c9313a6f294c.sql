CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  project_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolio projects are viewable by everyone"
ON public.portfolio_projects
FOR SELECT
USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portfolio_projects_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.portfolio_projects (title, description, project_url, image_url, category, display_order) VALUES
('Asistente de Voz IA para Inmobiliaria', 'Agente de voz que califica leads 24/7 vía llamadas inbound y outbound, integrado con CRM. Aumentó conversión en 280%.', 'https://ejemplo.com/proyecto-1', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop', 'Voz IA', 1),
('Plataforma LegalTech con Análisis de Contratos', 'Portal con IA que analiza contratos en segundos, búsqueda semántica y dashboards corporativos para estudio jurídico.', 'https://ejemplo.com/proyecto-2', 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1200&h=800&fit=crop', 'PropTech / LegalTech', 2),
('Automatización n8n Multicanal Retail', 'Workflows que conectan WhatsApp, CRM, ERP y email marketing. Redujo tareas manuales en 70%.', 'https://ejemplo.com/proyecto-3', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop', 'Automatización', 3);