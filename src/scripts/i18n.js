const STORAGE_KEY = 'preferred-lang'
const SUPPORTED = ['en', 'ru']

let translations = {}
let currentLang = 'en'

export async function initI18n() {
  const stored = localStorage.getItem(STORAGE_KEY)
  const detected = navigator.language?.split('-')[0] ?? 'en'
  currentLang = stored ?? (SUPPORTED.includes(detected) ? detected : 'en')

  await loadTranslations(currentLang)
  applyTranslations()

  document.getElementById('lang-toggle')?.addEventListener('click', async () => {
    const next = currentLang === 'en' ? 'ru' : 'en'
    localStorage.setItem(STORAGE_KEY, next)
    await loadTranslations(next)
    applyTranslations()
  })
}

async function loadTranslations(lang) {
  const res = await fetch(`/src/locales/${lang}.json`)
  translations = await res.json()
  currentLang = lang
  document.documentElement.lang = lang
  const label = document.querySelector('#lang-toggle .lang-label')
  if (label) label.textContent = lang
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = resolve(translations, el.dataset.i18n)
    if (val) el.textContent = val
  })
}

function resolve(obj, key) {
  return key.split('.').reduce((acc, k) => acc?.[k], obj) ?? null
}

export function t(key) {
  return resolve(translations, key) ?? key
}
