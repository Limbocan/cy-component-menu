import { createSignal, createContext, useContext } from "solid-js";
import { formatMenuData } from './utils'

const AppContext = createContext() as any;

export function AppProvider(propsData) {
  // 头部插槽↓
  const [headerSlot, updateHeaderSlot] = createSignal(propsData.slots.headerSlot || null)
  // 尾部插槽↓
  const [footerSlot, updatefooterSlot] = createSignal(propsData.slots.footerSlot || null)
  // 菜单展开↓
  const [expand, updateExpand] = createSignal(propsData.props.expand || true)
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
  // 菜单高度
  const [height, updateHeight] = createSignal(propsData.props.height || '100%')
  // 菜单宽度
  const [width, updateWidth] = createSignal(propsData.props.width || '240px')

  // 设置数据
  updateData(() => [...formatMenuData(data(), 0, childProp())])

  const state = {
    headerSlot: { value: headerSlot, change: updateHeaderSlot },
    footerSlot: { value: footerSlot, change: updatefooterSlot },
    expand: {
      value: expand,
      change: (val) => val === true ? updateExpand(val) : val === false ? updateExpand(val) : updateExpand(!expand)
    },
    data: {
      value: data,
      change: (list) => {
        const _list = formatMenuData(list)
        updateData(() => [..._list])
      }
    },
    labelProp: { value: labelProp, change: updateLabelProp },
    keyProp: { value: keyProp, change: updateKeyProp },
    childProp: { value: childProp, change: updateChildProp },
    openKeys: { value: openKeys, change: updateOpenKeys },
    height: { value: height, change: updateHeight },
    width: { value: width, change: updateWidth },
  }

  // 添加属性update方法
  Object.keys(state).forEach(item => {
    const updateName = item.slice(0, 1).toLocaleUpperCase() + item.slice(1)
    propsData.methods[`update${updateName}`] = state[item].change
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