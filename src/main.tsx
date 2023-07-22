import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './assets/css/style.css'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import AuthProvider from './context/AuthContext'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
