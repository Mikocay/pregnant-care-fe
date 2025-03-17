import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from './redux/store/store';
import App from './app';
import '@/styles/globals.css';
import StripeWrapper from './components/StripeWrapper';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: 1, // default: 3
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 0, // default: 0
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StripeWrapper>
          <App />
        </StripeWrapper>
        {/* Add React Query Devtools in development */}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);