import './style.scss'
import './nav_tree.scss'
import $ from 'cash-dom'

const win = globalThis.window as any
win.daobox.site.setupLayoutHeight()
win.daobox.site.lazyImg()
win.daobox.site.initFormulaView()
win.daobox.site.setupDrawerToggle('#main-body', '#drawer')
;(async () => {
  const updateNavActive = await win.daobox.site.buildNavTree('.nav-tree', -1)
  const updateToc = await win.daobox.site.setupToc('.js-toc-content', '#js-toc')

  win.daoboxAjaxUpdateFn = (doc: Document) => {
    const titleElement = doc.querySelector('title')

    globalThis.document.title = titleElement?.textContent?.trim() || ''
    $('#doc-body').html(doc.querySelector('#doc-body')?.innerHTML || '')
    globalThis.window.scroll(0, 0)

    updateToc()
    updateNavActive()

    win.daobox.site.lazyImg()
    win.daobox.site.initFormulaView()

    ;(win.Prism as any)?.highlightAll()
  }
  win.daobox.site.setupLinkAjax()
})()
