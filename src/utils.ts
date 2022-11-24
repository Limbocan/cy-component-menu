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
