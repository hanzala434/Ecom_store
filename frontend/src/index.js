import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google"


import { Provider } from 'react-redux'
import {store} from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='395575522731-d3lvsjcr8qk82m26k9rkbaqrc6vij05j.apps.googleusercontent.com'>
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
