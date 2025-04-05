// generate-index.js
const fs = require('fs');
const path = require('path');

// Fixed input/output
const inputDir = path.resolve('blocks-src/icon/icons');
const indexFile = path.join(inputDir, 'index.js');

// Parse --first param if passed, e.g. --first=equalstrue
const firstParam = process.argv.find(arg => arg.startsWith('--first='));
const firstName = firstParam ? firstParam.replace('--first=', '') : null;

// List .js files excluding index.js
let files = fs.readdirSync(inputDir).filter(file => {
	return file.endsWith('.js') && file !== 'index.js';
});

// Move the `--first` file to the beginning if it exists
if (firstName) {
	const firstFile = `${firstName}.js`;
	const index = files.indexOf(firstFile);
	if (index > -1) {
		files.splice(index, 1);
		files.unshift(firstFile);
	}
}

const importStatements = [];
const iconNames = [];
const iconsMapEntries = [];

files.forEach(file => {
	const filepath = path.join(inputDir, file);
	const content = fs.readFileSync(filepath, 'utf-8');

	// Match: export const MyIcon = ...
	const match = content.match(/export const (\w+)/);
	if (!match) return;

	const componentName = match[1];
	const filename = path.basename(file, '.js');

	importStatements.push(`import { ${componentName} } from './${filename}';`);
	iconNames.push(componentName);
	iconsMapEntries.push(`\t'${filename}': ${componentName},`);
});

// Generate index.js content
const indexContent = [
	'// This file is generated. Do not modify it manually.',
	...importStatements,
	'',
	'const iconsMap = {',
	...iconsMapEntries,
	'};',
	'',
	'export {',
	...iconNames.map(name => `\t${name},`),
	'\ticonsMap',
	'};'
].join('\n');

// Write the file
fs.writeFileSync(indexFile, indexContent);
console.log(`Generated: ${indexFile}`);
