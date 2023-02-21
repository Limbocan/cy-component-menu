import { render } from 'solid-js/web'
// import { customElement } from 'solid-element'
import { getElement } from './utils'
import { RenderApp, Props, Methods, Slots } from '../index.d'
import App from './app'
import './style.scss'

// // web components渲染
// export const init = (name: string = 'cy-menu', props: Props, slots: any): any => {
//   const methods: Methods = {}
//   customElement(name, props, () => App(props, slots, methods, true))
//   return methods
// }

// dom渲染
export const renderApp: RenderApp = (el: string | Element, props: Props, slots: Slots): Methods => {
  const methods: Methods = {}
  const disposer = render(() => App(
    props as Props, slots as Slots, methods as Methods),
    getElement(el) as Element
  )
  methods.disposer = disposer
  return methods
}

// export default init
