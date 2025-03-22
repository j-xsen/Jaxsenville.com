export { Layout }

import React, { StrictMode } from 'react'
import { useMetadata } from 'vike-metadata-react'
import './Layout.css'
import HeaderImage from '../components/HeaderImage'
import { clientOnly } from 'vike-react/clientOnly'

const PostHogPageView = clientOnly(() => import('../components/PostHogPageView'))


useMetadata.setGlobalDefaults({
  title: "Jaxsenville",
  description: "Central hub for all things Jaxsenville - a town built by Jaxsen Honeycutt to house those who needs a place to stay. Seven experimental electronic songs about seeking happiness through love.",
  authors: {name: "Jaxsen Honeycutt", url: "https://www.jxsen.com/"},
  publisher: "Jaxsen Honeycutt",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  }
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <StrictMode>
      <HeaderImage />
      <div>{children}</div>
      <PostHogPageView />
    </StrictMode>
    </>
  )
}
