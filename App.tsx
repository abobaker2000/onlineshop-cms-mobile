import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import store from './src/redux/store';
import { Navigation } from './src/navigation';
import { queryClient } from './src/utils/react-query/query-client';
import "react-native-url-polyfill/auto"

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <Navigation />
      </QueryClientProvider>
    </Provider>
  );
}
