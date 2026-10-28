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
/**
 * Pushes each element in `shapeRefs` away from the pointer, as a lightly
 * damped spring rather than a plain ease — it overshoots a little and
 * settles, which reads as weight instead of a UI element sliding. A shape
 * that's been nudged stays nudged: the target only ever moves further from
 * each shape's original spot, never back toward it.
 *
 * Deliberately all spring (position + velocity, integrated every frame) and
 * no CSS `transition`: retriggering a CSS transition on every pointermove —
 * which fires continuously while the cursor is near a shape — restarts its
 * easing curve dozens of times a second, which is what reads as jittery.
 * One continuous RAF loop sidesteps that by never restarting anything.
 */
export function useShapeDodge(
  containerRef: React.RefObject<HTMLElement | null>,
  shapeRefs: React.RefObject<HTMLElement | null>[],
  radius = 230,
  maxPush = 80,
  maxTotal = 240,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const STIFFNESS = 0.08
    const DAMPING = 0.78
    const SETTLE_EPS = 0.02

    const n = shapeRefs.length
    const target = Array.from({ length: n }, () => ({ x: 0, y: 0 }))
    const pos = Array.from({ length: n }, () => ({ x: 0, y: 0 }))
    const vel = Array.from({ length: n }, () => ({ x: 0, y: 0 }))

    let pointerX = -Infinity
    let pointerY = -Infinity
    let raf = 0

    // Each shape's resting spot, measured once (not from getBoundingClientRect
    // mid-flight, which would already include its own transform — chasing a
    // moving reference point is what made the distance math feel erratic).
    const home = shapeRefs.map((ref) => {
      const el = ref.current
      if (!el) return { x: 0, y: 0 }
      const rect = el.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    })

    const retargetFromPointer = () => {
      shapeRefs.forEach((_, i) => {
        const dx = home[i].x + target[i].x - pointerX
        const dy = home[i].y + target[i].y - pointerY
        const dist = Math.hypot(dx, dy)
        if (dist <= 0.01 || dist >= radius) return

        const strength = (1 - dist / radius) * maxPush
        let nx = target[i].x + (dx / dist) * strength
        let ny = target[i].y + (dy / dist) * strength

        const total = Math.hypot(nx, ny)
        if (total > maxTotal) {
          const scale = maxTotal / total
          nx *= scale
          ny *= scale
        }
        target[i] = { x: nx, y: ny }
      })
      if (!raf) raf = requestAnimationFrame(step)
    }

    const step = () => {
      let settled = true
      shapeRefs.forEach((ref, i) => {
        const el = ref.current
        if (!el) return

        const ax = (target[i].x - pos[i].x) * STIFFNESS
        const ay = (target[i].y - pos[i].y) * STIFFNESS
        vel[i].x = (vel[i].x + ax) * DAMPING
        vel[i].y = (vel[i].y + ay) * DAMPING
        pos[i].x += vel[i].x
        pos[i].y += vel[i].y

        const moving =
          Math.abs(vel[i].x) > SETTLE_EPS ||
          Math.abs(vel[i].y) > SETTLE_EPS ||
          Math.abs(target[i].x - pos[i].x) > SETTLE_EPS ||
          Math.abs(target[i].y - pos[i].y) > SETTLE_EPS
        if (moving) settled = false

        el.style.setProperty('--push-x', `${pos[i].x.toFixed(1)}px`)
        el.style.setProperty('--push-y', `${pos[i].y.toFixed(1)}px`)

        // Squash/stretch along the direction of travel — weight and
        // springiness read through motion, not just through position.
        const speed = Math.hypot(vel[i].x, vel[i].y)
        if (speed > 0.3) {
          const angle = (Math.atan2(vel[i].y, vel[i].x) * 180) / Math.PI
          const stretch = 1 + Math.min(speed / 32, 0.32)
          el.style.setProperty('--stretch-angle', `${angle.toFixed(1)}deg`)
          el.style.setProperty('--stretch-x', stretch.toFixed(3))
          el.style.setProperty('--stretch-y', (1 / stretch).toFixed(3))
        } else {
          el.style.setProperty('--stretch-x', '1')
          el.style.setProperty('--stretch-y', '1')
        }
      })
      raf = settled ? 0 : requestAnimationFrame(step)
    }

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      retargetFromPointer()
    }

    container.addEventListener('pointermove', onMove)
    return () => {
      container.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [containerRef, shapeRefs, radius, maxPush, maxTotal])
}
