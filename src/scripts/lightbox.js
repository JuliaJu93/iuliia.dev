export function initLightbox() {
  const lb = document.createElement('div')
  lb.className = 'lightbox'
  lb.setAttribute('role', 'dialog')
  lb.setAttribute('aria-modal', 'true')
  lb.setAttribute('aria-label', 'Image preview')
  lb.innerHTML = `
    <div class="lightbox__backdrop"></div>
    <button class="lightbox__close" aria-label="Close image">&#215;</button>
    <img class="lightbox__img" alt="" />
  `
  document.body.appendChild(lb)

  const lbImg    = lb.querySelector('.lightbox__img')
  const closeBtn = lb.querySelector('.lightbox__close')
  let triggerEl  = null

  function open(img) {
    triggerEl  = img
    lbImg.src  = img.src
    lbImg.alt  = img.alt
    lb.classList.add('is-open')
    document.body.classList.add('lightbox-open')
    closeBtn.focus()
  }

  function close() {
    lb.classList.remove('is-open')
    document.body.classList.remove('lightbox-open')
    triggerEl?.focus()
    triggerEl = null
  }

  closeBtn.addEventListener('click', close)
  lb.querySelector('.lightbox__backdrop').addEventListener('click', close)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) close()
  })

  // Track drag so carousel swipes don't accidentally open the lightbox
  let wasDragged = false
  document.addEventListener('pointerdown', () => { wasDragged = false }, { passive: true, capture: true })
  document.addEventListener('pointermove', e => {
    if (e.buttons > 0 && (Math.abs(e.movementX) + Math.abs(e.movementY)) > 4) wasDragged = true
  }, { passive: true, capture: true })

  document.addEventListener('click', e => {
    const photo = e.target.closest('.cs-photo')
    if (!photo) return
    if (wasDragged) return
    open(photo)
  }, { capture: true })
}
