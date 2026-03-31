/**
 * AI Image Generation Script (FAL.AI - Placeholder)
 *
 * Generates supplementary/filler images using FAL.AI FLUX Schnell model.
 * Used for: backgrounds, atmospheric fills, texture overlays.
 * NEVER for: project photos, team photos, or anything presented as real work.
 *
 * Requires FAL_KEY environment variable.
 *
 * Usage: FAL_KEY=xxx node scripts/generate-images.js
 *
 * TODO: Wire up FAL.AI API when ready.
 */

import fs from 'node:fs';
import path from 'node:path';

const FAL_KEY = process.env.FAL_KEY;
const OUTPUT_DIR = './public/media/generated';

if (!FAL_KEY) {
  console.log('FAL.AI image generation requires the FAL_KEY environment variable.');
  console.log('\nTo set up:');
  console.log('1. Sign up at https://fal.ai');
  console.log('2. Get your API key from the dashboard');
  console.log('3. Run: FAL_KEY=xxx node scripts/generate-images.js');
  console.log('\nThis script generates supplementary images only:');
  console.log('  - Soft-focus background images');
  console.log('  - Atmospheric construction/home scenes');
  console.log('  - Texture overlays for section backgrounds');
  console.log('\nNEVER use AI images for project photos or team photos.');
  process.exit(0);
}

const PROMPTS = [
  {
    name: 'hero-bg.webp',
    prompt: 'Professional warm photo of a beautiful suburban backyard at golden hour, well-maintained lawn, mature trees, warm natural lighting, soft focus, no people, residential neighborhood',
  },
  {
    name: 'construction-bg.webp',
    prompt: 'Warm soft-focus photo of professional woodworking tools on a clean workbench, saw dust, measuring tape, pencil, warm workshop lighting, no people, shallow depth of field',
  },
  {
    name: 'neighborhood-bg.webp',
    prompt: 'Aerial view of a quiet Midwest suburban neighborhood with tree-lined streets, well-maintained homes, warm afternoon light, soft focus, no people visible',
  },
];

async function generateImages() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Generating ${PROMPTS.length} supplementary images...`);

  for (const item of PROMPTS) {
    try {
      const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
        method: 'POST',
        headers: {
          'Authorization': `Key ${FAL_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: item.prompt,
          image_size: 'landscape_16_9',
          num_inference_steps: 4,
          num_images: 1,
        }),
      });

      const data = await response.json();
      if (data.images && data.images[0]) {
        const imgResponse = await fetch(data.images[0].url);
        const buffer = await imgResponse.arrayBuffer();
        const outputPath = path.join(OUTPUT_DIR, item.name);
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`  ✓ ${item.name}`);
      }
    } catch (err) {
      console.log(`  ✗ ${item.name}: ${err.message}`);
    }
  }

  console.log('\nDone. Generated images saved to:', OUTPUT_DIR);
}

generateImages().catch(console.error);
