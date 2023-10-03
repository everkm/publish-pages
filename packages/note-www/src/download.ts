import $ from 'cash-dom'
// import * as Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";
import './style.scss'
import Tab from './assets/js/Tab'

function initReleaseTab() {
  const tab = new Tab('.versions-tab-header', '.versions-tab-container')

  const channels = ['#stable', '#beta', '#alpha']
  let idx = channels.indexOf(window.location.hash)
  if (idx === -1) {
    idx = 1
  }
  tab.select(idx)
}

$(document).ready(() => {
  initReleaseTab()

  // console.log("download init", new Date().getMilliseconds());

  // 历史verison 点击展开
  const els = $('.version-header')
  els.each((idx, _elm) => {
    const el = els.eq(idx)
    // console.log('init event', elm)

    el.on('click', function () {
      const isHidden = el.find('img.expand-state').hasClass('-rotate-90')
      // console.log('img', el.find('img.expand-state'), isHidden)
      if (isHidden) {
        el.find('img.expand-state').removeClass('-rotate-90')
        el.next().removeClass('hidden')
      } else {
        el.find('img.expand-state').addClass('-rotate-90')
        el.next().addClass('hidden')
      }
    })
  })
})
