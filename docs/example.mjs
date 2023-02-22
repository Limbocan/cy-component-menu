

const EXAMPLE_LIST = [
  {
    title: '标题1',
    key: 1,
    children: [
      {
        title: '标题1-1',
        key: 11,
      },
      {
        title: '标题1-2',
        key: 12,
        children: [
          {
            title: '标题1-2-1',
            key: 121,
          },
        ]
      },
      {
        title: '标题1-3',
        key: 13,
      },
      {
        title: '标题1-4',
        key: 14,
      },
      {
        title: '标题1-5',
        key: 15,
      }
    ]
  },
  {
    title: '标题2',
    key: 2,
  },
  {
    title: '标题3',
    key: 3,
  },
  {
    title: '标题4',
    key: 4,
    children: [
      { title: '标题4-1-1', key: 411 },
      { title: '标题4-1-2', key: 412 },
      { title: '标题4-1-3', key: 413 },
      { title: '标题4-1-4', key: 414 },
    ]
  },
  {
    title: '标题5',
    key: 5,
  },
  {
    title: '标题6',
    key: 6,
  }
]

export const EXAMPLE_PROPS = {
  data: EXAMPLE_LIST, // []
  expand: true, // true
  activeMenu: null, // null
  footerHeight: '0', // '0'
  unique: true, // true
  labelProp: 'title', // 'label'
  keyProp: 'key', // 'key'
  childProp: 'children', // 'children'
  openKeys: [], // []
  height: '100%', // '100%'
  width: '240px', // '240px'
  alwaysPopover: false, // false
  onMenuClick: (val) => {
    console.log('菜单点击', val)
  }
}

export const EXAMPLE_SLOTS = {
  headerSlot: (val) => {
    const header = document.createElement('div')
    // header.innerHTML = 'slot-header' + val
    // header.onclick = () => {
    //   console.log(renderInstance, '====')
    // }
    return header
  },
  // footerSlot: (val) => {
  //   const footer = document.createElement('div')
  //   footer.innerHTML = 'slot-footer' + val
  //   footer.onclick = () => {
  //     console.log(renderInstance, '====')
  //   }
  //   return footer
  // },
}
