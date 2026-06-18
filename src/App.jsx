import './App.css';
import { Provider } from 'jotai';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import DevPlayground from './components/DevPlayground/DevPlayground';

function App() {
  return (
    <Provider>
      <ThemeProvider>
        <DevPlayground />
      </ThemeProvider>
    </Provider>
  );
}

export default App;