
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.notify_n8n_lead_webhook()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://lex-house-ai-n8n.7u9ufb.easypanel.host/webhook/leads_magnetsv1',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'email', NEW.email,
      'phone', NEW.phone,
      'company', NEW.company,
      'company_size', NEW.company_size,
      'industry', NEW.industry,
      'urgency', NEW.urgency,
      'pain_point', NEW.pain_point,
      'source', NEW.source,
      'created_at', NEW.created_at
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_n8n_lead_webhook ON public.leads;
CREATE TRIGGER trg_notify_n8n_lead_webhook
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.notify_n8n_lead_webhook();
