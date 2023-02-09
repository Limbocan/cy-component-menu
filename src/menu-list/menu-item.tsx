
import { RenderMenuList } from './menu-list'
import { useAppContext } from '../context'
import { renderSlot } from '../utils'
import { RenderMenuPopover } from '../menu-popover/menu-popover'

export const RenderMenuItem = (props) => {

  const {
    expand,
    openKeys,
    keyProp,
    labelProp,
    childProp,
    scrollInstance,
    menuSlot,
    menuIconSlot,
    alwaysPopover,
    onMenuClick,
  } = useAppContext() as any
  const childList = props.data.children && props.data.children.length > 0 ? props.data.children : null
  let popoverDom = null as any

  // 修改菜单子列表展开状态
  const changeOpen = (val) => {
    onMenuClick(val)
    if (!childList) return
    const _key = val[keyProp.value()]
    const _keys = openKeys.value()
    const _index = _keys.findIndex(item => item === _key)
    _index > -1 ? _keys.splice(_index, 1) : _keys.push(_key)
    openKeys.change(() => [..._keys])
    _index > -1 && scrollInstance.value().hiddenBar()
  }

  // 获取菜单展开状态
  const getOpenStatus = (val): boolean => {
    const _key = val[keyProp.value()]
    const _keys = openKeys.value()
    const _index = _keys.findIndex(item => item === _key)
    return _index > -1
  }

  // 修改popover展示
  const changePopover = (val: boolean, e: MouseEvent) => {
    const canShow = canShowPopover(val)
    if (!canShow) return
    popoverDom.changePopover(val)
    popoverDom.setMouseEvent(e, val ? 'enter' : 'leave')
  }

  // 判断是否能展示提示框
  const canShowPopover = (val) => {
    if (val === false) return true
    if (!popoverDom) return false
    const isPopover = props.isPopover
    const isAlways = alwaysPopover.value()
    if (val === true) {
      if (isAlways) return true
      if (getOpenStatus(props.data) || expand.value()) return false
      if (!childList && isPopover) return false
    }
    return true
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
            menuSlot.value() ? renderSlot(menuSlot.value())(props.data) :
            (<>
              <div className="cy-menu-item-icon">
                { menuIconSlot.value() ? renderSlot(menuSlot.value())(props.data) : '' }
              </div>
              <div class="cy-menu-item-label">{props.data[labelProp.value()]}</div>
                {
                  childList ?
                  <div class={`cy-menu-item-arrow ${getOpenStatus(props.data) ? 'cy-menu-item-arrow-expand' : ''}`}>
                    <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none">
                      <path d="M19 12L31 24L19 36" stroke="#787878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div> : <></>
                }
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
          childList={childList}
          disabled={props.level > 0}
        >
        </RenderMenuPopover>
      </li>
    </>
  )
}
