import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import DevOptionsProvider from './context/DevOptionsContext'
import './index.css'

// eslint-disable-next-line no-undef
ReactDOM.render(
  <DevOptionsProvider>
    <App />
  </DevOptionsProvider>,
  document.getElementById('root')
)

if (import.meta.hot) {
  import.meta.hot.accept()
}
