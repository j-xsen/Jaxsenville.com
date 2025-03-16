export { Layout }

import React from 'react'
import '../../css/Gallery.css'
import PageTitleButton from '../../components/PageTitleButton'

import { useData } from "vike-react/useData"

function Layout({ children }) {
  const data = useData()
  return (
    <>
      <PageTitleButton text={data.path} />
      <div>{children}</div>   
      </>
  )
}
