
import { onMount, onCleanup } from 'solid-js'
import { renderSlot } from '../utils'
import { useAppContext } from '../context'
import { RenderMenuList } from '../menu-list/menu-list'
import SimpleScrollbar from '../plugins/simple-scrollbar.js'
import '../plugins/simple-scrollbar.scss'

export const RenderMenuContent = () => {

  const {
    headerSlot,
    footerSlot,
    expand,
    data,
    height,
    width,
    footerHeight,
    scrollInstance
  } = useAppContext() as any
  let APP_DOM = {} as Element
  let resizeObserver = {} as ResizeObserver
  const scroll = SimpleScrollbar()

  onMount(() => {
    const scrollInstace = scroll.initEl(APP_DOM)
    scrollInstance.change(() => scrollInstace)
    resizeObserver = new ResizeObserver(() => {
      const _SCROLL = scrollInstace.getBar()
      _SCROLL.classList.add('cy-menu-hidden')
    })
    resizeObserver.observe(APP_DOM)
  })

  onCleanup(() => {
    resizeObserver.disconnect()
    scroll.unbindEl(APP_DOM)
  })

  return (
    <>
      {/* {slots.needStyle ? <style>{slots.style.default}</style> : null} */}
      <div
        ref={APP_DOM}
        class={`cy-menu cy-menu-container ${expand.value() ? 'cy-menu-expand' : 'cy-menu-shrink'}`}
        style={
          {
            '--cy-menu-height': height.value(),
            '--cy-menu-width': width.value(),
            '--cy-menu-footer-height': footerHeight.value()
          }
        }
      >
        <div class="cy-menu-header">
          {
            renderSlot(headerSlot.value())('header') // 渲染头部插槽
          }
        </div>
        <RenderMenuList
          isContent={true}
          list={data.value()}
          level={0}
        ></RenderMenuList>
        <div class="cy-menu-footer">
          {
            renderSlot(footerSlot.value())('footer') // 渲染尾部插槽
          }
        </div>
      </div>
    </>
  )
}
