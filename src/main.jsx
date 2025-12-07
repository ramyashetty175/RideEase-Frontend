import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App.jsx'
import AuthProvider from './components/AuthProvider.jsx';
import createStore from './utils/create-store';

const store = createStore();

console.log('store', store.getState());
store.subscribe(() => {
  console.log('store updated', store.getState());
})

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
)