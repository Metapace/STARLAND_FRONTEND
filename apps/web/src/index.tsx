import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import Loading from './components/Loading/IndexLoading';
import App from './App';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>,
  );
}
