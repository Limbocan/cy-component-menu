
import { renderSlot } from '../utils'
import { useAppContext } from '../context'
import { RenderMenuList } from '../menu-list/menu-list'

export const RenderMenuContent = () => {

  const { headerSlot, footerSlot, expand, data } = useAppContext() as any
  
  setTimeout(() => {
    data.value().push({
      title: '123'
    })
    data.change(() => [...data.value()])
  }, 1000)

  return (
    <>
      {/* {slots.needStyle ? <style>{slots.style.default}</style> : null} */}
      <div
        class={`cy-menu ${expand.value() ? 'cy-menu-expand' : 'cy-menu-shrink'}`}
      >
        {
          renderSlot(headerSlot)('123') // 渲染头部插槽
        }
        <RenderMenuList
          list={data.value()}
        ></RenderMenuList>
        {
          renderSlot(footerSlot)() // 渲染尾部插槽
        }
      </div>
    </>
  )
}
