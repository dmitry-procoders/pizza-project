import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Provider } from 'react-redux';
import store from '../store';

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRouterCacheProvider>
          <div>
            <Component {...pageProps} />
          </div>
        </AppRouterCacheProvider> 
      </QueryClientProvider>
    </Provider>
  );
}

export default App;