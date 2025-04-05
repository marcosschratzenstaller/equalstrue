// convert-svg.js
const fs = require('fs');
const path = require('path');

// Fixed input/output directories
const inputDir = path.resolve('assets/icons');
const outputDir = path.resolve('blocks-src/icon/icons');

// Parse CLI args like --capitalize=equalstrue:EqualsTrue,foo-bar:Foobar
const exceptions = {};
const capitalizeArg = process.argv.find(arg => arg.startsWith('--capitalize='));

if (capitalizeArg) {
	const mappings = capitalizeArg.replace('--capitalize=', '').split(',');
	mappings.forEach(pair => {
		const [raw, formatted] = pair.split(':');
		if (raw && formatted) {
			exceptions[raw] = formatted;
		}
	});
}

// Convert filename to PascalCase + Icon
function toComponentName(filename) {
	if (exceptions[filename]) return exceptions[filename] + 'Icon';
	return (
		filename
			.split('-')
			.map(part => part.charAt(0).toUpperCase() + part.slice(1))
			.join('') + 'Icon'
	);
}

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Get all SVG files from input
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.svg'));

if (files.length === 0) {
	console.error(`No SVG files found in '${inputDir}'`);
	process.exit(1);
}

// Process each SVG
files.forEach(file => {
	const filePath = path.join(inputDir, file);
	const filename = path.basename(file, '.svg');
	const componentName = toComponentName(filename);
	const svgContent = fs.readFileSync(filePath, 'utf-8');

	const match = svgContent.match(/d="([^"]+)"/);
	if (!match) {
		console.warn(`Warning: No 'd' attribute found in ${file}, skipping...`);
		return;
	}

	const dValue = match[1];
	const outputFile = path.join(outputDir, `${filename}.js`);

	const componentCode = `// This file is generated. Do not modify it manually.
import { Path, SVG } from '@wordpress/primitives';

export const ${componentName} = () => (
	<SVG width="24" height="24" viewBox="0 0 24 24">
		<Path d="${dValue}" />
	</SVG>
);
`;

	fs.writeFileSync(outputFile, componentCode.trimStart());
	console.log(`Generated: ${outputFile}`);
});
