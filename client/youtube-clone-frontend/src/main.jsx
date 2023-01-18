import React from 'react'
import './index.css'
import App from './App';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import store from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
          <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
