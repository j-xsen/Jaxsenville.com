export { Layout }

import React, { StrictMode } from 'react'
import { useMetadata } from 'vike-metadata-react'
import './Layout.css'
import HeaderImage from '../components/HeaderImage'
import { clientOnly } from 'vike-react/clientOnly'

const ClientPostHog = clientOnly(async () => (await import('posthog-js/react')).PostHogProvider)


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

const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST as string
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <StrictMode>
      <HeaderImage />
      <div>{children}</div>
      <ClientPostHog apiKey={import.meta.env.VITE_POSTHOG_KEY as string} options={options}/>
    </StrictMode>
    </>
  )
}
