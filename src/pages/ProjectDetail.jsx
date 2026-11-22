import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import NotFound from './NotFound'
import { SplitText, Reveal, ParallaxImage, Rule, Marquee, ease } from '../components/motion'
import { getProject, nextProject, projects } from '../data/projects'

function Hero({ p }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const inset = useTransform(scrollYProgress, [0, 1], ['inset(0% 0% 0% 0%)', 'inset(6% 4% 0% 4%)'])
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink-deep text-bone">
      <motion.div style={{ clipPath: inset }} className="absolute inset-0">
        <motion.img
          src={p.cover}
          alt={p.title}
          style={{ scale }}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/20 to-ink-deep/40" />
      </motion.div>
      <div className="container-x relative flex h-full flex-col justify-end pb-14">
        <motion.p className="eyebrow mb-6 flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.9 }}>
          <span className="h-px w-10 bg-current" /> {p.type} — {p.location}
        </motion.p>
        <SplitText as="h1" immediate delay={0.6} text={p.title} className="display text-[15vw] leading-[0.85] md:text-[10vw]" />
      </div>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  if (!p) return <NotFound />
  const next = nextProject(slug)
  const index = projects.indexOf(p) + 1

  return (
    <Page title={p.title}>
      <Hero p={p} />

      {/* Specs bar */}
      <section className="border-b border-ink/10 bg-bone">
        <div className="container-x grid grid-cols-2 md:grid-cols-4">
          {p.specs.map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08} className={`py-8 md:py-10 ${i ? 'md:border-l md:pl-8' : ''} ${i % 2 ? 'border-l pl-5' : ''} border-ink/10`}>
              <p className="eyebrow text-clay">{k}</p>
              <p className="mt-3 font-serif text-xl md:text-2xl">{v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Narrative */}
      <section className="py-28 md:py-40">
        <div className="container-x grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Reveal className="md:sticky md:top-32">
              <p className="eyebrow text-clay">Narrative</p>
              <p className="display mt-6 text-8xl text-sand">{String(index).padStart(2, '0')}</p>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <SplitText text={p.lede} className="display text-4xl leading-tight md:text-6xl" stagger={0.03} />
            <Rule className="my-14 text-ink/20" />
            <div className="grid gap-10 md:grid-cols-2">
              {p.narrative.map((t, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <p className={`text-lg leading-relaxed text-ink/75 ${i === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-burgundy' : ''}`}>
                    {t}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-28 md:pb-40">
        <div className="container-x space-y-16 md:space-y-28">
          {p.gallery.map((g, i) => {
            const wide = p.gallery.length === 1 || i === 0
            const align = i % 2 ? 'md:ml-auto' : ''
            return (
              <figure key={g.src} className={wide ? '' : `md:w-[62%] ${align}`}>
                <ParallaxImage
                  src={g.src}
                  alt={g.caption}
                  className={wide ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[4/5]'}
                  reveal={i % 2 ? 'right' : 'left'}
                  strength={8}
                />
                <figcaption className={`eyebrow mt-5 flex gap-4 text-clay ${i % 2 ? 'md:justify-end' : ''}`}>
                  <span>Fig. {String(i + 1).padStart(2, '0')}</span>
                  <span className="normal-case tracking-normal text-ink/60">{g.caption}</span>
                </figcaption>
              </figure>
            )
          })}
        </div>
      </section>

      {/* Mood & palette (Cake & Co.) */}
      {p.palette && (
        <section className="bg-bone py-28 md:py-40">
          <div className="container-x grid grid-cols-12 items-center gap-6">
            <div className="col-span-12 md:col-span-5">
              <Reveal><p className="eyebrow mb-6 text-clay">Mood</p></Reveal>
              <SplitText text={['Sophisticated,', 'warm and sweet.']} className="display text-5xl md:text-7xl" />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md leading-relaxed text-ink/70">Deep burgundy and warm neutrals — velvet, draped fabric, rustic stone and soft candlelight.</p>
              </Reveal>
              <div className="mt-12 flex gap-3">
                {p.palette.map((c, i) => (
                  <motion.div
                    key={c}
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                  >
                    <span className="h-16 w-16 rounded-full shadow-inner ring-1 ring-ink/10 md:h-20 md:w-20" style={{ background: c }} />
                    <span className="text-[0.65rem] tracking-widest text-clay uppercase">{c}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <ParallaxImage src={p.board} alt={`${p.title} mood board`} className="aspect-[3/4]" reveal="center" strength={6} />
            </div>
          </div>
        </section>
      )}

      <Marquee items={[p.title, p.type, p.location]} className="display border-y border-ink/10 py-8 text-5xl italic text-sand md:text-7xl" />

      {/* Next project */}
      <Link to={`/projects/${next.slug}`} data-cursor="Next" className="group relative block h-[80vh] overflow-hidden bg-ink-deep text-bone">
        <img src={next.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105 group-hover:opacity-70" />
        <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
          <p className="eyebrow mb-6 opacity-80">Next project</p>
          <h2 className="display text-6xl transition-all duration-700 group-hover:italic md:text-[9rem]">{next.title}</h2>
          <p className="eyebrow mt-6 opacity-70">{next.type} — {next.location}</p>
        </div>
      </Link>
    </Page>
  )
}
