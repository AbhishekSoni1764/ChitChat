import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginContextProvider from './context/LoginContext.jsx'
import MessageContextProvider from './context/MessageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
)
