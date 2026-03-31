/**
 * Google Drive Image Fetcher (Placeholder)
 *
 * Downloads client photos from a shared Google Drive folder.
 * Requires GOOGLE_DRIVE_FOLDER_ID and GOOGLE_API_KEY environment variables.
 *
 * Usage: GOOGLE_DRIVE_FOLDER_ID=xxx GOOGLE_API_KEY=yyy node scripts/fetch-drive-images.js
 *
 * TODO: Wire up Google Drive API when ready.
 */

import fs from 'node:fs';
import path from 'node:path';

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const OUTPUT_DIR = './raw-images';

if (!FOLDER_ID || !API_KEY) {
  console.log('Google Drive fetch requires environment variables:');
  console.log('  GOOGLE_DRIVE_FOLDER_ID - The shared folder ID');
  console.log('  GOOGLE_API_KEY - Your Google API key');
  console.log('\nTo set up:');
  console.log('1. Create a Google Cloud project');
  console.log('2. Enable the Google Drive API');
  console.log('3. Create an API key');
  console.log('4. Share the client photo folder with "Anyone with the link"');
  console.log('5. Copy the folder ID from the URL');
  console.log('\nThen run:');
  console.log('  GOOGLE_DRIVE_FOLDER_ID=xxx GOOGLE_API_KEY=yyy node scripts/fetch-drive-images.js');
  process.exit(0);
}

async function fetchDriveImages() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const listUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'image'&key=${API_KEY}&fields=files(id,name,mimeType)&pageSize=100`;

  console.log('Fetching file list from Google Drive...');

  const response = await fetch(listUrl);
  const data = await response.json();

  if (!data.files || data.files.length === 0) {
    console.log('No images found in the specified folder.');
    return;
  }

  console.log(`Found ${data.files.length} images. Downloading...`);

  for (const file of data.files) {
    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`;
    try {
      const imgResponse = await fetch(downloadUrl);
      const buffer = await imgResponse.arrayBuffer();
      const outputPath = path.join(OUTPUT_DIR, file.name);
      fs.writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`  ✓ ${file.name}`);
    } catch (err) {
      console.log(`  ✗ ${file.name}: ${err.message}`);
    }
  }

  console.log('\nDone. Run "npm run optimize-images" to convert to WebP.');
}

fetchDriveImages().catch(console.error);
