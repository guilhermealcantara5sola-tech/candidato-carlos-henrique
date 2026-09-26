# 🏛️ Landing Page Oficial - Deputado Estadual Carlos Henrique

Projeto independente desenvolvido para a divulgação de mandato, agenda oficial por Minas Gerais e captação de apoiadores/voluntários.

---

## 🔒 100% Isolado do Sistema SDG Delivery

- Este projeto reside exclusivamente dentro da pasta `candidato/`.
- O sistema de delivery (`SDG Delivery`) continua intacto, sem nenhuma dependência ou roteamento para este projeto.
- O build do delivery (`npm run build`) não acessa nem inclui esta landing page.

---

## ☁️ Hospedagem de Imagens no Supabase Storage

A foto oficial do candidato foi enviada para o **Supabase Storage** no bucket público `delivery-media`:

- **URL Pública da Foto:**  
  `https://xefvhpunadboqfibbefo.supabase.co/storage/v1/object/public/delivery-media/candidato/candidato.webp`

### Como subir novas imagens para o Supabase:
Você pode executar o script automático a qualquer momento:
```bash
node upload_to_supabase.js
```
O script lê as fotos locais e sincroniza diretamente com o Supabase Storage.

---

## 🚀 Como Publicar na Vercel com Novo Domínio

Como este repositório é exclusivo para a landing page, o deploy na Vercel é direto:

### Opção 1: Pelo Painel Web da Vercel (Recomendado)
1. Acesse [vercel.com](https://vercel.com) e clique em **"Add New... -> Project"**.
2. Selecione o repositório **`candidato-carlos-henrique`**.
3. Deixe todas as opções como padrão (Root Directory `./` e Framework Preset **"Other"**).
4. Clique em **Deploy**.
5. Em **Settings -> Domains**, adicione o domínio desejado (ex: `carloshenriquemg.com.br`).

### Opção 2: Pelo Terminal (Vercel CLI)
Dentro da pasta `candidato`, execute:
```bash
npx vercel --prod
```


---

## 💾 Banco de Dados de Apoiadores (Opcional)

A landing page já está configurada com o cliente do Supabase. Para que os formulários de voluntários fiquem salvos em uma tabela própria no Supabase:

1. Acesse o **SQL Editor** do seu projeto Supabase (`https://supabase.com/dashboard/project/xefvhpunadboqfibbefo/sql`).
2. Cole e execute o conteúdo do arquivo [`supabase_candidato_leads.sql`](supabase_candidato_leads.sql).
3. Pronto! Sempre que um apoiador preencher o formulário, os dados serão salvos na tabela `candidato_leads`, com fallback automático para o WhatsApp do gabinete.

---

## 💻 Testando Localmente

Para rodar a landing page na sua máquina:
```bash
npx serve .
```
Ou dê dois cliques no arquivo `index.html` para abrir diretamente no navegador.
