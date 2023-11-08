import './style.scss'
import './assets/github-markdown.css'
import Vue from 'vue'
import 'everkm-wa/main.css'
import {setupLayoutHeight, lazyImg, setupDrawerToggle} from 'everkm-wa'

setupLayoutHeight()
lazyImg()
// installFormulaView()
setupDrawerToggle('#aside-nav', '#drawer')
// listenHistoryBack()
