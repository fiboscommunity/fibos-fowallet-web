function pageResponse (opt) {
  var ua = navigator.userAgent
  var wp = ua.match(/Windows Phone ([\d.]+)/)
  var android = ua.match(/(Android);?[\s.]+([\d.]+)?/)

  var dw = document.documentElement.clientWidth
  var dh = document.documentElement.clientHeight
  var ds = dw / dh
  var pw = opt.width || 320
  var ph = opt.height || 504
  var ps = pw / ph
  var pd = document.querySelectorAll(opt.selectors)
  var i = pd.length

  var sm = opt.mode || 'auto'
  var or = opt.origin || 'left top 0'
  var sn = (sm === 'contain') ? (ds > ps ? dh / ph : dw / pw) : (sm === 'cover') ? (ds < ps ? dh / ph : dw / pw) : dw / pw

  function template (mode, obj, num) {
    var _o = obj.style
    _o.width = pw + 'px'
    _o.height = ph + 'px'
    _o.webkitTransformOrigin = or
    _o.transformOrigin = or
    _o.webkitTransform = 'scale(' + num + ')'
    _o.transform = 'scale(' + num + ')'
    // 兼容android 2.3.5系统下body高度不自动刷新的bug
    if (mode === 'auto' && android) {
      document.body.style.height = ph * num + 'px'
    } else
    if (mode === 'contain' || mode === 'cover') {
      _o.position = 'absolute'
      _o.left = (dw - pw) / 2 + 'px'
      _o.top = (dh - ph) / 2 + 'px'
      _o.webkitTransformOrigin = 'center center 0'
      _o.transformOrigin = 'center center 0'
      // 阻止默认滑屏事件
      if (wp) {
        document.body.style.msTouchAction = 'none'
      } else {
        document.ontouchmove = function (e) {
          e.preventDefault()
        }
      }
    }
  }
  while (--i >= 0) {
    template(sm, pd[i], sn)
  }
}
export { pageResponse }
