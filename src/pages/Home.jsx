import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import Page from '../components/Page'
import CTA from '../components/CTA'
import {
  SplitText, Reveal, ParallaxImage, Marquee, Counter, NodeLines, RotatingBadge, Rule, Magnetic, ease,
} from '../components/motion'
import { projects } from '../data/projects'
import { services, approach, studio } from '../data/site'

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink-deep text-bone">
      <motion.img
        src="/images/cake-co-counter.webp"
        alt="Cake & Co. café interior by NODO Architects"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ scale, y }}
        initial={{ scale: 1.3, filter: 'brightness(0.2)' }}
        animate={{ scale: 1, filter: 'brightness(1)' }}
        transition={{ duration: 2.6, ease }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/70 via-ink-deep/30 to-ink-deep/90" />

      <motion.div style={{ opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-12 md:pb-16">
        <SplitText
          as="h1"
          immediate
          delay={0.5}
          text={['where thoughts', 'take shape.']}
          className="display text-[17vw] leading-[0.85] md:text-[12vw]"
        />
        <div className="mt-10 grid grid-cols-12 items-end gap-6">
          <Reveal delay={1.2} className="col-span-12 md:col-span-4">
            <p className="font-serif text-2xl">Introducing NODO Architects.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-75">
              A space for architectural exploration, thoughtful design and new possibilities.
            </p>
          </Reveal>
          <Reveal delay={1.4} className="col-span-6 md:col-span-4 md:text-center">
            <p className="eyebrow opacity-70">Architecture · Concepts · Explorations</p>
          </Reveal>
          <Reveal delay={1.6} className="col-span-6 flex justify-end md:col-span-4">
            <RotatingBadge className="h-28 w-28 md:h-36 md:w-36">
              <motion.span
                className="text-xl"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ↓
              </motion.span>
            </RotatingBadge>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}

/* Words light up as you scroll through the statement */
function ScrollStatement({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="display text-[2.6rem] leading-[1.05] md:text-[5.2rem]">
      {words.map((w, i) => {
        const start = i / words.length
        return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>{w}</Word>
      })}
    </p>
  )
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const italic = ['connection', 'people,', 'ideas', 'belong.'].includes(children)
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${italic ? 'italic text-burgundy' : ''}`}>
      {children}
    </motion.span>
  )
}

function Manifesto() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <NodeLines className="pointer-events-none absolute -right-20 top-10 w-[60vw] max-w-3xl text-sand opacity-60" />
      <div className="container-x relative grid grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-3">
          <p className="eyebrow flex items-center gap-3 text-clay"><span className="h-2 w-2 rounded-full bg-burgundy" /> The Art of Connection</p>
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <ScrollStatement text="Every space begins with a connection — between people, ideas and the places they belong." />
          <Reveal delay={0.2} className="mt-16 grid gap-10 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-ink/75">
              NODO, meaning connection, reflects our belief that architecture is more than creating buildings.
              It is about bringing people, spaces and experiences together.
            </p>
            <div>
              <p className="text-lg leading-relaxed text-ink/75">
                Through thoughtful design, meaningful details and a deep understanding of space, we aim to create
                places that connect with people and become part of their stories.
              </p>
              <Link to="/studio" className="eyebrow link-line mt-8 inline-block pb-1">Discover the studio →</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  const stats = [
    { n: 5, s: '', l: 'Projects showcased' },
    { n: 4554, s: '', l: 'Sq ft of homes completed' },
    { n: 19, s: '', l: 'Acre campus master plan' },
    { n: 2026, s: '', l: 'Studio established', plain: true },
  ]
  return (
    <section className="border-y border-ink/10 bg-bone">
      <div className="container-x grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1} className={`py-14 md:py-20 ${i ? 'md:border-l' : ''} ${i % 2 ? 'border-l' : ''} border-ink/10 md:px-10 ${i % 2 ? 'pl-6' : ''}`}>
            <Counter to={s.n} suffix={s.s} plain={s.plain} className="display block text-6xl md:text-8xl" />
            <p className="eyebrow mt-4 text-clay">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Vertical scroll drives a horizontal filmstrip of Cake & Co. */
function FeaturedFilmstrip() {
  const p = projects[0]
  const ref = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink-deep text-bone">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-4 text-blush">Featured project</p>
            <h2 className="display text-6xl md:text-8xl">{p.title}</h2>
          </div>
          <Link to={`/projects/${p.slug}`} className="eyebrow link-line hidden pb-1 md:block">View the project →</Link>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-[clamp(1.25rem,4vw,4rem)] md:gap-10">
          <div className="flex w-[78vw] shrink-0 flex-col justify-between border border-bone/15 p-8 md:w-[32vw] md:p-12">
            <p className="eyebrow text-sand">{p.type}</p>
            <p className="display text-3xl italic md:text-5xl">“{p.lede}”</p>
            <div className="flex gap-2">
              {p.palette.map((c) => (
                <span key={c} className="h-8 w-8 rounded-full ring-1 ring-bone/20" style={{ background: c }} />
              ))}
            </div>
          </div>
          {p.gallery.map((g, i) => (
            <Link
              key={g.src}
              to={`/projects/${p.slug}`}
              data-cursor="View"
              className={`group relative w-[70vw] shrink-0 overflow-hidden md:w-[30vw] ${i % 2 ? 'mt-16' : ''}`}
            >
              <img src={g.src} alt={g.caption} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105" />
              <p className="eyebrow mt-4 opacity-60">0{i + 1} — {g.caption}</p>
            </Link>
          ))}
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-px w-full bg-bone/15">
            <motion.div style={{ width: bar }} className="h-px bg-blush" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* Project index with an image that follows the pointer */
function WorkIndex() {
  const [active, setActive] = useState(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 150, damping: 20 })
  const y = useSpring(my, { stiffness: 150, damping: 20 })

  return (
    <section
      className="relative py-32 md:py-44"
      onMouseMove={(e) => {
        mx.set(e.clientX)
        my.set(e.clientY)
      }}
    >
      <div className="container-x">
        <div className="mb-16 grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow mb-6 text-clay">Selected works · 2023 — Now</p>
            <SplitText text={['Places that', 'become stories.']} className="display text-6xl md:text-8xl" />
          </div>
          <Reveal className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="leading-relaxed text-ink/70">
              Homes, cafés, campuses and city infrastructure — each project begins with a unique interpretation of
              the people it serves.
            </p>
          </Reveal>
        </div>

        <ul onMouseLeave={() => setActive(null)}>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 0.05}>
              <Link
                to={`/projects/${p.slug}`}
                data-cursor="Open"
                onMouseEnter={() => setActive(p)}
                className="group grid grid-cols-12 items-center gap-4 border-t border-ink/15 py-7 transition-colors duration-500 last:border-b hover:text-burgundy md:py-10"
              >
                <span className="eyebrow col-span-2 text-clay md:col-span-1">0{i + 1}</span>
                <span className="display col-span-10 text-4xl transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-6 group-hover:italic md:col-span-6 md:text-7xl">
                  {p.title}
                </span>
                <span className="col-span-6 col-start-3 text-sm text-ink/60 md:col-span-3 md:col-start-auto">{p.location}</span>
                <span className="eyebrow col-span-4 text-right md:col-span-2">{p.category}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 text-center">
          <Magnetic>
            <Link to="/projects" className="eyebrow inline-flex items-center gap-4 rounded-full bg-ink px-10 py-5 text-bone transition-colors duration-500 hover:bg-burgundy">
              All projects <span aria-hidden>→</span>
            </Link>
          </Magnetic>
        </div>
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {active && (
            <motion.img
              key={active.slug}
              src={active.thumb}
              alt=""
              className="-translate-x-1/2 -translate-y-1/2 h-72 w-56 object-cover shadow-2xl"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.5, ease }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function Residences() {
  const homes = projects.filter((p) => p.category === 'Residential')
  return (
    <section className="bg-bone py-28 md:py-40">
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SplitText text="Homes, grounded in nature." className="display max-w-3xl text-5xl md:text-7xl" />
          <Reveal><p className="eyebrow text-clay">Residential · Kerala</p></Reveal>
        </div>
        <div className="grid gap-10 md:grid-cols-12">
          {homes.map((h, i) => (
            <Link
              key={h.slug}
              to={`/projects/${h.slug}`}
              data-cursor="View"
              className={`group block ${i === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-40'}`}
            >
              <ParallaxImage src={h.cover} alt={h.title} className="aspect-[4/3]" reveal={i ? 'right' : 'left'} />
              <div className="mt-6 flex items-baseline justify-between border-b border-ink/15 pb-4">
                <h3 className="display text-4xl transition-all duration-500 group-hover:italic">{h.title}</h3>
                <span className="eyebrow text-clay">{h.year}</span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/65">{h.lede}</p>
              <p className="eyebrow mt-3 text-clay">{h.specs.find((s) => s[0] === 'Area')?.[1]} · {h.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderTeaser() {
  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      <div className="container-x grid grid-cols-12 items-center gap-6">
        <div className="relative col-span-12 md:col-span-5">
          <ParallaxImage src="/images/shana-portrait.webp" alt={studio.founder} className="aspect-[3/4]" reveal="up" />
          <span className="display absolute -right-6 -bottom-10 hidden text-[10rem] italic text-burgundy/90 md:block">S.</span>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <Reveal><p className="eyebrow mb-8 text-clay">Meet the Founder</p></Reveal>
          <SplitText
            text={['“Architecture is an', 'opportunity to give', 'form to ideas.”']}
            className="display text-5xl md:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-lg leading-relaxed text-ink/70">
              Behind NODO Architects is a story of ideas, perspectives, and a passion for architecture. Founder and
              principal architect {studio.founder} leads every project with creative thinking, attention to detail
              and an understanding of how people experience spaces.
            </p>
            <Rule className="mt-10 w-40 text-ink/30" />
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-serif text-2xl">{studio.founder}</p>
                <p className="eyebrow mt-1 text-clay">Founder & Principal Architect</p>
              </div>
              <Link to="/founder" className="eyebrow link-line pb-1">Her story →</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ServicesStrip() {
  return (
    <section className="bg-ink text-bone">
      <Marquee items={services.map((s) => s.title)} className="display border-b border-bone/10 py-8 text-5xl md:text-7xl" slow />
      <div className="container-x grid gap-px bg-bone/10 py-px md:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.1} className="group relative overflow-hidden bg-ink p-8 md:p-10">
            <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-25" />
            <div className="relative">
              <p className="eyebrow text-blush">{s.no}</p>
              <h3 className="display mt-16 text-4xl">{s.title}</h3>
              <p className="mt-5 text-sm leading-relaxed opacity-70">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="container-x py-12 text-center">
        <Link to="/services" className="eyebrow link-line pb-1">All services →</Link>
      </div>
    </section>
  )
}

function ApproachPreview() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-x grid grid-cols-12 gap-6">
        <div className="col-span-12 md:sticky md:top-32 md:col-span-5 md:self-start">
          <p className="eyebrow mb-6 text-clay">Our Approach</p>
          <SplitText text={['From a first', 'conversation to', 'a finished place.']} className="display text-5xl md:text-7xl" />
          <Reveal delay={0.2}>
            <ParallaxImage src="/images/studio-sketch.webp" className="mt-12 aspect-[4/5] w-3/4 grayscale" reveal="up" />
          </Reveal>
        </div>
        <ol className="col-span-12 md:col-span-6 md:col-start-7">
          {approach.map((a, i) => (
            <Reveal as="li" key={a.no} delay={i * 0.05} className="group border-t border-ink/15 py-10 last:border-b">
              <div className="flex gap-8">
                <span className="display text-5xl text-sand transition-colors duration-500 group-hover:text-burgundy">{a.no}</span>
                <div>
                  <h3 className="display text-4xl">{a.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink/65">{a.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Link to="/approach" className="eyebrow link-line mt-10 inline-block pb-1">How we work →</Link>
        </ol>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <Manifesto />
      <Numbers />
      <FeaturedFilmstrip />
      <WorkIndex />
      <Residences />
      <FounderTeaser />
      <ServicesStrip />
      <ApproachPreview />
      <CTA />
    </Page>
  )
}
