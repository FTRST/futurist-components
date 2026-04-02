import ReactDOM from 'react-dom/client'
import { Provider } from 'jotai'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider'

import './index.css'
import './styles/variables.css';
import './styles/fonts.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>
);
