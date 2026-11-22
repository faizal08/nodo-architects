import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ease } from './motion'

// Wraps every route: sets the title and plays the curtain transition.
export default function Page({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} — NODO Architects` : 'NODO Architects — The Art of Connection'
  }, [title])

  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, ease, delay: 0.35 } }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease } }}
      >
        {children}
      </motion.main>
      {/* curtain sweep on enter */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-top bg-ink-deep"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.9, ease, delay: 0.1 } }}
        exit={{ scaleY: 0 }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-burgundy"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.5, ease } }}
      />
    </>
  )
}

export function PageHero({ eyebrow, title, intro, align = 'left', children, dark = false }) {
  return (
    <section className={`${dark ? 'bg-ink-deep text-bone' : ''} relative pt-40 pb-16 md:pt-56 md:pb-24`}>
      <div className={`container-x ${align === 'center' ? 'text-center' : ''}`}>
        {eyebrow && (
          <motion.p
            className={`eyebrow mb-8 flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.6 }}
          >
            <span className="h-px w-10 bg-current" />
            {eyebrow}
          </motion.p>
        )}
        {title}
        {intro && (
          <motion.p
            className={`mt-10 max-w-xl text-lg leading-relaxed opacity-75 ${align === 'center' ? 'mx-auto' : 'md:ml-[40%]'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 1, ease, delay: 1 }}
          >
            {intro}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
