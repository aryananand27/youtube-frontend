import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { CounterProvider } from './components/context/count'
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
<CounterProvider>
<App/>
</CounterProvider>

)