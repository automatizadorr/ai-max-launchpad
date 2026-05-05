ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS rank smallint;
ALTER TABLE public.portfolio_projects DROP CONSTRAINT IF EXISTS portfolio_projects_rank_check;
ALTER TABLE public.portfolio_projects ADD CONSTRAINT portfolio_projects_rank_check CHECK (rank IS NULL OR rank BETWEEN 1 AND 3);
CREATE UNIQUE INDEX IF NOT EXISTS portfolio_projects_rank_unique ON public.portfolio_projects(rank) WHERE rank IS NOT NULL;