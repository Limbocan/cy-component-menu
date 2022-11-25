
import { RenderMenuList } from './menu-list'

export const RenderMenuItem = (props) => {

  const childList = props.data.children && props.data.children.length > 0 ? props.data.children : null
  
  return (
    <>
      <li class="cy-menu-item">
        <div class="cy-menu-item-box">
          <div class="cy-menu-item-label">{props.data.title}</div>
        </div>
        {
          childList ? (
            <div class="cy-menu-item-child-list">
              <RenderMenuList list={props.data.children} level={props.level + 1}></RenderMenuList>
            </div>
          ) : null
        }
      </li>
    </>
  )
}
