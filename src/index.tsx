import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import RootStore from './stores/rootStore'

import App from './app'
import reportWebVitals from './reportWebVitals'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <RootStore>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RootStore>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
