(function () {
  var GA_ID = 'G-KWY8TBY387'

  var loader = document.createElement('script')
  loader.async = true
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
  document.head.appendChild(loader)

  window.dataLayer = window.dataLayer || []
  function gtag() { dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID, { transport_type: 'beacon' })

  function downloadLocation(el) {
    if (el.closest('.site-header')) return 'nav'
    if (el.closest('.hero')) return 'hero'
    if (el.closest('#download')) return 'download'
    if (el.closest('.site-footer')) return 'footer'
    return 'other'
  }

  document.addEventListener('click', function (e) {
    var t = e.target
    if (!t || !t.closest) return

    var a = t.closest('a[href]')
    if (a) {
      var href = a.getAttribute('href') || ''
      if (/\.dmg([?#]|$)/i.test(href)) {
        gtag('event', 'download', { method: 'dmg', location: downloadLocation(a) })
      } else if (/cli\.html/i.test(href)) {
        gtag('event', 'nav_click', { target: 'cli_docs' })
      } else if (/\/releases([/?#]|$)/i.test(href)) {
        gtag('event', 'nav_click', { target: 'releases' })
      } else if (/github\.com/i.test(href)) {
        gtag('event', 'nav_click', { target: 'github' })
      }
      return
    }

    var btn = t.closest('.copy-btn')
    if (btn) {
      var pre = btn.closest('pre.code-block')
      var code = pre && pre.querySelector('code')
      if (code && /install\.sh/i.test(code.textContent || '')) {
        gtag('event', 'install_script_copy')
      }
    }
  })
})()
