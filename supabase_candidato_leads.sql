-- ==============================================================================
-- 🏛️ CANDIDATO CARLOS HENRIQUE - TABELA DE APOIADORES & VOLUNTÁRIOS (SUPABASE)
-- ==============================================================================
-- Execute este script no Supabase SQL Editor se desejar gravar os cadastros
-- de apoiadores diretamente no banco de dados do Supabase.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.candidato_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    cidade TEXT NOT NULL,
    tipo_apoio TEXT NOT NULL,
    mensagem TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar RLS (Row Level Security)
ALTER TABLE public.candidato_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir que visitantes anônimos da landing page cadastrem dados
DROP POLICY IF EXISTS "Permitir insercao anonima de apoiadores" ON public.candidato_leads;
CREATE POLICY "Permitir insercao anonima de apoiadores" 
ON public.candidato_leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Política para permitir leitura apenas para administradores/autenticados
DROP POLICY IF EXISTS "Permitir leitura de apoiadores apenas autenticado" ON public.candidato_leads;
CREATE POLICY "Permitir leitura de apoiadores apenas autenticado" 
ON public.candidato_leads 
FOR SELECT 
TO authenticated 
USING (true);

-- Notificar PostgREST para recarregar o schema cache
NOTIFY pgrst, 'reload schema';
