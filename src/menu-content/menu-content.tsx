
import { onMount } from 'solid-js'
import { renderSlot } from '../utils'
import { useAppContext } from '../context'
import { RenderMenuList } from '../menu-list/menu-list'
import SimpleScrollbar from '../plugins/simple-scrollbar.min.js'
import '../plugins/simple-scrollbar.scss'

export const RenderMenuContent = () => {

  const { headerSlot, footerSlot, expand, data, height, width } = useAppContext() as any
  let APP_DOM = document.createElement('div', {})

  onMount(() => {
    const scroll = SimpleScrollbar()
    scroll.initEl(APP_DOM)
  })

  return (
    <>
      {/* {slots.needStyle ? <style>{slots.style.default}</style> : null} */}
      <div
        ref={APP_DOM}
        class={`cy-menu ${expand.value() ? 'cy-menu-expand' : 'cy-menu-shrink'}`}
        style={
          {
            '--cy-menu-height': height.value(),
            '--cy-menu-width': width.value()
          }
        }
      >
        <div class="cy-menu-header">
          {
            renderSlot(headerSlot.value())('123') // 渲染头部插槽
          }
        </div>
        <RenderMenuList
          isContent={true}
          list={data.value()}
          level={0}
        ></RenderMenuList>
        <div class="cy-menu-footer">
          {
            renderSlot(footerSlot.value())() // 渲染尾部插槽
          }
        </div>
      </div>
    </>
  )
}