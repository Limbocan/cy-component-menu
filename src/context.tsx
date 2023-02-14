import { createSignal, createContext, useContext } from "solid-js";
import { formatMenuData } from './utils'

const AppContext = createContext() as any;

export function AppProvider(propsData) {
  // 头部插槽↓
  const [headerSlot, updateHeaderSlot] = createSignal(propsData.slots.headerSlot || null)
  // 尾部插槽↓
  const [footerSlot, updatefooterSlot] = createSignal(propsData.slots.footerSlot || null)
  // 菜单项插槽↓
  const [menuSlot, updateMenuSlot] = createSignal(propsData.slots.menuSlot || null)
  // 菜单图标插槽↓
  const [menuIconSlot, updateMenuIconSlot] = createSignal(propsData.slots.menuIconSlot || null)
  // 活跃菜单项↓
  const [activeMenu, updateActiveMenu] = createSignal(propsData.props.activeMenu || null)
  // 活跃菜单列表↓
  const [activeList, updateActiveList] = createSignal([])
  // 尾部插槽高度↓
  const [footerHeight, updateFooterHeight] = createSignal(propsData.props.footerHeight || '0')
  // 滚动实例
  const [scrollInstance, updateScroll] = createSignal({})
  // 菜单展开↓
  const [expand, updateExpand] = createSignal(propsData.props.expand || true)
  // 保持同级唯一一个子菜单展开↓
  const [unique, updateUnique] = createSignal(propsData.props.unique || true)
  // 菜单列表数据↓
  const [data, updateData] = createSignal(propsData.props.data || [])
  // 菜单文字prop↓
  const [labelProp, updateLabelProp] = createSignal(propsData.props.labelProp || 'label')
  // 菜单唯一值prop↓
  const [keyProp, updateKeyProp] = createSignal(propsData.props.keyProp || 'key')
  // 子菜单prop↓
  const [childProp, updateChildProp] = createSignal(propsData.props.childProp || 'children')
  // 菜单打开项列表↓
  const [openKeys, updateOpenKeys] = createSignal(propsData.props.openKeys || [])
  // 菜单打开项详细信息↓
  const [openMenus, updateOpenMenus] = createSignal([])
  // 菜单高度
  const [height, updateHeight] = createSignal(propsData.props.height || '100%')
  // 菜单宽度
  const [width, updateWidth] = createSignal(propsData.props.width || '240px')
  // 菜单收起宽度
  // const [minWidth, updateMinWidth] = createSignal(propsData.props.minWidth || '40px')
  // 始终展示菜单提示框
  const [alwaysPopover, updateAlwaysPopover] = createSignal(propsData.props.alwaysPopover || false)

  // 设置数据
  updateData(() => [...formatMenuData(data(), 0, childProp(), keyProp())])

  const state = {
    headerSlot: { value: headerSlot, change: updateHeaderSlot },
    footerSlot: { value: footerSlot, change: updatefooterSlot },
    menuSlot: { value: menuSlot, change: updateMenuSlot },
    menuIconSlot: { value: menuIconSlot, change: updateMenuIconSlot },
    activeMenu: { value: activeMenu, change: updateActiveMenu },
    activeList: { value: activeList, change: updateActiveList },
    footerHeight: { value: footerHeight, change: updateFooterHeight },
    scrollInstance: { value: scrollInstance, change: updateScroll },
    expand: {
      value: expand,
      change: (val) => val === true ? updateExpand(val) : val === false ? updateExpand(val) : updateExpand(!expand)
    },
    unique: { value: unique, change: updateUnique },
    data: {
      value: data,
      change: (list) => {
        const _list = formatMenuData(list, 0, childProp(), keyProp())
        updateData(() => [..._list])
      }
    },
    labelProp: { value: labelProp, change: updateLabelProp },
    keyProp: { value: keyProp, change: updateKeyProp },
    childProp: { value: childProp, change: updateChildProp },
    openKeys: { value: openKeys, change: updateOpenKeys },
    openMenus: { value: openMenus, change: updateOpenMenus },
    height: { value: height, change: updateHeight },
    width: { value: width, change: updateWidth },
    // minWidth: { value: minWidth, change: updateMinWidth },
    alwaysPopover: { value: alwaysPopover, change: updateAlwaysPopover },
    onMenuClick: propsData.props.onMenuClick,
  }

  // 添加属性update方法
  Object.keys(state).forEach(item => {
    const updateName = item.slice(0, 1).toLocaleUpperCase() + item.slice(1)
    propsData.methods[`update${updateName}`] = state[item].change
    propsData.methods[`get${updateName}`] = state[item].value
  })

  return (
    <AppContext.Provider
      value={state}
    >
      {propsData.children}
    </AppContext.Provider>
  );
}

export function useAppContext() { return useContext(AppContext); }