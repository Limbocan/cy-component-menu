
import { Props, Methods, Slots } from '../index.d'
import { AppProvider } from './context'
import { RenderMenuContent } from './menu-content/menu-content'
import './style.scss'

export default (
  props: Props = { data: [], expand: false },
  slots: Slots = {},
  methods: Methods = {}
) => {

  return (
    <AppProvider
      props={props}
      slots={slots}
      methods={methods}
    >
      <RenderMenuContent></RenderMenuContent>
    </AppProvider>
  )
}
