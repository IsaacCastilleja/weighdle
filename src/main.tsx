import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from "axios";


if(window.location.href === 'weighdle.com' && window.location.protocol === 'http:') {
    window.location.href = "https://weighdle.com";
}

axios.defaults.baseURL = 'http://127.0.0.1:8000'
// https://api.weighdle.com/

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
