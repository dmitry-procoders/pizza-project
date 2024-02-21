import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Layout from '@/layouts/layout';
import { Provider } from 'react-redux';
import store from '../store';

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRouterCacheProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppRouterCacheProvider> 
      </QueryClientProvider>
    </Provider>
  );
}

export default App;