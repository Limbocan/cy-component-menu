
import { For } from 'solid-js'
// import { useAppContext } from '../context'
import { RenderMenuItem } from './menu-item'

export const RenderMenuList = (props) => {

  return (
    <ul
      class={`cy-menu-list ${props.isContent ? 'cy-menu-content-list' : ''} ${props.isPopover ? 'cy-menu-popover-list' : ''}`}
      data-level={props.isPopover ? null : props.level}
    >
      <For
        each={props.list}
        children={<></>}
      >
        {
          (item) => (
            <RenderMenuItem
              data={item}
              level={props.level}
              isPopover={props.isPopover}
            >
            </RenderMenuItem>
          )
        }
      </For>
    </ul>
  )
}
