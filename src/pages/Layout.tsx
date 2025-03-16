export { Layout }

import React from 'react'
import './Layout.css'
import HeaderImage from '../components/HeaderImage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderImage />
      <div>{children}</div>   
      </>
  )
}
