import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Page, { PageHero } from '../components/Page'
import CTA from '../components/CTA'
import { SplitText, Reveal, ease } from '../components/motion'
import { projects, categories } from '../data/projects'

const layouts = [
  'md:col-span-12 aspect-[16/9]',
  'md:col-span-5 aspect-[4/5]',
  'md:col-span-6 md:col-start-7 aspect-[4/3] md:mt-32',
  'md:col-span-7 aspect-[4/3]',
  'md:col-span-4 md:col-start-9 aspect-[3/4] md:mt-24',
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState('grid')
  const list = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <Page title="Projects">
      <PageHero
        eyebrow={`Projects — ${projects.length} works`}
        title={<SplitText as="h1" immediate delay={0.5} text={['Selected', 'works.']} className="display text-[20vw] leading-[0.8] md:text-[13vw]" />}
        intro="Homes, interiors, campuses and city infrastructure. Each one a different conversation between people and the places they belong."
      />

      <div className="container-x sticky top-0 z-20 -mt-4 mb-12 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 bg-paper/85 py-4 backdrop-blur-md">
        <LayoutGroup>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`eyebrow relative rounded-full px-5 py-2.5 transition-colors ${filter === c ? 'text-bone' : 'hover:text-burgundy'}`}
              >
                {filter === c && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.6, ease }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
        <div className="eyebrow flex gap-5">
          {['grid', 'list'].map((v) => (
            <button key={v} onClick={() => setView(v)} className={view === v ? 'underline underline-offset-8' : 'opacity-50'}>{v}</button>
          ))}
        </div>
      </div>

      <section className="pb-32">
        <div className="container-x">
          <AnimatePresence mode="wait">
            {view === 'grid' ? (
              <motion.div
                key={'g' + filter}
                className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {list.map((p, i) => (
                  <Reveal key={p.slug} className={layouts[i % layouts.length].replace(/aspect-\S+/, '')}>
                    <Link to={`/projects/${p.slug}`} data-cursor="View" className="group block">
                      <div className={`relative overflow-hidden ${layouts[i % layouts.length].match(/aspect-\S+/)[0]}`}>
                        <motion.img
                          src={p.cover}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] group-hover:scale-105"
                          initial={{ clipPath: 'inset(0 0 100% 0)' }}
                          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease }}
                        />
                        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
                        <span className="eyebrow absolute top-5 left-5 rounded-full bg-paper/90 px-4 py-2 text-ink">{p.category}</span>
                      </div>
                      <div className="mt-6 grid grid-cols-12 items-baseline gap-4">
                        <span className="eyebrow col-span-2 text-clay md:col-span-1">0{projects.indexOf(p) + 1}</span>
                        <h2 className="display col-span-10 text-4xl transition-all duration-500 group-hover:italic group-hover:text-burgundy md:col-span-7 md:text-5xl">{p.title}</h2>
                        <p className="col-span-10 col-start-3 text-sm text-ink/60 md:col-span-4 md:col-start-auto md:text-right">{p.location} · {p.year}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </motion.div>
            ) : (
              <motion.ul key={'l' + filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/projects/${p.slug}`} className="group grid grid-cols-12 items-center gap-4 border-t border-ink/15 py-6">
                      <div className="col-span-3 overflow-hidden md:col-span-2">
                        <img src={p.thumb} alt="" className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                      </div>
                      <span className="display col-span-9 text-3xl group-hover:italic md:col-span-4 md:text-5xl">{p.title}</span>
                      <span className="col-span-4 text-sm text-ink/60 md:col-span-3">{p.type}</span>
                      <span className="col-span-4 text-sm text-ink/60 md:col-span-2">{p.location}</span>
                      <span className="eyebrow col-span-4 text-right md:col-span-1">{p.year}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTA image="/images/maqbool-residence.webp" />
    </Page>
  )
}
