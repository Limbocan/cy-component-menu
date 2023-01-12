

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
  name: 'test-components',
  expand: true,
  labelProp: 'title',
  footerHeight: '0',
  data: EXAMPLE_LIST
}

export const EXAMPLE_METHODS = {
  headerSlot: (val) => {
    // const header = document.createElement('div')
    // header.innerHTML = 'slot-header' + val
    // header.onclick = () => {
    //   console.log(renderInstance, '====')
    // }
    // return header
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
