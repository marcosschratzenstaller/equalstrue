#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import picocolors from 'picocolors'
import { loadConfig, optimize } from 'svgo'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const iconsDir = path.join(__dirname, '../assets/icons/')

const VERBOSE = process.argv.includes('--verbose')

async function processFile(file, config) {
	const filepath = path.join(iconsDir, file)
	const basename = path.basename(file, '.svg')
	console.log(filepath);
	console.log(basename);

	const originalSvg = await fs.readFile(filepath, 'utf8')
	const { data: optimizedSvg } = await optimize(originalSvg, { path: filepath, ...config })

	// svgo will always add a final newline when in pretty mode
	const resultSvg = optimizedSvg.trim()

	if (resultSvg !== originalSvg) {
		await fs.writeFile(filepath, resultSvg, 'utf8')
	}

	if (VERBOSE) {
		console.log(`- ${basename}`)
	}
}

(async () => {
	try {
		const basename = path.basename(__filename)
		const timeLabel = picocolors.cyan(`[${basename}] finished`)

		console.log(picocolors.cyan(`[${basename}] started`))
		console.time(timeLabel)

		const filesInDir = await fs.readdir(iconsDir, { withFileTypes: true })

		const svgFiles = filesInDir
			.filter(dirent => dirent.isFile() && dirent.name.endsWith('.svg'))
			.map(dirent => dirent.name)

		const config = await loadConfig(path.join(__dirname, '../svgo.config.mjs'))

		await Promise.all(svgFiles.map(file => processFile(file, config)))

		const filesLength = svgFiles.length

		console.log(picocolors.green('\nSuccess, prepared %s icon%s!'), filesLength, filesLength === 1 ? '' : 's')
		console.timeEnd(timeLabel)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
})()
