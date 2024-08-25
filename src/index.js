import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"
import appStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
 
const persistor = persistStore(appStore);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  
);


