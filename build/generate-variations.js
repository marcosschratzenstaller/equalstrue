// generate-variations.js
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve('blocks-src/icon/icons');
const outputDir = path.resolve('blocks-src/icon-path');
const variationsFile = path.join(outputDir, 'variations.js');
const indexFile = path.join(inputDir, 'index.js');

// Parse --capitalize=equalstrue:Equals True,foo-bar:Foo Bar
const capitalizeArg = process.argv.find(arg => arg.startsWith('--capitalize='));
const capitalizations = {};
if (capitalizeArg) {
	const raw = capitalizeArg.replace('--capitalize=', '');
	raw.split(',').forEach(pair => {
		const [key, value] = pair.split(':');
		if (key && value) capitalizations[key.trim()] = value.trim();
	});
}

fs.mkdirSync(outputDir, { recursive: true });
if (fs.existsSync(variationsFile)) fs.unlinkSync(variationsFile);

// Read icon order from index.js
const indexContent = fs.readFileSync(indexFile, 'utf-8');
const matches = [...indexContent.matchAll(/^\s*(\w+Icon),?$/gm)];
const orderedComponents = matches.map(match => match[1]);

// Helper: convert "ArrowUpRightIcon" → "arrow-up-right"
const toKebabCase = (str) =>
	str.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/-icon$/, '');

// Helper: convert kebab case to title ("arrow-up-right" → "Arrow up right")
const toTitle = (kebab) =>
	kebab.split('-')
		.map((word, i) =>
			i === 0
				? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
				: word.toLowerCase()
		)
		.join(' ');

// Build variations using the order from index.js
const importStatements = new Set();
const variations = [];

orderedComponents.forEach((componentName, i) => {
	// Remove "Icon" and prepare keys
	const rawName = componentName.replace(/Icon$/, ''); // e.g. "EqualsTrue"
	const lowerRaw = rawName.toLowerCase();              // e.g. "equalstrue"
	const kebabName = toKebabCase(componentName);        // e.g. "arrow-up-right"

	// If a capitalization exception exists, use the key (without híphen) e o valor informado;
	// caso contrário, use o kebabName e a conversão padrão para title.
	const hasCustom = Object.prototype.hasOwnProperty.call(capitalizations, lowerRaw);
	const name = hasCustom ? lowerRaw : kebabName;
	const title = hasCustom ? capitalizations[lowerRaw] : toTitle(kebabName);

	importStatements.add(`import { ${componentName} } from '../icon/icons';`);

	variations.push(
		`	{` +
		`\n\t\tisDefault: ${i === 0},` +
		`\n\t\tname: '${name}',` +
		`\n\t\ttitle: '${title}',` +
		`\n\t\ticon: ${componentName},` +
		`\n\t\tattributes: { name: '${name}' }` +
		`\n\t}`
	);
});

// Compose final output
const output = [
	'// This file is generated. Do not modify it manually.',
	...importStatements,
	'',
	'const variations = [',
	variations.join(',\n'),
	'];',
	'',
	'variations.forEach((variation) => {',
	'	if (variation.isActive) return;',
	'	variation.isActive = (blockAttributes, variationAttributes) =>',
	'		blockAttributes.name === variationAttributes.name;',
	'});',
	'',
	'export default variations;'
].join('\n');

fs.writeFileSync(variationsFile, output);
console.log(`Generated: ${variationsFile}`);
