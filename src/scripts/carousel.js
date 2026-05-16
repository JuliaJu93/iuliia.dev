export function initCarousel(container = document) {
  const root       = container === document ? document : container
  const track      = root.querySelector('.carousel__track')
  const pagination = root.querySelector('.carousel__pagination')
  const counter    = root.querySelector('.carousel__counter')
  const prevBtn    = root.querySelector('.carousel__btn--prev')
  const nextBtn    = root.querySelector('.carousel__btn--next')

  if (!track) return

  const slides = Array.from(track.querySelectorAll('.carousel__slide'))
  if (slides.length === 0) return

  let current = 0

  slides.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.className = 'carousel__dot'
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`)
    dot.setAttribute('aria-current', String(i === 0))
    dot.addEventListener('click', () => goTo(i))
    pagination?.appendChild(dot)
  })

  function goTo(index) {
    current = Math.max(0, Math.min(index, slides.length - 1))
    const slideWidth = slides[0].offsetWidth + 24 // 24 = gap (1.5rem)
    track.style.transform = `translateX(-${current * slideWidth}px)`

    pagination?.querySelectorAll('.carousel__dot').forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === current))
    })

    if (counter) counter.textContent = `${current + 1} / ${slides.length}`
    if (prevBtn) prevBtn.disabled = current === 0
    if (nextBtn) nextBtn.disabled = current === slides.length - 1

    slides.forEach((s, i) => {
      s.setAttribute('aria-hidden', String(i !== current))
    })
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1))
  nextBtn?.addEventListener('click', () => goTo(current + 1))

  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(current - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1) }
  })

  // Mouse drag
  let dragStart = 0
  let isDragging = false

  track.addEventListener('pointerdown', e => {
    if (e.target.closest('a, button, img')) return
    dragStart = e.clientX
    isDragging = true
    track.setPointerCapture(e.pointerId)
  })

  track.addEventListener('pointerup', e => {
    if (!isDragging) return
    isDragging = false
    const delta = dragStart - e.clientX
    if (Math.abs(delta) > 50) goTo(delta > 0 ? current + 1 : current - 1)
  })

  // Touch swipe
  let touchStart = 0
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX }, { passive: true })
  track.addEventListener('touchend', e => {
    const delta = touchStart - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) goTo(delta > 0 ? current + 1 : current - 1)
  }, { passive: true })

  // Pause autoplay on focus/hover (extensibility hook)
  track.addEventListener('mouseenter', () => track.dataset.paused = 'true')
  track.addEventListener('mouseleave', () => delete track.dataset.paused)
  track.addEventListener('focusin',   () => track.dataset.paused = 'true')
  track.addEventListener('focusout',  () => delete track.dataset.paused)

  goTo(0)
}
