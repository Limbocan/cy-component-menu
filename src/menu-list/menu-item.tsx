
import { RenderMenuList } from './menu-list'
import { useAppContext } from '../context'

export const RenderMenuItem = (props) => {

  const { openKeys, keyProp, labelProp, scrollInstance } = useAppContext() as any
  const childList = props.data.children && props.data.children.length > 0 ? props.data.children : null

  // 修改菜单子列表展开状态
  const changeOpen = (val) => {
    if (!childList) return
    const _key = val[keyProp.value()]
    const _keys = openKeys.value()
    const _index = _keys.findIndex(item => item === _key)
    _index > -1 ? _keys.splice(_index, 1) : _keys.push(_key)
    openKeys.change(() => [..._keys])
    _index > -1 && scrollInstance.value().hiddenBar()
  }
  
  return (
    <>
      <li class="cy-menu-item">
        <div class="cy-menu-item-box" onclick={() => changeOpen(props.data)}>
          <div class="cy-menu-item-label">{props.data[labelProp.value()]}</div>
        </div>
        {
          childList ? (
            <div
              class={`cy-menu-item-child-list ${openKeys.value().includes(props.data[keyProp.value()]) ? 'cy-menu-item-child-list-open' : ''}`}>
              <RenderMenuList list={props.data.children} level={props.level + 1}></RenderMenuList>
            </div>
          ) : null
        }
      </li>
    </>
  )
}
