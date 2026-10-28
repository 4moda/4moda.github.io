import { useEffect, useState } from 'react'

/** True once the page has scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/** Id of whichever of `ids` currently owns the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** True once the element has scrolled into view; stays true afterwards. */
export function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(
    () =>
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (inView) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, ref])

  return inView
}

/** 0 → 1 as the page scrolls from top to bottom. Updated on animation frames. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}

/**
 * Pointer position over `ref`, written to --mx / --my as percentages so CSS
 * can follow the cursor without a re-render. No-op for touch and for readers
 * who asked for reduced motion.
 */
export function usePointerSpotlight<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    let x = 50
    let y = 50
    const apply = () => {
      frame = 0
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x = ((event.clientX - rect.left) / rect.width) * 100
      y = ((event.clientY - rect.top) / rect.height) * 100
      if (!frame) frame = requestAnimationFrame(apply)
    }

    el.addEventListener('pointermove', onMove)
    return () => {
      el.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}

/**
 * Pushes each element in `shapeRefs` away from the pointer whenever it comes
 * within `radius` px, writing the offset to --push-x / --push-y (a CSS
 * transition on those does the easing, this just supplies the target).
 * No-op for touch and for readers who asked for reduced motion — same
 * guard as usePointerSpotlight, since this is the same kind of decoration.
 */
export function useShapeDodge(
  containerRef: React.RefObject<HTMLElement | null>,
  shapeRefs: React.RefObject<HTMLElement | null>[],
  radius = 170,
  maxPush = 46,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    let pointerX = -Infinity
    let pointerY = -Infinity

    const apply = () => {
      frame = 0
      for (const ref of shapeRefs) {
        const el = ref.current
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const dx = rect.left + rect.width / 2 - pointerX
        const dy = rect.top + rect.height / 2 - pointerY
        const dist = Math.hypot(dx, dy)
        if (dist > 0.01 && dist < radius) {
          const strength = (1 - dist / radius) * maxPush
          el.style.setProperty('--push-x', `${((dx / dist) * strength).toFixed(1)}px`)
          el.style.setProperty('--push-y', `${((dy / dist) * strength).toFixed(1)}px`)
        } else {
          el.style.setProperty('--push-x', '0px')
          el.style.setProperty('--push-y', '0px')
        }
      }
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      pointerX = -Infinity
      pointerY = -Infinity
      if (!frame) frame = requestAnimationFrame(apply)
    }

    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)
    return () => {
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [containerRef, shapeRefs, radius, maxPush])
}
