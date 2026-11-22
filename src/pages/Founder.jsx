import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import CTA from '../components/CTA'
import { SplitText, Reveal, ParallaxImage, Rule, Marquee, Magnetic, ease } from '../components/motion'
import { studio } from '../data/site'
import { projects } from '../data/projects'

const story = [
  'Behind NODO Architects is a story of ideas, perspectives, and a passion for architecture.',
  'I’m Shana, founder and principal architect at NODO Architects.',
  'Architecture is an opportunity to give form to ideas, explore new possibilities, and bring together aesthetics, functionality, and thoughtful detailing.',
  'At NODO, every project begins with a unique interpretation, shaped by creative thinking, attention to detail, and an understanding of how people experience spaces.',
]

const pillars = [
  { k: 'Aesthetics', t: 'Beauty that feels effortless, grounded in proportion, texture and light.' },
  { k: 'Functionality', t: 'Spaces that work quietly and well for the people who use them every day.' },
  { k: 'Thoughtful detailing', t: 'The small, considered moments that make a place feel complete.' },
]

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[#4a4b4d] text-bone">
      <motion.div style={{ x: textX }} className="pointer-events-none absolute top-28 left-0 whitespace-nowrap md:top-24">
        <motion.span
          className="display block text-[28vw] leading-none text-bone/10 md:text-[22vw]"
          initial={{ x: '20%' }}
          animate={{ x: 0 }}
          transition={{ duration: 2, ease }}
        >
          Meet the Founder
        </motion.span>
      </motion.div>

      <div className="container-x relative grid min-h-screen grid-cols-12 items-end gap-6 pt-40">
        <div className="col-span-12 self-center pb-10 md:col-span-6">
          <motion.p className="eyebrow mb-8 text-sand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Founder & Principal Architect
          </motion.p>
          <SplitText as="h1" immediate delay={0.6} text={['Meet', 'the Founder']} className="display text-7xl md:text-8xl lg:text-[9rem]" />
          <motion.p
            className="mt-8 font-serif text-3xl italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.3 }}
          >
            {studio.founder}
          </motion.p>
        </div>
        <motion.div
          className="col-span-12 md:col-span-5 md:col-start-8"
          style={{ y: imgY }}
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.8, ease, delay: 0.4 }}
        >
          <img src="/images/shana-portrait.webp" alt={`${studio.founder}, founder of NODO Architects`} className="w-full object-cover" />
        </motion.div>
      </div>
    </section>
  )
}

export default function Founder() {
  return (
    <Page title="Founder — Ar. Shana Rahmath">
      <Hero />

      <section className="py-28 md:py-44">
        <div className="container-x grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Reveal className="md:sticky md:top-32">
              <p className="eyebrow text-clay">In her words</p>
              <Rule className="mt-6 w-16 text-burgundy" />
            </Reveal>
          </div>
          <div className="col-span-12 space-y-14 md:col-span-8">
            {story.map((s, i) => (
              <Reveal key={i} delay={0.05}>
                <p className={`${i === 1 ? 'display text-5xl italic text-burgundy md:text-7xl' : 'display text-3xl md:text-5xl'} leading-tight`}>
                  {s}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={['Ideas', 'Perspectives', 'Passion for architecture']} className="display border-y border-ink/10 py-8 text-6xl italic md:text-8xl" />

      <section className="py-28 md:py-40">
        <div className="container-x grid grid-cols-12 items-center gap-6">
          <ParallaxImage src="/images/studio-sketch.webp" alt="Sketching plans at the studio desk" className="col-span-12 aspect-[4/5] grayscale md:col-span-5" reveal="left" />
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal><p className="eyebrow mb-6 text-clay">What she brings together</p></Reveal>
            <SplitText text={['Every project', 'begins with a unique', 'interpretation.']} className="display text-5xl md:text-7xl" />
            <div className="mt-14 divide-y divide-ink/15 border-y border-ink/15">
              {pillars.map((p, i) => (
                <Reveal key={p.k} delay={i * 0.1} className="grid grid-cols-12 gap-4 py-8">
                  <span className="eyebrow col-span-2 mt-2 text-clay">0{i + 1}</span>
                  <h3 className="display col-span-10 text-3xl md:col-span-4">{p.k}</h3>
                  <p className="col-span-10 col-start-3 leading-relaxed text-ink/65 md:col-span-6">{p.t}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-28 md:py-40">
        <div className="container-x">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SplitText text={['Selected work', 'by Shana']} className="display text-5xl md:text-7xl" />
            <Reveal><Link to="/projects" className="eyebrow link-line pb-1">All projects →</Link></Reveal>
          </div>
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.12} className={i % 2 ? 'md:mt-24' : ''}>
                <Link to={`/projects/${p.slug}`} data-cursor="View" className="group block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.thumb} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-110" />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <span className="font-serif text-2xl group-hover:italic">{p.title}</span>
                    <span className="eyebrow mt-2 text-clay">{p.category}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 md:py-40">
        <div className="container-x grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <ParallaxImage src="/images/shana-meet-the-founder.webp" alt="Meet the Founder — Shana" className="aspect-[4/5]" reveal="up" />
          </div>
          <div className="col-span-12 flex flex-col justify-center md:col-span-6 md:col-start-7">
            <Reveal><p className="eyebrow mb-6 text-clay">Reach Shana directly</p></Reveal>
            <SplitText text={["Let's connect."]} className="display text-6xl md:text-8xl" />
            <Reveal delay={0.2} className="mt-12 space-y-8">
              {[
                ['Direct email', studio.email, `mailto:${studio.email}`],
                ['Phone number', studio.phone, `tel:${studio.phoneHref}`],
                ['Location', studio.location, null],
              ].map(([k, v, href]) => (
                <div key={k} className="border-b border-ink/15 pb-6">
                  <p className="eyebrow mb-3 text-clay">{k}</p>
                  {href ? (
                    <a href={href} className="link-line font-serif text-2xl italic break-all md:text-3xl">{v}</a>
                  ) : (
                    <p className="font-serif text-2xl italic md:text-3xl">{v}</p>
                  )}
                </div>
              ))}
            </Reveal>
            <Magnetic className="mt-12">
              <a href={studio.whatsapp} target="_blank" rel="noreferrer" className="eyebrow inline-flex items-center gap-3 rounded-full bg-ink px-10 py-5 text-bone transition-colors duration-500 hover:bg-burgundy">
                Message on WhatsApp <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      <CTA image="/images/cake-co-table.webp" />
    </Page>
  )
}
