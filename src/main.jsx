import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={"971406981565-tipu8sqtf8k3u13fndrnt68jc0fsbj9n.apps.googleusercontent.com"} scopes={['email']}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <App />
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
