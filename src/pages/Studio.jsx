import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Page from '../components/Page'
import CTA from '../components/CTA'
import Logo from '../components/Logo'
import { SplitText, Reveal, ParallaxImage, NodeLines, Marquee, Rule, ease } from '../components/motion'
import { studio } from '../data/site'

const values = [
  { k: 'Connection', t: 'Between people, ideas and the places they belong. It is the thread that runs through every NODO project.' },
  { k: 'Thoughtful design', t: 'Every decision has a reason. Form, light and material are chosen to serve the people who will live with them.' },
  { k: 'Meaningful detail', t: 'The joints, textures and small moments are where a space becomes personal and memorable.' },
  { k: 'Understanding of space', t: 'We study how people move, pause and gather — and design places that feel natural to inhabit.' },
]

function LogoReveal() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ['0.4em', '0em'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.7, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-deep py-32 text-bone md:py-48">
      <NodeLines className="absolute inset-x-0 top-0 mx-auto w-full max-w-6xl text-sand/40" />
      <div className="container-x relative text-center">
        <motion.div style={{ scale }}>
          <Logo className="mx-auto w-full max-w-5xl" />
        </motion.div>
        <motion.p style={{ letterSpacing }} className="eyebrow mt-14 text-sand">The Art of Connection</motion.p>
        <motion.div style={{ rotate }} className="mx-auto mt-16 h-24 w-px bg-bone/30" />
      </div>
    </section>
  )
}

export default function Studio() {
  return (
    <Page title="Studio">
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-56">
        <div className="container-x grid grid-cols-12 gap-6">
          <motion.p
            className="eyebrow col-span-12 mb-6 flex items-center gap-4 text-clay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="h-px w-10 bg-current" /> The Studio — Est. {studio.established}
          </motion.p>
          <div className="col-span-12 md:col-span-10">
            <SplitText
              as="h1"
              immediate
              delay={0.5}
              text={['Architecture is more', 'than creating buildings.']}
              className="display text-[13vw] md:text-[8vw]"
            />
          </div>
        </div>

        {/* Dictionary-style definition */}
        <div className="container-x mt-20 grid grid-cols-12 gap-6">
          <Reveal className="col-span-12 border-t border-ink/20 pt-10 md:col-span-6 md:col-start-6">
            <div className="flex items-baseline gap-6">
              <span className="display text-7xl md:text-9xl">nodo</span>
              <span className="font-serif text-xl italic text-clay">noun</span>
            </div>
            <p className="mt-6 font-serif text-3xl leading-snug">
              <span className="text-clay">1.</span> connection; the point where things meet and are joined together.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              NODO, meaning connection, reflects our belief that architecture is more than creating buildings. It is
              about bringing people, spaces and experiences together.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-x grid grid-cols-12 items-end gap-6">
          <ParallaxImage src="/images/studio-talk.webp" alt="Architecture is the art of connection" className="col-span-12 aspect-[3/4] grayscale md:col-span-5" reveal="left" />
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="display text-4xl md:text-6xl">
                Every space begins with a connection — between <em className="text-burgundy">people</em>,{' '}
                <em className="text-burgundy">ideas</em> and the <em className="text-burgundy">places</em> they belong.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-lg text-lg leading-relaxed text-ink/70">
                Through thoughtful design, meaningful details and a deep understanding of space, we aim to create
                places that connect with people and become part of their stories.
              </p>
              <p className="eyebrow mt-10 text-clay">{studio.signoff}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <LogoReveal />

      <section className="py-28 md:py-40">
        <div className="container-x">
          <div className="mb-20 grid grid-cols-12 gap-6">
            <p className="eyebrow col-span-12 text-clay md:col-span-3">What we believe</p>
            <SplitText text={['Four ideas that', 'shape every project.']} className="display col-span-12 text-5xl md:col-span-9 md:text-7xl" />
          </div>
          <div className="grid gap-x-10 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={(i % 2) * 0.12} className="group border-t border-ink/15 py-12">
                <div className="flex items-start gap-8">
                  <span className="eyebrow mt-3 text-clay">0{i + 1}</span>
                  <div>
                    <h3 className="display text-5xl transition-all duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-burgundy">{v.k}</h3>
                    <p className="mt-4 max-w-md leading-relaxed text-ink/65">{v.t}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-28 md:py-40">
        <div className="container-x grid grid-cols-12 items-center gap-6">
          <div className="col-span-12 md:col-span-6">
            <Reveal><p className="eyebrow mb-6 text-clay">Introducing NODO Architects</p></Reveal>
            <SplitText text={['A space for', 'architectural', 'exploration.']} className="display text-6xl md:text-8xl" />
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-md text-lg leading-relaxed text-ink/70">
                A space for architectural exploration, thoughtful design and new possibilities — from homes and
                interiors to campuses and city infrastructure.
              </p>
              <Rule className="mt-10 w-full text-ink/20" />
              <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3 font-serif text-2xl italic">
                <span>Architecture.</span><span>Concepts.</span><span>Explorations.</span>
              </div>
            </Reveal>
          </div>
          <div className="relative col-span-12 h-[70vh] md:col-span-5 md:col-start-8">
            <ParallaxImage src="/images/cake-co-table.webp" className="absolute top-0 right-0 h-3/4 w-3/4" reveal="right" />
            <ParallaxImage src="/images/maqbool-residence.webp" className="absolute bottom-0 left-0 h-2/5 w-3/5 shadow-2xl" reveal="up" strength={20} />
          </div>
        </div>
      </section>

      <Marquee items={['Connection', 'People', 'Ideas', 'Places', 'Stories']} className="display py-10 text-7xl italic text-sand md:text-9xl" slow />

      <section className="py-24">
        <div className="container-x flex flex-col items-center gap-8 text-center">
          <p className="eyebrow text-clay">Led by</p>
          <Link to="/founder" className="display text-5xl transition-all hover:italic hover:text-burgundy md:text-7xl" data-cursor="Meet">
            {studio.founder}
          </Link>
          <p className="eyebrow">Founder & Principal Architect</p>
        </div>
      </section>

      <CTA image="/images/cake-co-overhead.webp" />
    </Page>
  )
}
