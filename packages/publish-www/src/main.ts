import './style.scss'

const win = globalThis.window as any
win.daobox.site.setupLayoutHeight()
win.daobox.site.lazyImg()
win.daobox.site.initFormulaView()
win.daobox.site.setupDrawerToggle('#main-body', '#drawer')
