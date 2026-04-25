import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider, theme } from 'antd'

const isDarkTheme = !!window.matchMedia("(prefers-color-scheme:dark)").matches;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.compactAlgorithm
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
