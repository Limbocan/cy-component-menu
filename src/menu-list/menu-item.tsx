
import { RenderMenuList } from './menu-list'
import { useAppContext } from '../context'
import { renderSlot } from '../utils'
import { RenderMenuPopover } from '../menu-popover/menu-popover'

export const RenderMenuItem = (props) => {

  const {
    openKeys,
    keyProp,
    labelProp,
    childProp,
    scrollInstance,
    menuSlot,
  } = useAppContext() as any
  const childList = props.data.children && props.data.children.length > 0 ? props.data.children : null
  let popoverDom = null as any

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

  // 修改popover展示
  const changePopover = (val, e) => {
    if (!popoverDom) return
    popoverDom.changePopover(val)
    popoverDom.setMouseEvent(e, val ? 'enter' : 'leave')
  }
  
  return (
    <>
      <li
        class="cy-menu-item"
        data-level={props.level}
      >
        <div
          class="cy-menu-item-box"
          onclick={() => changeOpen(props.data)}
          onmouseenter={(e) => changePopover(true, e)}
          onmouseleave={(e) => changePopover(false, e)}
        >
          {
            menuSlot.value() ? renderSlot(menuSlot.value())('item') :
            (<>
              <div className="cy-menu-item-icon">
                
              </div>
              <div class="cy-menu-item-label">{props.data[labelProp.value()]}</div>
              <div className="cy-menu-item-arrow"></div>
            </>)
          }
        </div>
        {
          childList ? (
            <div
              class={`cy-menu-item-child-list ${openKeys.value().includes(props.data[keyProp.value()]) ? 'cy-menu-item-child-list-open' : ''}`}>
              <RenderMenuList list={props.data[childProp.value()]} level={props.level + 1}></RenderMenuList>
            </div>
          ) : null
        }
        <RenderMenuPopover
          ref={popoverDom}
          name={props.data[labelProp.value()]}
          disabled={props.level > 0}
        >
        </RenderMenuPopover>
      </li>
    </>
  )
}
