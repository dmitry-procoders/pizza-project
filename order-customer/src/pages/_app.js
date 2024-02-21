import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import Layout from '../layouts/layout';
import store from '../store';

const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;