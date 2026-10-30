import { defineConfig } from 'vite';

export default defineConfig(() => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY. Add both in Vercel Project Settings > Environment Variables.');
  }

  return {
    plugins: [{
      name: 'inject-supabase-public-config',
      transformIndexHtml(html) {
        return html
          .replace('__SUPABASE_URL__', JSON.stringify(supabaseUrl))
          .replace('__SUPABASE_ANON_KEY__', JSON.stringify(supabaseAnonKey));
      }
    }],
    build: { outDir: 'dist', emptyOutDir: true }
  };
});
