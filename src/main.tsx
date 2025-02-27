import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './app';
import '@/styles/globals.css';
import StripeWrapper from './components/StripeWrapper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <StripeWrapper>
        <App />
      </StripeWrapper>
    </Provider>
  </StrictMode>,
);
