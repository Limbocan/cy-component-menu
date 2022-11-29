
export interface Props {
  data: Array
  expand: boolean
}

export interface Methods {
  change?: (value: Props.show) => void,
  disposer?: () => void
}

export type SlotRender = (props?) => Element

export interface Slots {
  headerSlot?: SlotRender
  footerSlot?: SlotRender
}

export type RenderApp = (el: string | Element, props: Props, slots: Slots) => Methods

// export default function init(props: Props, slots: any): void
