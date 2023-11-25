import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import AppRouter from './routes/AppRouter';
import store from './redux/store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <AppRouter />
    </Provider>
  </React.StrictMode>
);

