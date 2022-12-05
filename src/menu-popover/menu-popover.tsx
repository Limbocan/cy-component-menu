
import { createSignal } from 'solid-js'

export const RenderMenuPopover = (props) => {

  // 提示框DOM
  let popRef = null as HTMLBaseElement | null
  // 提示框显示状态
  const [popoverShow, updatePopover] = createSignal(false)
  // 提示框位置和状态信息
  const initGap = 12 // 提示框箭头指示位置偏移量
  const [popoverInfo, updatePopoverInfo] = createSignal({
    stopClose: false,
    x: 0,
    y: 0,
    gap: initGap
  })

  // 鼠标事件（展示/关闭提示框）
  const setMouseEvent = (e: any, type: string): void => {
    if (props.disabled) return
    if (type === 'leave') {
      updatePopoverInfo(() => ({ ...popoverInfo(), stopClose: false }))
      changePopover(false)
      return
    }
    const { right, top } = e.target.getBoundingClientRect()
    const _popover = {
      x: right, y: top, stopClose: true, gap: popoverInfo().gap
    }
    updatePopoverInfo(() => ({ ..._popover }))

    if (!popRef) return
    const gap = popRef.offsetHeight + top - window.screen.height
    if (gap > 0) {
      const topGap = top - gap
      const topEable = topGap < 0
      updatePopoverInfo(() => ({ ...popoverInfo(), y: topEable ? 0 : top - gap, gap: topEable ? initGap + top : initGap + gap }))
    } else updatePopoverInfo(() => ({ ...popoverInfo(), gap: initGap }))
  }

  // 修改提示框展示
  const changePopover = (val: boolean): void => {
    if (props.disabled) return
    if (!val) {
      setTimeout(() => { if (!popoverInfo().stopClose) updatePopover(() => val) }, 200)
      return
    }
    updatePopover(() => val)
  }

  // 提示框鼠标事件
  const popoverMouseEvent = (val: boolean): void => {
    if (props.disabled) return
    updatePopoverInfo(() => ({ ...popoverInfo(), stopClose: true }))
    updatePopoverInfo(() => ({ ...popoverInfo(), stopClose: val }))
    if (!val) changePopover(false)
  }

  // 暴露组件方法
  props.ref({ changePopover, setMouseEvent })

  return (
    <div
      ref={popRef}
      class={`cy-menu-item-popover`}
      style={{
        '--cy-menu-x': setStylePx(popoverInfo().x),
        '--cy-menu-y': setStylePx(popoverInfo().y),
      }}
      onmouseenter={() => popoverMouseEvent(true)}
      onmouseleave={() => popoverMouseEvent(false)}
    >
      {
        popoverShow() && !props.disabled ? (
          <>{props.name}</>
        ) : (
          <></>
        )
      }
    </div>
  )
}

// 设置样式
const setStylePx = (val: number): string => {
  if (typeof val !== 'number') return val
  else return `${val}px`
}
