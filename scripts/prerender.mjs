import { launch } from 'puppeteer';
import { preview } from 'vite';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');

const ROUTES = [
  '/',
  '/roles/receptionist',
  '/roles/growth',
  '/roles/creator',
  '/contact',
  '/blog',
  '/blog/chat-bot-vs-ai-sotrudnik',
];

async function prerender() {
  console.log('Starting prerender...');

  const server = await preview({
    root: resolve(__dirname, '..'),
    preview: { port: 4173, strictPort: true },
  });

  const browser = await launch({ headless: true });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `http://localhost:4173${route}`;
    console.log(`  Rendering ${route}...`);

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('#root', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 2000));

    const html = await page.content();

    const filePath = route === '/'
      ? resolve(DIST, 'index.html')
      : resolve(DIST, route.slice(1), 'index.html');

    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, html);
    console.log(`  ✓ ${filePath}`);
  }

  await browser.close();
  server.httpServer.close();
  console.log(`\nPrerendered ${ROUTES.length} pages.`);
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
