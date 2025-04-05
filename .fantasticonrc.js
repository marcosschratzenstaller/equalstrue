'use strict'

const codepoints = require('./build/font/icons.json')

module.exports = {
  inputDir: './assets/icons',
  outputDir: './build/font',
  fontTypes: ['woff2'],
  assetTypes: ['scss', 'json'],
  name: 'equalstrue-icons',
  codepoints,
  prefix: 'equalstrue-icons',
  selector: '.equalstrue-icons',
  fontsUrl: '../../assets/fonts/equalstrue-icons',
  formatOptions: {
    json: {
      indent: 2
    }
  },
  // Use our custom Handlebars templates
  templates: {
    scss: './build/font/scss.hbs'
  },
  pathOptions: {
    json: './build/font/icons.json',
    scss: './blocks-src/icon-inline/_icons.scss',
    woff2: './assets/fonts/equalstrue-icons/equalstrue-icons.woff2'
  }
}
