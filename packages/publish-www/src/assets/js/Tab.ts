import $ from 'cash-dom'

const HeaderCheckedCls = '!bg-blue-600 !text-white'
const ContainerHiddenCls = 'hidden'

export default class Tab {
  private headerSelector: string
  private containerSelector: string

  constructor(headerSelctor: string, containerSelector: string) {
    this.headerSelector = headerSelctor
    this.containerSelector = containerSelector

    const elHeaders = $(this.headerSelector)
    elHeaders.each((i) => {
      elHeaders.eq(i).on('click', () => {
        this.select(i)
      })
    })
  }

  public select(idx: number) {
    const elHeaders = $(this.headerSelector)
    const elContainers = $(this.containerSelector)
    elContainers.removeClass('invisible')
    // console.log('containers', elContainers)

    elHeaders.each((i) => {
      if (i === idx) {
        elHeaders.eq(i).addClass(HeaderCheckedCls)
      } else {
        elHeaders.eq(i).removeClass(HeaderCheckedCls)
      }
    })

    elContainers.each((i) => {
      if (i === idx) {
        elContainers.eq(i).removeClass(ContainerHiddenCls)
      } else {
        elContainers.eq(i).addClass(ContainerHiddenCls)
      }
    })
  }

  // end of class
}
