import type { SlotRender } from '../index.d'

// 判断是否为Element节点
export const isElement = (node) => !!(node && node.nodeName && node.nodeType === 1)

// 获取Element
export const getElement = (el: Element | string | undefined) => isElement(el) ? el : typeof el === 'string' ? document.querySelector(el) : document.createElement('div')

// 渲染插槽
export const renderSlot = (slot: SlotRender):SlotRender => {
  if (slot instanceof Function) {
    return slot
  } else {
    const _slot = document.createElement('div')
    return () => _slot
  }
}

// 格式化列表数据
export const formatMenuData = (list: any[] = [], level: number = 0, child: string = 'children'):any[] => {
  const result: any[] = []
  if (!list || list.length < 1) return []
  list.forEach(menu => {
    const _menu = Object.assign(menu, { level })
    if (menu[child]) _menu[child] = formatMenuData(menu[child], level + 1)
    result.push(_menu)
  })
  return result
}
