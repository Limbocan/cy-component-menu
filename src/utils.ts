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
export const formatMenuData = (
  list: any[] = [],
  level: number = 0,
  child: string = 'children',
  keyProp = 'key',
  parentKeyList: string[] = []
): any[] => {
  const result: any[] = []
  if (!list || list.length < 1) return []
  list.forEach(menu => {
    const _key_list = [...parentKeyList, menu[keyProp]]
    const _menu = Object.assign(menu, { level, parentKeyList: _key_list })
    if (menu[child]) _menu[child] = formatMenuData(menu[child], level + 1, child, keyProp, _key_list)
    result.push(_menu)
  })
  return result
}

// 根据ID获取菜单数据
export const getMenuItemByKey = (data:any[] = [], ids:any[] = [], keyProp, childProp, result:any[] = []) => {
  data.forEach(menu => {
    if (ids.includes(menu[keyProp])) result.push(menu)
    if (menu[childProp] && menu[childProp].length) getMenuItemByKey(menu[childProp], ids, keyProp, childProp, result)
  })
  return result
}
