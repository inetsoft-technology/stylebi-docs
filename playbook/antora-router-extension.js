'use strict'

/* Copyright (c) 2022-present OpenDevise Inc.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This file was copied from the Antora Router Extension project. The
 * original file can be found at the following URL:
 * https://gitlab.com/opendevise/oss/antora-router-extension/-/blob/129d832512b32d8fe48645dda50c389b61b49bc4/lib/index.js
 *
 * Modified to support exclude_routes config option.
 */
const { promises: fsp } = require('fs')
const ospath = require('path')

module.exports.register = function ({ config: extensionConfig = {} }) {
  this.once('playbookBuilt', ({ playbook }) => {
    let site = playbook.site
    let siteStartPageSpec
    if (!(siteStartPageSpec = site.startPage)) return
    site = Object.assign({}, site)
    delete site.startPage
    playbook = Object.assign({}, playbook, { site })
    this.updateVariables({ playbook, siteStartPageSpec })
  })

  this.once('pagesComposed', async ({ playbook, contentCatalog, siteStartPageSpec }) => {
    const yaml = requireYaml(this)
    const logger = this.getLogger('antora-router')
    const configFile = ospath.join(playbook.dir, 'antora-router.yml')
    const config = yaml.load(await fsp.readFile(configFile), { schema: yaml.CORE_SCHEMA })
    const excludeRoutes = new Set(extensionConfig.excludeRoutes || extensionConfig.exclude_routes || [])
    const routes = Object.entries(config.routes).reduce((accum, [name, pageSpec]) => {
      if (excludeRoutes.has(name)) return accum
      let hash = ''
      const hashIdx = pageSpec.indexOf('#')
      if (~hashIdx) {
        hash = pageSpec.substr(hashIdx)
        pageSpec = pageSpec.substr(0, hashIdx)
      }
      const pageUrl = contentCatalog.resolvePage(pageSpec)?.pub?.url
      if (pageUrl) {
        accum[name] = pageUrl + hash
      } else {
        logger.warn('could not resolve URL for route target: %s: %s', name, pageSpec)
      }
      return accum
    }, {})
    const routerPageId = { component: 'ROOT', version: '', module: 'ROOT', family: 'page', relative: 'index.adoc' }
    installOnPage(playbook, contentCatalog, logger, config.key, routes, routerPageId, siteStartPageSpec)
  })
}

function requireYaml ({ module: module_ }) {
  return require(
    require.resolve('js-yaml', {
      paths: [require.resolve('@antora/playbook-builder', { paths: module_.paths }) + '/..'],
    })
  )
}

function installOnPage (playbook, contentCatalog, logger, key, routes, pageId, siteStartPageSpec) {
  const alias = contentCatalog.getById(Object.assign({}, pageId, { family: 'alias' }))
  if (alias) {
    const aliasSpec = `${pageId.version ? pageId.version + '@' : ''}` +
      `${pageId.component}:${pageId.module === 'ROOT' ? '' : pageId.module}:${pageId.relative}`
    logger.error({ file: alias.rel }, 'cannot install router over top of page alias: %s', aliasSpec)
    return
  }
  let page = contentCatalog.getById(pageId)
  let siteStartPageUrl
  if (!page) {
    page = contentCatalog.addFile({
      contents: Buffer.from(`<!DOCTYPE html>\n<title>${playbook.site.title}</title>\n`),
      src: pageId,
    })
    const siteStartPage = siteStartPageSpec && contentCatalog.resolvePage(siteStartPageSpec)
    if (siteStartPage && siteStartPage !== page) siteStartPageUrl = siteStartPage.pub.url
  }
  const rootPath = page.pub.rootPath === '.' ? undefined : page.pub.rootPath
  if (siteStartPageUrl) siteStartPageUrl = (rootPath ? rootPath + siteStartPageUrl : siteStartPageUrl.substr(1))
  routes = Object.entries(routes).reduce((accum, [name, url]) => {
    accum[name] = rootPath ? rootPath + url : url.substr(1)
    return accum
  }, {})
  page.contents = Buffer.from(page.contents.toString().replace(/<\/title>/, `$&
<script>
;(function (routes, prefix, hash, defaultHref, href) {
  if (href = (hash && hash.startsWith(prefix) && routes[hash.slice(prefix.length)] || defaultHref)) window.location.href = href
})(${JSON.stringify(routes, null, '  ')}, "#${key}=", window.location.hash${siteStartPageUrl ? ', "' + siteStartPageUrl + '"' : ''})
</script>`))
}
