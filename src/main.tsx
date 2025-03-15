import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './tsx/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ArtPage from './tsx/ArtPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
