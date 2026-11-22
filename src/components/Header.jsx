import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Logo from './Logo'
import { nav, studio } from '../data/site'
import { ease } from './motion'

const menuImages = {
  '/': '/images/cake-co-counter.webp',
  '/studio': '/images/studio-talk.webp',
  '/projects': '/images/maqbool-residence.webp',
  '/founder': '/images/shana-portrait.webp',
  '/services': '/images/cake-co-table.webp',
  '/approach': '/images/studio-sketch.webp',
  '/contact': '/images/cake-co-entrance.webp',
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState('/')
  const { scrollY } = useScroll()
  const { pathname } = useLocation()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 200)
  })

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-bone mix-blend-difference"
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="container-x flex items-center justify-between py-5 md:py-7">
          <Link to="/" aria-label="NODO Architects home" className="flex items-center gap-4">
            <Logo className="h-5 md:h-6" />
            <span className="eyebrow hidden opacity-80 lg:inline">Architects</span>
          </Link>
          <nav className="hidden items-center gap-9 md:flex">
            {nav.slice(1, 5).map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `eyebrow link-line pb-1 ${isActive ? 'bg-[length:100%_1px]' : ''}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => setOpen((o) => !o)}
            className="group flex items-center gap-3"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="eyebrow">{open ? 'Close' : 'Menu'}</span>
            <span className="relative block h-3 w-8">
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0 group-hover:w-1/2'}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-deep text-bone"
            initial={{ clipPath: 'circle(0% at 95% 4%)' }}
            animate={{ clipPath: 'circle(150% at 95% 4%)' }}
            exit={{ clipPath: 'circle(0% at 95% 4%)' }}
            transition={{ duration: 1, ease }}
          >
            <div className="container-x grid h-full grid-cols-12 gap-6 pt-28 pb-10">
              <ul className="col-span-12 flex flex-col justify-center lg:col-span-7">
                {nav.map((n, i) => (
                  <li key={n.to} className="overflow-hidden border-b border-bone/10">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
                    >
                      <NavLink
                        to={n.to}
                        onMouseEnter={() => setHovered(n.to)}
                        className={({ isActive }) =>
                          `group flex items-baseline gap-6 py-2 md:py-3 ${isActive ? 'text-blush' : ''}`
                        }
                      >
                        <span className="eyebrow w-8 opacity-40">0{i + 1}</span>
                        <span className="display text-5xl transition-all duration-700 group-hover:translate-x-4 group-hover:italic md:text-7xl">
                          {n.label}
                        </span>
                      </NavLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <div className="relative col-span-5 hidden lg:block">
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={hovered}
                    src={menuImages[hovered]}
                    alt=""
                    className="absolute inset-y-10 right-0 h-[calc(100%-5rem)] w-full object-cover"
                    initial={{ opacity: 0, scale: 1.1, clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease }}
                  />
                </AnimatePresence>
              </div>
              <motion.div
                className="eyebrow col-span-12 flex flex-wrap justify-between gap-4 self-end opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.8 }}
              >
                <a href={`mailto:${studio.email}`}>{studio.email}</a>
                <a href={`tel:${studio.phoneHref}`}>{studio.phone}</a>
                <span>{studio.location}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
