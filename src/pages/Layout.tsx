export { Layout }

import React from 'react'
import { useMetadata } from 'vike-metadata-react'
import './Layout.css'
import HeaderImage from '../components/HeaderImage'


useMetadata.setGlobalDefaults({
  title: "Jaxsenville",
  description: "Art portfolio website of Jaxsen Honeycutt's work.",
  authors: {name: "Jaxsen Honeycutt", url: "https://www.jxsen.com/"},
  publisher: "Jaxsen Honeycutt",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  }
})

function Layout({ children }: { children: React.ReactNode }) {
  useMetadata({})
  return (
    <>
      <HeaderImage />
      <div>{children}</div>   
      </>
  )
}
