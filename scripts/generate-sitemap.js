import fs from 'fs';
import path from 'path';

const pages = [
  '/',
  '/about',
  '/events',
  '/competitions',
  '/officers',
  '/join',
  '/gallery',
  '/updates',
  '/resources'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>https://lehstsa.com${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

const distPath = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');
