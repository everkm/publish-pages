import './style.scss'
import './nav_tree.scss'
import './assets/github-markdown.css'
import $ from 'cash-dom'

const win = globalThis.window as any
win.daobox.site.setupLayoutHeight()
win.daobox.site.lazyImg()
win.daobox.site.initFormulaView()
win.daobox.site.setupDrawerToggle('#aside-nav', '#drawer')
;(async () => {
  const updateNavActive = await win.daobox.site.buildNavTree('.nav-tree', -1)
  const updateToc = await win.daobox.site.setupToc('.js-toc-content', '#js-toc')

  const onAjaxLoaded = (doc: Document) => {
    const titleElement = doc.querySelector('title')

    globalThis.document.title = titleElement?.textContent?.trim() || ''
    $('#article-body').html(doc.querySelector('#article-body')?.innerHTML || '')
    globalThis.window.scroll(0, 0)

    updateToc()
    updateNavActive()

    win.daobox.site.lazyImg()
    win.daobox.site.initFormulaView()

    ;(win.Prism as any)?.highlightAll()
  }

  const ajaxPath = (globalThis.window as any).daoboxAjaxPathSeg || ''
  if (ajaxPath){
    win.daobox.site.setupLinkAjax(ajaxPath, onAjaxLoaded)
  }
})()
