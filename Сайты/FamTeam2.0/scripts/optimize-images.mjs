import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { resolve, join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const IMAGES_DIR = resolve(__dirname, '../public/images');

const OPTIMIZE = [
  { src: 'AIRECEPTIONIST1.png', out: 'ai-receptionist.webp', width: 800 },
  { src: 'AI GROWTH MANAGER.png', out: 'ai-growth-manager.webp', width: 800 },
  { src: 'AI CREATOR.png', out: 'ai-creator.webp', width: 800 },
  { src: 'logo.png', out: 'logo.webp', width: 400 },
];

const DELETE = [
  'AIRECEPTIONIST.png',
  'mascot-avatar.png',
  'Gemini_Generated_Image_r6mezfr6mezfr6me.png',
  'Gemini_Generated_Image_wstklxwstklxwstk.png',
];

async function run() {
  console.log('Optimizing images...\n');

  for (const { src, out, width } of OPTIMIZE) {
    const srcPath = join(IMAGES_DIR, src);
    const outPath = join(IMAGES_DIR, out);
    const srcSize = (statSync(srcPath).size / 1024 / 1024).toFixed(1);

    await sharp(srcPath)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(outPath);

    const outSize = (statSync(outPath).size / 1024).toFixed(0);
    console.log(`  ${src} (${srcSize}MB) → ${out} (${outSize}KB)`);
  }

  console.log('\nDeleting unused files...\n');
  for (const file of DELETE) {
    const path = join(IMAGES_DIR, file);
    try {
      unlinkSync(path);
      console.log(`  ✗ ${file}`);
    } catch {
      console.log(`  - ${file} (not found)`);
    }
  }

  // Delete originals that were converted
  console.log('\nDeleting originals...\n');
  for (const { src } of OPTIMIZE) {
    const path = join(IMAGES_DIR, src);
    try {
      unlinkSync(path);
      console.log(`  ✗ ${src}`);
    } catch {
      console.log(`  - ${src} (not found)`);
    }
  }

  console.log('\nDone!');
}

run();
