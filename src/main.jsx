import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginContextProvider from './context/LoginContext.jsx'
import MessageContextProvider from './context/MessageContext.jsx'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
)
