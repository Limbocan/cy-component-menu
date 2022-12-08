
export default function (w: any = window, d = document) {
  var raf = w.requestAnimationFrame || w.setImmediate || function (c: TimerHandler) { return setTimeout(c, 0); }

  function initEl(el: Element) {
    const barInstance = new SimpleScrollbar(el)
    Object.defineProperty(el, 'data-simple-scrollbar', { value: barInstance, configurable: true })
    return barInstance
  }

  function unbindEl(el: Element) {
    if (!Object.prototype.hasOwnProperty.call(el, 'data-simple-scrollbar')) return
    el['data-simple-scrollbar'].unBind()
    //Remove the elements property
    delete el['data-simple-scrollbar']
  }

  // Mouse drag handler
  function dragDealer(el: { addEventListener: (arg0: string, arg1: (e: any) => boolean) => void; classList: { add: (arg0: string) => void; remove: (arg0: string) => void; }; }, context: { el: { scrollTop: number; }; scrollRatio: number; }) {
    var lastPageY: number

    el.addEventListener('mousedown', function (e: { pageY: any; }) {
      lastPageY = e.pageY
      el.classList.add('cy-menu-grabbed')
      d.body.classList.add('cy-menu-grabbed')

      d.addEventListener('mousemove', drag)
      d.addEventListener('mouseup', stop)

      return false
    })

    function drag(e: { pageY: number; }) {
      var delta = e.pageY - lastPageY
      lastPageY = e.pageY

      raf(function () {
        context.el.scrollTop += delta / context.scrollRatio
      })
    }

    function stop() {
      el.classList.remove('cy-menu-grabbed')
      d.body.classList.remove('cy-menu-grabbed')
      d.removeEventListener('mousemove', drag)
      d.removeEventListener('mouseup', stop)
    }
  }

  // Constructor
  function ss(this: any, el) {
    this.target = el
    this.content = el.firstElementChild

    this.direction = w.getComputedStyle(this.target).direction

    this.bar = '<div class="cy-menu-scroll">'
    //Create a reference to the function binding to remove the event listeners
    this.mB = this.moveBar.bind(this)

    this.wrapper = d.createElement('div')
    this.wrapper.setAttribute('class', 'cy-menu-wrapper')

    this.el = d.createElement('div')
    this.el.setAttribute('class', 'cy-menu-content')

    if (this.direction === 'rtl') {
      this.el.classList.add('rtl')
    }

    this.wrapper.appendChild(this.el)

    while (this.target.firstChild) {
      this.el.appendChild(this.target.firstChild)
    }
    this.target.appendChild(this.wrapper)

    this.target.insertAdjacentHTML('beforeend', this.bar)
    this.bar = this.target.lastChild

    dragDealer(this.bar, this)
    this.moveBar()

    w.addEventListener('resize', this.mB)
    this.el.addEventListener('scroll', this.mB)
    this.el.addEventListener('mouseenter', this.mB)
    // this.el.addEventListener('mousemove', this.mB)

    this.target.classList.add('cy-menu-container')

    var css = w.getComputedStyle(el)
    if (css['height'] === '0px' && css['max-height'] !== '0px') {
      el.style.height = css['max-height']
    }

    this.unBind = function () {
      //Remove event listeners
      w.removeEventListener('resize', this.mB)
      this.el.removeEventListener('scroll', this.mB)
      this.el.removeEventListener('mouseenter', this.mB)

      this.target.classList.remove('cy-menu-container')

      //Unwrap the initial content and remove remaining wrappers
      this.target.insertBefore(this.content, this.wrapper)
      this.target.removeChild(this.wrapper)

      //Remove the bar including its drag-dealer event listener
      this.target.removeChild(this.bar)
      this.bar = null //make way for the garbage collector
    }
  }

  ss.prototype = {
    moveBar: function () {
      var totalHeight = this.el.scrollHeight,
        ownHeight = this.el.clientHeight,
        _this = this

      this.scrollRatio = ownHeight / totalHeight

      var isRtl = _this.direction === 'rtl'
      var right = isRtl ?
        (_this.target.clientWidth - _this.bar.clientWidth + 18) :
        (_this.target.clientWidth - _this.bar.clientWidth) * -1

      raf(function () {
        // Hide scrollbar if no scrolling is possible
        if (_this.scrollRatio >= 1) {
          // _this.el.removeEventListener('mousemove', _this.mB)
          _this.bar.classList.add('cy-menu-hidden')
        } else {
          // _this.el.addEventListener('mousemove', _this.mB)
          _this.bar.classList.remove('cy-menu-hidden')
          _this.bar.style.cssText = 'height:' + Math.max(_this.scrollRatio * 100, 10) + '%; top:' + (_this.el.scrollTop / totalHeight) * 100 + '%;right:' + right + 'px;'
        }
      })
    },
    hiddenBar: function () {
      var _this = this
      _this.bar.classList.add('cy-menu-hidden')
    },
    getBar: function () {
      var _this = this
      return _this.bar
    }
  }

  function initAll() {
    var nodes = d.querySelectorAll('*[cy-menu-container]')

    for (var i = 0; i < nodes.length; i++) {
      initEl(nodes[i])
    }
  }

  function unbindAll() {
    var nodes = d.querySelectorAll('.cy-menu-container')

    for (var i = 0; i < nodes.length; i++) {
      unbindEl(nodes[i])
    }
  }

  d.addEventListener('DOMContentLoaded', initAll)
  ss.initEl = initEl
  ss.initAll = initAll
  ss.unbindEl = unbindEl
  ss.unbindAll = unbindAll

  var SimpleScrollbar = ss
  return SimpleScrollbar
}
