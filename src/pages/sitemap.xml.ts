export async function GET() {
  const base = 'https://laregularizacion.com';
  const today = new Date().toISOString().split('T')[0];
  const pages = ['/', '/en/', '/ar/', '/ur/', '/blog/'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url>\n    <loc>${base}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${p === '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' }});
}
