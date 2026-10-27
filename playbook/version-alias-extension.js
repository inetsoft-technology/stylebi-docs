'use strict'

// Publishes <alias>/index.html for each configured alias, forwarding to the
// target version's index.html with the query string and #cshid hash intact.
// The product's Help buttons open <product version>/index.html#cshid=..., so
// this lets a patch release such as 2.0.1 reach the 2.0.0 docs.

module.exports.register = function ({ config: extensionConfig = {} }) {
  const aliases = extensionConfig.aliases || {}

  this.once('beforePublish', ({ contentCatalog, siteCatalog }) => {
    const logger = this.getLogger('version-alias')
    const components = contentCatalog.getComponents().filter((c) => c.name !== 'ROOT')

    for (const component of components) {
      for (const [alias, target] of Object.entries(aliases)) {
        if (component.versions.some(({ version }) => version === alias)) {
          logger.warn('alias %s: %s already publishes that version, skipping', alias, component.name)
          continue
        }
        const page = contentCatalog.getById({
          component: component.name, version: String(target), module: 'ROOT', family: 'page', relative: 'index.adoc',
        })
        if (!page) {
          logger.warn('alias %s: version %s of %s not found, skipping', alias, target, component.name)
          continue
        }
        const href = `../${target}/index.html`
        const contents = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>StyleBI ${target} Documentation</title>
<link rel="canonical" href="${href}">
<script>location.replace(${JSON.stringify(href)} + location.search + location.hash)</script>
<meta http-equiv="refresh" content="0; url=${href}">
</head>
<body><p><a href="${href}">StyleBI ${target} Documentation</a></p></body>
</html>
`
        siteCatalog.addFile({ contents: Buffer.from(contents), out: { path: `${component.name}/${alias}/index.html` } })
      }
    }
  })
}
