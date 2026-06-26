-- Migration: 00003_create_portfolios
-- Description: Creates the portfolios table for storing user assets

CREATE TABLE public.portfolios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    asset_class VARCHAR(50) NOT NULL, -- e.g. 'EPF', 'PPF', 'NPS', 'MUTUAL_FUND', 'FD', 'STOCK'
    institution_name VARCHAR(255),
    current_value NUMERIC NOT NULL DEFAULT 0,
    monthly_contribution NUMERIC NOT NULL DEFAULT 0,
    expected_return NUMERIC, -- Only relevant for variable assets like mutual funds or stocks
    metadata JSONB, -- Flexible storage for folio numbers or CAS statement refs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast queries
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);

-- RLS Policies
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Users can read their own portfolio
CREATE POLICY "Users can view their own portfolio" 
ON public.portfolios FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert into their own portfolio
CREATE POLICY "Users can insert into their own portfolio" 
ON public.portfolios FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own portfolio
CREATE POLICY "Users can update their own portfolio" 
ON public.portfolios FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own portfolio
CREATE POLICY "Users can delete their own portfolio" 
ON public.portfolios FOR DELETE 
USING (auth.uid() = user_id);
