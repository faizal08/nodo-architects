import { Link } from 'react-router-dom'
import Page, { PageHero } from '../components/Page'
import CTA from '../components/CTA'
import { SplitText, Reveal, ParallaxImage, Marquee } from '../components/motion'
import { services } from '../data/site'

export default function Services() {
  return (
    <Page title="Services">
      <PageHero
        eyebrow="Services"
        title={<SplitText as="h1" immediate delay={0.5} text={['What we', 'design.']} className="display text-[20vw] leading-[0.8] md:text-[13vw]" />}
        intro="From a single room to an entire campus, NODO brings the same care for connection, detail and the people who will use the space."
      />

      <section className="pb-28">
        <div className="container-x space-y-28 md:space-y-44">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <div key={s.no} className="grid grid-cols-12 items-center gap-6">
                <div className={`col-span-12 md:col-span-6 ${flip ? 'md:order-2 md:col-start-7' : ''}`}>
                  <ParallaxImage src={s.image} alt={s.title} className="aspect-[4/3]" reveal={flip ? 'right' : 'left'} />
                </div>
                <div className={`col-span-12 md:col-span-5 ${flip ? 'md:order-1' : 'md:col-start-8'}`}>
                  <Reveal>
                    <p className="display text-8xl text-sand">{s.no}</p>
                  </Reveal>
                  <SplitText text={s.title} className="display mt-4 text-5xl md:text-7xl" />
                  <Reveal delay={0.15}>
                    <p className="mt-6 text-lg leading-relaxed text-ink/70">{s.text}</p>
                    <ul className="mt-10 border-t border-ink/15">
                      {s.items.map((it) => (
                        <li key={it} className="group flex items-center justify-between border-b border-ink/15 py-4">
                          <span className="transition-transform duration-500 group-hover:translate-x-2">{it}</span>
                          <span className="text-clay opacity-0 transition-opacity group-hover:opacity-100">→</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Marquee items={['Residential', 'Hospitality', 'Interiors', 'Campus', 'Transit', 'Concepts']} className="display bg-ink py-10 text-6xl text-bone md:text-8xl" />

      <section className="py-28 text-center md:py-40">
        <div className="container-x">
          <SplitText text={['Not sure where', 'your project fits?']} className="display text-5xl md:text-7xl" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-lg leading-relaxed text-ink/70">Every project begins with a conversation. Tell us about your site, your ideas and how you hope to use the space.</p>
            <Link to="/contact" className="eyebrow link-line mt-10 inline-block pb-1">Get in touch →</Link>
          </Reveal>
        </div>
      </section>

      <CTA image="/images/maqbool-residence.webp" />
    </Page>
  )
}
