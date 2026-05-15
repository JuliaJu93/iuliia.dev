const STORAGE_KEY = 'preferred-theme'

export function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(stored ?? (prefersDark ? 'dark' : 'light'))

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
  })

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? 'dark' : 'light')
  })
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  const btn = document.getElementById('theme-toggle')
  if (!btn) return
  btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`)
  btn.innerHTML = theme === 'dark' ? lampOnIcon() : lampOffIcon()
}

function lampOffIcon() {
  return `<span style="display:inline-flex;align-items:center;gap:5px;font-size:0.75rem;font-weight:700;letter-spacing:0.06em">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2C7.58 2 4 5.58 4 10c0 2.7 1.33 5.09 3.38 6.56L8 19h8l.62-2.44C18.67 15.09 20 12.7 20 10c0-4.42-3.58-8-8-8z"/>
      <line x1="8.5" y1="19" x2="15.5" y2="19"/>
      <line x1="9.5" y1="22" x2="14.5" y2="22"/>
    </svg>
    off
  </span>`
}

function lampOnIcon() {
  return `<span style="display:inline-flex;align-items:center;gap:5px;font-size:0.75rem;font-weight:700;letter-spacing:0.06em">
    <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2C7.58 2 4 5.58 4 10c0 2.7 1.33 5.09 3.38 6.56L8 19h8l.62-2.44C18.67 15.09 20 12.7 20 10c0-4.42-3.58-8-8-8z" fill="#FFD700"/>
      <line x1="8.5" y1="19" x2="15.5" y2="19" fill="none"/>
      <line x1="9.5" y1="22" x2="14.5" y2="22" fill="none"/>
    </svg>
    on
  </span>`
}
