import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BloodApp } from './BloodApp'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BloodApp />
    </BrowserRouter>
  </StrictMode>,
)
