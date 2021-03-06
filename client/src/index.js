import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';

import {StoreProvider} from 'easy-peasy';
import store from './Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
          <Routes>
            <Route path='/' element={<App />} />
          </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);

