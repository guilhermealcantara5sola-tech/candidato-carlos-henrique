import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://xefvhpunadboqfibbefo.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jMT1I0AlK7UfHlP1mquu9g_btqHeum_';
const BUCKET_NAME = 'delivery-media';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadFile(filePath, destinationPath, contentType) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    console.log(`📤 Enviando ${filePath} para ${BUCKET_NAME}/${destinationPath}...`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(destinationPath, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`❌ Erro ao enviar ${filePath}:`, error.message);
      return null;
    }

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(destinationPath);
    console.log(`✅ Sucesso! URL pública: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (err) {
    console.error(`❌ Erro inesperado:`, err.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Iniciando sincronização de imagens com Supabase Storage...');
  
  const candidatoPhotoPath = path.join(__dirname, 'candidato.webp');
  if (fs.existsSync(candidatoPhotoPath)) {
    await uploadFile(candidatoPhotoPath, 'candidato/candidato.webp', 'image/webp');
  } else {
    console.warn('⚠️ Arquivo candidato.webp não encontrado na pasta candidato.');
  }

  console.log('🎉 Concluído com sucesso!');
}

main();
