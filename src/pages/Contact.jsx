import { useState } from 'react'
import { motion } from 'framer-motion'
import Page from '../components/Page'
import { SplitText, Reveal, Magnetic, ParallaxImage, ease } from '../components/motion'
import { studio } from '../data/site'

const types = ['Residence', 'Interior', 'Commercial', 'Institutional', 'Other']

function Field({ label, as = 'input', ...props }) {
  const El = as
  return (
    <label className="group block">
      <span className="eyebrow text-clay">{label}</span>
      <El
        {...props}
        className="mt-3 w-full resize-none border-b border-ink/20 bg-transparent pb-4 font-serif text-2xl outline-none transition-colors placeholder:text-ink/25 focus:border-burgundy"
      />
    </label>
  )
}

export default function Contact() {
  const [type, setType] = useState('Residence')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Project inquiry — ${type}${f.get('subject') ? ': ' + f.get('subject') : ''}`
    const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nProject type: ${type}\n\n${f.get('message')}`
    window.location.href = `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <Page title="Contact">
      <section className="pt-40 pb-20 md:pt-56">
        <div className="container-x">
          <motion.p className="eyebrow mb-8 flex items-center gap-4 text-clay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <span className="h-px w-10 bg-current" /> Contact
          </motion.p>
          <SplitText as="h1" immediate delay={0.5} text={["Let's", 'connect.']} className="display text-[22vw] leading-[0.8] md:text-[14vw]" />
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="container-x grid grid-cols-12 gap-6 gap-y-20">
          <div className="col-span-12 md:col-span-4">
            <Reveal>
              <p className="max-w-sm text-lg leading-relaxed text-ink/70">
                For project inquiries, collaborations, or simply to say hello, reach out through any of the channels
                below.
              </p>
            </Reveal>
            <div className="mt-14 space-y-10">
              {[
                ['Direct email', studio.email, `mailto:${studio.email}`],
                ['Phone number', studio.phone, `tel:${studio.phoneHref}`],
                ['WhatsApp', 'Message the studio', studio.whatsapp],
                ['Location', studio.location, `https://maps.google.com/?q=${encodeURIComponent(studio.location)}`],
              ].map(([k, v, href], i) => (
                <Reveal key={k} delay={i * 0.08}>
                  <p className="eyebrow mb-3 text-clay">{k}</p>
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="link-line font-serif text-2xl italic break-all">
                    {v}
                  </a>
                </Reveal>
              ))}
            </div>
            <ParallaxImage src="/images/cake-co-table.webp" className="mt-16 hidden aspect-[4/5] md:block" reveal="up" />
          </div>

          <Reveal className="col-span-12 md:col-span-7 md:col-start-6">
            <form onSubmit={submit} className="space-y-12 bg-bone p-8 md:p-14">
              <div>
                <span className="eyebrow text-clay">I'm interested in</span>
                <div className="mt-5 flex flex-wrap gap-2">
                  {types.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setType(t)}
                      className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-500 ${type === t ? 'border-ink bg-ink text-bone' : 'border-ink/20 hover:border-ink'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-12 md:grid-cols-2">
                <Field label="Name" name="name" required placeholder="Your full name" autoComplete="name" />
                <Field label="Email address" name="email" type="email" required placeholder="email@example.com" autoComplete="email" />
              </div>
              <Field label="Project subject" name="subject" placeholder="What are you looking for?" />
              <Field label="Message" name="message" as="textarea" rows={4} required placeholder="Tell us about your project…" />
              <div className="flex flex-wrap items-center justify-between gap-6">
                <Magnetic>
                  <button type="submit" data-cursor="Send" className="eyebrow inline-flex items-center gap-4 bg-ink px-10 py-5 text-bone transition-colors duration-500 hover:bg-burgundy">
                    Submit inquiry <span aria-hidden>→</span>
                  </button>
                </Magnetic>
                {sent && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ease }} className="text-sm text-clay">
                    Your email app should open with the message ready to send.
                  </motion.p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="relative h-[60vh] overflow-hidden">
        <ParallaxImage src="/images/cake-co-overhead.webp" className="absolute inset-0 h-full" reveal="center" />
        <div className="absolute inset-0 grid place-items-center bg-ink-deep/40 text-center text-bone">
          <p className="display px-6 text-5xl italic md:text-7xl">{studio.signoff}</p>
        </div>
      </section>
    </Page>
  )
}
