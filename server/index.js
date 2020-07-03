const path = require('path')
const { loadNuxt } = require('nuxt')
const serverless = require('serverless-http')
const express = require('express')

// Init the express app
const app = express()

module.exports.nuxt = async (request, context) => {
  // Add static folder
  app.use(
    '/_nuxt/',
    express.static(path.join(__dirname, '.nuxt', 'dist', 'client'))
  )
  // We get Nuxt instance
  const nuxt = await loadNuxt('start')

  // Render every route with Nuxt.js
  app.use(nuxt.render)

  // Return the handler
  return serverless(app, {
    binary: [
      'application/javascript',
      'application/json',
      'application/octet-stream',
      'application/xml',
      'font/eot',
      'font/opentype',
      'font/otf',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'text/comma-separated-values',
      'text/css',
      'text/html',
      'text/javascript',
      'text/plain',
      'text/text',
      'text/xml',
      'font/woff',
      'font/woff2'
    ]
  })(request, context)
}
