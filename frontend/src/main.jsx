import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

// Conditionally enable StrictMode only in development
const isDevelopment = import.meta.env.DEV

const root = ReactDOM.createRoot(document.getElementById('root'))
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
)

// StrictMode causes double renders in development, skip in production for better performance
if (isDevelopment) {
  root.render(<React.StrictMode>{app}</React.StrictMode>)
} else {
  root.render(app)
}