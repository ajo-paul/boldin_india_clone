-- Migration: 00005_advisor_connections
-- Description: Creates the two-way invite connection and inbox schemas for Advisors

CREATE TABLE public.advisor_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    advisor_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, ACTIVE, REJECTED, TERMINATED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(advisor_id, client_id)
);

CREATE TABLE public.advisor_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    connection_id UUID NOT NULL REFERENCES public.advisor_connections(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS
ALTER TABLE public.advisor_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_messages ENABLE ROW LEVEL SECURITY;

-- Advisors and Clients can see their own connections
CREATE POLICY "Users can view their connections" 
ON public.advisor_connections FOR SELECT 
USING (auth.uid() = advisor_id OR auth.uid() = client_id);

CREATE POLICY "Advisors can create connections" 
ON public.advisor_connections FOR INSERT 
WITH CHECK (auth.uid() = advisor_id);

CREATE POLICY "Users can update their connection status"
ON public.advisor_connections FOR UPDATE
USING (auth.uid() = advisor_id OR auth.uid() = client_id);

-- Messages RLS: Can read/insert if you are part of the connection
CREATE POLICY "Users can view messages for their connections" 
ON public.advisor_messages FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.advisor_connections c 
        WHERE c.id = connection_id AND (c.advisor_id = auth.uid() OR c.client_id = auth.uid())
    )
);

CREATE POLICY "Users can send messages" 
ON public.advisor_messages FOR INSERT 
WITH CHECK (auth.uid() = sender_id);
