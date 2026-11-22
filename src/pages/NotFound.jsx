import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { SplitText, NodeLines } from '../components/motion'

export default function NotFound() {
  return (
    <Page title="Not found">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <NodeLines className="mb-10 w-full max-w-xl text-burgundy" />
        <SplitText as="h1" immediate text="A missing connection." className="display text-6xl md:text-8xl" />
        <p className="mt-8 max-w-md text-ink/70">The page you're looking for doesn't exist — but every path leads somewhere.</p>
        <Link to="/" className="eyebrow link-line mt-10 pb-1">Back to home →</Link>
      </section>
    </Page>
  )
}
