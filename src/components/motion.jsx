import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, animate } from 'framer-motion'

export const ease = [0.16, 1, 0.3, 1]

/* Fade + rise when scrolled into view */
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div', once = true }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </M>
  )
}

/* Word-by-word masked reveal for headings */
export function SplitText({ text, className = '', delay = 0, stagger = 0.06, as = 'h2', immediate = false }) {
  const M = motion[as]
  const lines = Array.isArray(text) ? text : [text]
  let i = 0
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { y: '110%', rotate: 4 },
    show: { y: '0%', rotate: 0, transition: { duration: 1.2, ease } },
  }
  const viewProps = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
  return (
    <M className={className} variants={container} initial="hidden" {...viewProps} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(' ').map((w) => (
            <span key={i++} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top mr-[0.22em] last:mr-0">
              <motion.span variants={word} className="inline-block origin-bottom-left">
                {w}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </M>
  )
}

/* Image that unveils with a clip-path wipe and drifts with scroll */
export function ParallaxImage({ src, alt = '', className = '', imgClassName = '', strength = 12, reveal = 'up', zoom = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  const clips = {
    up: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    left: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    right: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'],
    center: ['inset(20% 20% 20% 20%)', 'inset(0% 0% 0% 0%)'],
  }
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: clips[reveal][0] }}
      whileInView={{ clipPath: clips[reveal][1] }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 1.6, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1 + strength / 50 }}
        initial={zoom ? { scale: 1.35 } : false}
        whileInView={zoom ? { scale: 1 + strength / 50 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease }}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </motion.div>
  )
}

/* Infinite text marquee */
export function Marquee({ items, className = '', slow = false, separator = '✦' }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-10">{t}</span>
          <span className="text-[0.35em] opacity-60">{separator}</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <div className={`flex w-max ${slow ? 'marquee-slow' : 'marquee'}`}>
        {row}
        {row}
      </div>
    </div>
  )
}

/* Number that counts up once visible */
export function Counter({ to, suffix = '', className = '', plain = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease, onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className}>
      {plain ? val : val.toLocaleString()}
      {suffix}
    </span>
  )
}

/* Element that leans toward the pointer */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* Signature graphic: nodes connected by drawing lines — "the art of connection" */
export function NodeLines({ className = '', stroke = 'currentColor' }) {
  const pts = [
    [40, 260], [150, 90], [260, 200], [370, 60], [470, 230], [560, 120],
  ]
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
  const cross = 'M40,260 L260,200 L560,120 M150,90 L370,60 L470,230'
  return (
    <svg viewBox="0 0 600 300" className={className} fill="none" aria-hidden>
      <motion.path
        d={cross}
        stroke={stroke}
        strokeWidth="0.6"
        strokeOpacity="0.35"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease, delay: 0.6 }}
      />
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease }}
      />
      {pts.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="5"
          fill={stroke}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.25 }}
        />
      ))}
    </svg>
  )
}

/* Rotating circular text badge */
export function RotatingBadge({ text = 'THE ART OF CONNECTION · NODO ARCHITECTS · ', className = '', children }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="spin-slow h-full w-full" aria-hidden>
        <defs>
          <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="currentColor" fontSize="12.5" letterSpacing="4.2" fontFamily="Manrope, sans-serif">
          <textPath href="#circ">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

/* Horizontal line that draws across */
export function Rule({ className = '', delay = 0 }) {
  return (
    <motion.div
      className={`h-px origin-left bg-current ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease, delay }}
    />
  )
}
