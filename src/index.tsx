import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/global/base.scss';
import './styles/global/md.scss';

// スクロールのアニメーション用のポリフィル.
if (!('scrollBehavior' in document.documentElement.style)) {
  import('scroll-behavior-polyfill');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
