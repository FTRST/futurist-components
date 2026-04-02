import { useAtomValue } from 'jotai';
import { deviceDetailAtom } from './states/deviceDetailState';
import { themeAtom } from './states/themeState';

import BaseWindow from './components/BaseWindow/BaseWindow';
import Customizer from './components/Customizer/Customizer';

function App() {
  const device = useAtomValue(deviceDetailAtom);
  const theme = useAtomValue(themeAtom);

  return (
    <div style={{ width: device.width, height: device.height }}>
      {device?.windows?.map((window, index) => (
        <BaseWindow 
          key={index} 
          id={window.id} 
          device={device} 
          manipulateWindows={() => {}}
          styleSettings={theme}
        >
          <span>just some text</span>
        </BaseWindow>
      ))}
      
      <Customizer />
    </div>
  );
}

export default App;
