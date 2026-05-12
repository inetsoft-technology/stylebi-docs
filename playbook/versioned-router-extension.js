'use strict'

const { promises: fsp } = require('fs')
const ospath = require('path')

module.exports.register = function ({ config: extensionConfig = {} }) {
  this.once('pagesComposed', async ({ playbook, contentCatalog }) => {
    const yaml = requireYaml(this)
    const logger = this.getLogger('versioned-router')
    const configFile = ospath.join(playbook.dir, 'antora-router.yml')
    const config = yaml.load(await fsp.readFile(configFile), { schema: yaml.CORE_SCHEMA })
    const excludeRoutes = new Set(extensionConfig.excludeRoutes || extensionConfig.exclude_routes || [])

    const components = contentCatalog.getComponents().filter((c) => c.name !== 'ROOT')

    for (const component of components) {
      for (const { version } of component.versions) {
        const routes = Object.entries(config.routes).reduce((accum, [name, pageSpec]) => {
          if (excludeRoutes.has(name)) return accum
          let hash = ''
          const hashIdx = pageSpec.indexOf('#')
          if (~hashIdx) {
            hash = pageSpec.substr(hashIdx)
            pageSpec = pageSpec.substr(0, hashIdx)
          }
          const versionedSpec = version ? `${version}@${pageSpec}` : pageSpec
          const pageUrl = contentCatalog.resolvePage(versionedSpec)?.pub?.url
          if (pageUrl) {
            accum[name] = pageUrl + hash
          } else {
            logger.warn('could not resolve URL for route (version %s): %s: %s', version, name, pageSpec)
          }
          return accum
        }, {})

        const pageId = { component: component.name, version, module: 'ROOT', family: 'page', relative: 'index.adoc' }
        installOnPage(contentCatalog, logger, config.key, routes, pageId)
      }
    }
  })
}

function requireYaml ({ module: module_ }) {
  return require(
    require.resolve('js-yaml', {
      paths: [require.resolve('@antora/playbook-builder', { paths: module_.paths }) + '/..'],
    })
  )
}

function installOnPage (contentCatalog, logger, key, routes, pageId) {
  const page = contentCatalog.getById(pageId)
  if (!page) {
    logger.warn('index page not found for %s@%s, skipping', pageId.version, pageId.component)
    return
  }
  const rootPath = page.pub.rootPath === '.' ? undefined : page.pub.rootPath
  const relativeRoutes = Object.entries(routes).reduce((accum, [name, url]) => {
    accum[name] = rootPath ? rootPath + url : url.substr(1)
    return accum
  }, {})
  page.contents = Buffer.from(page.contents.toString().replace(/<\/title>/, `$&
<script>
;(function (routes, prefix, hash, href) {
  if (href = (hash && hash.startsWith(prefix) && routes[hash.slice(prefix.length)])) window.location.href = href
})(${JSON.stringify(relativeRoutes, null, '  ')}, "#${key}=", window.location.hash)
</script>`))
}
