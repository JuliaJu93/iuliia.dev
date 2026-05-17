import { initTheme }    from './theme.js'
import { initI18n }    from './i18n.js'
import { initCarousel } from './carousel.js'
import { initLightbox } from './lightbox.js'

// Run before DOMContentLoaded to prevent theme flash
initTheme()

document.addEventListener('DOMContentLoaded', () => {
  initI18n()
  initScrollReveal()
  initCaseStudyToggles()
  initLightbox()

  const yearEl = document.getElementById('footer-year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()
})

function initCaseStudyToggles() {
  const carouselsInited = new Set()

  document.querySelectorAll('.case-study-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target
      const panel = targetId ? document.getElementById(targetId) : null
      if (!panel) return

      const isOpen = panel.classList.contains('is-open')
      panel.classList.toggle('is-open', !isOpen)
      btn.setAttribute('aria-expanded', String(!isOpen))

      if (!isOpen && !carouselsInited.has(targetId)) {
        const carousel = panel.querySelector('.carousel')
        if (carousel) {
          carouselsInited.add(targetId)
          initCarousel(carousel)
        }
      }
    })
  })
}

function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }),
    { threshold: 0.1 }
  )

  document.querySelectorAll('.section > *').forEach(el => {
    el.classList.add('fade-in')
    observer.observe(el)
  })
}
