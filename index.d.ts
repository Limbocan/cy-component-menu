
// 菜单参数
export interface Props {
  data: MenuItem[]
  expand?: boolean
  activeMenu?: string | number | MenuItem
  footerHeight?: string
  unique?: boolean
  labelProp?: string
  keyProp?: string
  childProp?: string
  openKeys?: number[] | string[]
  height?: string
  width?: string
  alwaysPopover?: boolean
  onMenuClick?: (item:MenuItem) => void 
}

// 菜单项
export interface MenuItem {
  label?: string
  key?: string
  children?: MenuItem[]
  [key: string]: any
}

// 菜单方法
export interface Methods {
  change?: (value: Props.show) => void,
  disposer?: () => void
  getData?: () => Props.data | Props.data
  setData?: (value: Props.data) => void | (() => Props.data)
  getExpand?: () => Props.expand | Props.expand
  setExpand?: (value: Props.expand) => void | (() => Props.expand)
  getActiveMenu?: () => Props.activeMenu | Props.activeMenu
  setActiveMenu?: (value: Props.activeMenu) => void | (() => Props.activeMenu)
  getFooterHeight?: () => Props.footerHeight | Props.footerHeight
  setFooterHeight?: (value: Props.footerHeight) => void | (() => Props.footerHeight)
  getUnique?: () => Props.unique | Props.unique
  setUnique?: (value: Props.unique) => void | (() => Props.unique)
  getLabelProp?: () => Props.labelProp | Props.labelProp
  setLabelProp?: (value: Props.labelProp) => void | (() => Props.labelProp)
  getKeyProp?: () => Props.keyProp | Props.keyProp
  setKeyProp?: (value: Props.keyProp) => void | (() => Props.keyProp)
  getChildProp?: () => Props.childProp | Props.childProp
  setChildProp?: (value: Props.childProp) => void | (() => Props.childProp)
  getOpenKeys?: () => Props.openKeys | Props.openKeys
  setOpenKeys?: (value: Props.openKeys) => void | (() => Props.openKeys)
  getHeight?: () => Props.height | Props.height
  setHeight?: (value: Props.height) => void | (() => Props.height)
  getWidth?: () => Props.width | Props.width
  setWidth?: (value: Props.width) => void | (() => Props.width)
  getAlwaysPopover?: () => Props.alwaysPopover | Props.alwaysPopover
  setAlwaysPopover?: (value: Props.alwaysPopover) => void | (() => Props.widtalwaysPopoverh)
}

export type SlotRender = (props?) => Element

// 菜单插槽
export interface Slots {
  headerSlot?: SlotRender
  footerSlot?: SlotRender
  menuSlot?: SlotRender
  menuIconSlot?: SlotRender
}

export type RenderApp = (el: string | Element, props: Props, slots: Slots) => Methods

// export default function init(props: Props, slots: any): void
