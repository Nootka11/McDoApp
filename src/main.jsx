import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './components/store.jsx';
import App from './App.jsx';
import "leaflet/dist/leaflet.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>    
  </StrictMode>,
)
