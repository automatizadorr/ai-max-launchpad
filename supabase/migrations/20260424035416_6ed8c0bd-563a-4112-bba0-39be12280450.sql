ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS industry text,
  ADD COLUMN IF NOT EXISTS company_size text,
  ADD COLUMN IF NOT EXISTS urgency text,
  ADD COLUMN IF NOT EXISTS source text;

ALTER TABLE public.leads ALTER COLUMN phone DROP NOT NULL;