import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { ease } from './motion'

// First-visit intro: logo rises, counter runs, curtain lifts.
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('nodo-intro')
    } catch {
      return true
    }
  })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!show) return
    let n = 0
    const id = setInterval(() => {
      n += Math.ceil(Math.random() * 9)
      if (n >= 100) {
        n = 100
        clearInterval(id)
        setTimeout(() => {
          setShow(false)
          try {
            sessionStorage.setItem('nodo-intro', '1')
          } catch {}
        }, 450)
      }
      setCount(n)
    }, 45)
    return () => clearInterval(id)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink-deep p-6 text-bone md:p-10"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.1, ease }}
        >
          <div className="eyebrow flex justify-between opacity-60">
            <span>NODO Architects</span>
            <span>Est. 2026</span>
          </div>
          <div className="overflow-hidden">
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1.2, ease }}>
              <Logo className="mx-auto w-[70vw] max-w-3xl" />
            </motion.div>
          </div>
          <div className="flex items-end justify-between">
            <span className="eyebrow opacity-60">The Art of Connection</span>
            <span className="display text-6xl md:text-8xl">{count}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
