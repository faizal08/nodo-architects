import { Link } from 'react-router-dom'
import { ParallaxImage, SplitText, Magnetic, Reveal } from './motion'

export default function CTA({ image = '/images/cake-co-entrance.webp' }) {
  return (
    <section className="relative h-[90vh] min-h-[560px] overflow-hidden bg-ink-deep text-bone">
      <ParallaxImage src={image} className="absolute inset-0 h-full" strength={14} reveal="center" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/40 to-ink-deep/20" />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        <Reveal>
          <p className="eyebrow mb-8 opacity-80">Have a space in mind?</p>
        </Reveal>
        <SplitText
          as="h2"
          text={["Let's give form", 'to your ideas.']}
          className="display text-6xl md:text-[9rem]"
        />
        <Magnetic className="mt-12">
          <Link
            to="/contact"
            data-cursor="Hello"
            className="eyebrow inline-flex items-center gap-4 rounded-full border border-bone/40 px-10 py-5 backdrop-blur-sm transition-colors duration-500 hover:bg-bone hover:text-ink"
          >
            Start a conversation <span aria-hidden>→</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}
