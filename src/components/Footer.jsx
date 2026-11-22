import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Logo from './Logo'
import { nav, studio } from '../data/site'
import { projects } from '../data/projects'
import { Magnetic, Marquee } from './motion'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['60%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink-deep text-bone">
      <Link to="/contact" className="block border-b border-bone/10 py-10 md:py-16" data-cursor="Write">
        <Marquee
          items={["Let's build a connection", 'Start a project', 'Where every space finds its connection']}
          className="display text-5xl italic md:text-8xl"
        />
      </Link>

      <div className="container-x pt-20 pb-10">
        <div className="grid grid-cols-12 gap-y-12 gap-x-6">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow mb-6 text-sand">The Art of Connection</p>
            <p className="display max-w-md text-4xl md:text-5xl">
              Every space begins with a <em>connection.</em>
            </p>
            <Magnetic className="mt-10">
              <Link
                to="/contact"
                className="eyebrow inline-flex h-32 w-32 items-center justify-center rounded-full border border-bone/30 text-center transition-colors duration-500 hover:bg-bone hover:text-ink"
              >
                Start a<br />project
              </Link>
            </Magnetic>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-7">
            <p className="eyebrow mb-6 opacity-50">Explore</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-line">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <p className="eyebrow mb-6 opacity-50">Projects</p>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="link-line">{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow mb-6 opacity-50">Studio</p>
            <ul className="space-y-3 text-sm">
              <li><a className="link-line break-all" href={`mailto:${studio.email}`}>{studio.email}</a></li>
              <li><a className="link-line" href={`tel:${studio.phoneHref}`}>{studio.phone}</a></li>
              <li><a className="link-line" href={studio.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li className="opacity-70">{studio.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-24 overflow-hidden">
          <motion.div style={{ y }}>
            <Logo className="w-full text-bone/95" />
          </motion.div>
        </div>

        <div className="eyebrow mt-10 flex flex-col justify-between gap-3 opacity-50 md:flex-row">
          <span>© {new Date().getFullYear()} NODO Architects</span>
          <span>{studio.focus}</span>
          <span>Est. {studio.established}</span>
        </div>
      </div>
    </footer>
  )
}
