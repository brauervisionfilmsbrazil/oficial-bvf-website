-- Create storage bucket for client logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-logos', 'client-logos', true);

-- Create policy for public read access on client logos
CREATE POLICY "Public can view client logos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'client-logos');

-- Create policy for authenticated users to upload (for admin purposes)
CREATE POLICY "Authenticated users can upload client logos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'client-logos');

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_path TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Public read access for clients
CREATE POLICY "Anyone can view clients"
ON public.clients
FOR SELECT
USING (true);