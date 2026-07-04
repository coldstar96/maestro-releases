document.addEventListener('DOMContentLoaded', () => {
  for (const pre of document.querySelectorAll('pre.code-block')) {
    const btn = document.createElement('button')
    btn.className = 'copy-btn'
    btn.type = 'button'
    btn.textContent = 'Copy'
    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')
      await navigator.clipboard.writeText((code ?? pre).innerText)
      btn.textContent = 'Copied'
      setTimeout(() => { btn.textContent = 'Copy' }, 1200)
    })
    pre.appendChild(btn)
  }
})
