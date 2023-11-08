import './style.scss'
import './nav_tree.scss'
import './assets/github-markdown.css'
import $ from 'cash-dom'

import 'everkm-wa/main.css'
import {
  setupLayoutHeight,
  lazyImg,
  setupDrawerToggle,
  buildNavTree,
  setupToc,
  setupLinkAjax,
} from 'everkm-wa'

setupLayoutHeight()
lazyImg()
// installFormulaView()
setupDrawerToggle('#aside-nav', '#drawer')
;(async () => {
  const updateNavActive = await buildNavTree('.nav-tree', -1)
  const updateToc = await setupToc('.js-toc-content', '#js-toc')

  const onAjaxLoaded = (doc: Document) => {
    const titleElement = doc.querySelector('title')

    globalThis.document.title = titleElement?.textContent?.trim() || ''
    $('#article-body').html(doc.querySelector('#article-body')?.innerHTML || '')
    globalThis.window.scroll(0, 0)

    updateToc()
    updateNavActive()

    lazyImg()
    // installFormulaView()
    ;(window as any)?.Prism?.highlightAll()
  }

  const ajaxPath = (globalThis.window as any).daoboxAjaxPathSeg || ''
  if (ajaxPath) {
    setupLinkAjax(ajaxPath, onAjaxLoaded)
  }
})()
