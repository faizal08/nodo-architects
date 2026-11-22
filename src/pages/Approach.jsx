import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Page, { PageHero } from '../components/Page'
import CTA from '../components/CTA'
import { SplitText, Reveal, ParallaxImage, NodeLines } from '../components/motion'
import { approach } from '../data/site'

const images = [
  '/images/studio-talk.webp',
  '/images/cake-co-moodboard.webp',
  '/images/mobility-hub-plan.webp',
  '/images/cake-co-table.webp',
  '/images/maqbool-residence.webp',
]
const tones = ['bg-bone', 'bg-[#e9dfd3]', 'bg-sand', 'bg-ink text-bone', 'bg-burgundy text-bone']

/* Stacked cards that pin and scale back as the next one arrives */
function Card({ a, i, total, progress }) {
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04])
  return (
    <div className="sticky top-0 flex h-screen items-center">
      <motion.article
        style={{ scale, top: `${i * 28}px` }}
        className={`relative mx-auto grid w-full origin-top grid-cols-12 gap-6 overflow-hidden rounded-sm p-8 md:h-[72vh] md:p-14 ${tones[i]}`}
      >
        <div className="col-span-12 flex flex-col justify-between md:col-span-6">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow opacity-70">Step {a.no}</span>
            <span className="eyebrow opacity-70">{a.no} / 0{total}</span>
          </div>
          <div>
            <h3 className="display text-7xl md:text-[9rem]">{a.title}</h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed opacity-80">{a.text}</p>
          </div>
        </div>
        <div className="col-span-12 hidden md:col-span-5 md:col-start-8 md:block">
          <img src={images[i]} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </motion.article>
    </div>
  )
}

export default function Approach() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <Page title="Approach">
      <PageHero
        eyebrow="Our Approach"
        title={<SplitText as="h1" immediate delay={0.5} text={['How ideas', 'take shape.']} className="display text-[17vw] leading-[0.85] md:text-[11vw]" />}
        intro="At NODO, every project begins with a unique interpretation — shaped by creative thinking, attention to detail and an understanding of how people experience spaces."
      >
        <NodeLines className="mt-16 w-full max-w-4xl text-burgundy" />
      </PageHero>

      <section ref={ref} className="container-x relative pb-[10vh]">
        {approach.map((a, i) => (
          <Card key={a.no} a={a} i={i} total={approach.length} progress={scrollYProgress} />
        ))}
      </section>

      <section className="py-28 md:py-40">
        <div className="container-x grid grid-cols-12 items-center gap-6">
          <div className="col-span-12 md:col-span-6">
            <SplitText text={['Aesthetics.', 'Functionality.', 'Thoughtful detailing.']} className="display text-5xl md:text-7xl" />
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-md text-lg leading-relaxed text-ink/70">
                Architecture brings these together. We hold all three in balance from the first sketch to the last
                detail on site.
              </p>
            </Reveal>
          </div>
          <ParallaxImage src="/images/studio-sketch.webp" alt="" className="col-span-12 aspect-[4/5] grayscale md:col-span-5 md:col-start-8" reveal="center" />
        </div>
      </section>

      <CTA image="/images/cake-co-counter.webp" />
    </Page>
  )
}
