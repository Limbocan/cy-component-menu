import { createSignal, createContext, useContext } from "solid-js";

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

  const state = {
    headerSlot: {
      value: headerSlot,
      change: updateHeaderSlot
    },
    footerSlot: {
      value: footerSlot,
      change: updatefooterSlot
    },
    expand: {
      value: expand,
      change: (val) => val === true ? updateExpand(val) : val === false ? updateExpand(val) : updateExpand(!expand)
    },
    data: {
      value: data,
      change: (list) => updateData(list)
    }
  }

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