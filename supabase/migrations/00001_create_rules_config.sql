-- Migration: 00001_create_rules_config
-- Description: Creates the dynamic rule engine configuration table

CREATE TABLE public.rules_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    value JSONB NOT NULL,
    effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.rules_config ENABLE ROW LEVEL SECURITY;

-- Everyone can read rules config
CREATE POLICY "Rules config is publicly readable" 
ON public.rules_config FOR SELECT 
USING (true);

-- Only service role (or admins) can insert/update/delete
-- Since this is an admin table, we don't define public write policies.
