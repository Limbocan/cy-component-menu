
import { createSignal } from 'solid-js'

export const RenderMenuPopover = (props) => {

  const [popoverShow, updatePopover] = createSignal(false)

  props.ref({ popoverShow, updatePopover })

  return (
    <div class={`cy-menu-item-popover`}>
      {
        popoverShow() ? (
          <>{props.name}</>
        ) : (
          <></>
        )
      }
    </div>
  )
}
