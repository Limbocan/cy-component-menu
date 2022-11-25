
import { renderSlot } from '../utils'
import { useAppContext } from '../context'
import { RenderMenuList } from '../menu-list/menu-list'

export const RenderMenuContent = () => {

  const { headerSlot, footerSlot, expand, data } = useAppContext() as any

  return (
    <>
      {/* {slots.needStyle ? <style>{slots.style.default}</style> : null} */}
      <div
        class={`cy-menu ${expand.value() ? 'cy-menu-expand' : 'cy-menu-shrink'}`}
      >
        {
          renderSlot(headerSlot.value())('123') // 渲染头部插槽
        }
        <RenderMenuList
          list={data.value()}
          level={0}
        ></RenderMenuList>
        {
          renderSlot(footerSlot.value())() // 渲染尾部插槽
        }
      </div>
    </>
  )
}
