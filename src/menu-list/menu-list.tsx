
import { For } from 'solid-js'
// import { useAppContext } from '../context'
import { RenderMenuItem } from './menu-item'

export const RenderMenuList = (props) => {

  return (
    <ul class="cy-menu-list">
      <For
        each={props.list}
        children={<></>}
      >
        {
          (item) => (
            <RenderMenuItem data={item}></RenderMenuItem>
          )
        }
      </For>
    </ul>
  )
}
