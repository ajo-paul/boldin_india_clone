-- Migration: 00004_create_advisors
-- Description: Creates the advisors and advisor_bookings tables

CREATE TABLE public.advisors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    hourly_rate NUMERIC NOT NULL DEFAULT 1500,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.advisor_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    advisor_id UUID NOT NULL REFERENCES public.advisors(id) ON DELETE CASCADE,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, COMPLETED, CANCELLED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_bookings ENABLE ROW LEVEL SECURITY;

-- Advisors table is fully readable by authenticated users
CREATE POLICY "Advisors are publicly readable" 
ON public.advisors FOR SELECT 
USING (true);

-- Bookings are readable/insertable by the owning user
CREATE POLICY "Users can view their own bookings" 
ON public.advisor_bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings" 
ON public.advisor_bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);
