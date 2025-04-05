import { readFile, writeFile } from 'fs/promises';
import crypto from 'crypto';

// Function to generate a 32-character random hash
function generateHash() {
  return crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex chars
}

// Path to the scss.hbs file
const scssFilePath = './build/font/scss.hbs';

async function replaceHashInFile() {
  try {
    // Read the content of scss.hbs
    let content = await readFile(scssFilePath, 'utf8');

    // Generate a new hash
    const newHash = generateHash();
    console.log(`Generated Hash: ${newHash}`);

    // Replace the existing hash in the file
    const updatedContent = content.replace(/font-hash: "([^"]+)"/, `font-hash: "${newHash}"`);

    // Write the updated content back to the file
    await writeFile(scssFilePath, updatedContent, 'utf8');
    console.log('Hash updated successfully in scss.hbs');

  } catch (error) {
    console.error('Error updating hash:', error);
  }
}

// Run the function to replace the hash
replaceHashInFile();
