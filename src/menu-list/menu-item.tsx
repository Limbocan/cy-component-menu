import { RenderMenuList } from './menu-list'

export const RenderMenuItem = (props) => {

  const childList = props.data.children && props.data.children.length > 0 ? props.data.children : null
  
  return (
    <>
      <li className="cy-menu-item">
        <span className="cy-menu-item-label">{props.data.title}</span>
      </li>
      {
        childList ? <RenderMenuList list={props.data.children}></RenderMenuList> : null
      }
    </>
  )
}
