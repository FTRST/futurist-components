/**
 * Example: Charts Dashboard.
 *
 * Shows how to display live-updating charts inside BaseWindows.
 * Data re-generates on a 2-second interval via setInterval.
 *
 * Import from: futurist-components/src/examples/ChartsExample.jsx
 * or copy/paste the pattern.
 */
import { useState, useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { useDeviceDetail } from '../states/deviceDetail';
import { windowManipulatorAtom } from '../states/deviceDetailState';
import BaseWindow from '../components/BaseWindow/BaseWindow';
import Button from '../components/Button/Button';
import WindowContent from '../components/WindowContent/WindowContent';
import WindowTitle from '../components/WindowTitle/WindowTitle';
import AreaChart from '../components/AreaChart/AreaChart';
import BarChart from '../components/BarChart/BarChart';
import LineChart from '../components/LineChart/LineChart';
import HeatmapChart from '../components/HeatmapChart/HeatmapChart';
import Sparkline from '../components/Sparkline/Sparkline';

const rng = () => Math.floor(Math.random() * 100);
const genChartData = (n) => Array.from({ length: n }, (_, i) => ({ label: `Item ${i + 1}`, value: rng() }));
const genData = (n) => Array.from({ length: n }, (_, i) => rng());

let idCounter = 0;
const genId = () => `chart_${Date.now()}_${++idCounter}`;

export default function ChartsExample({ styleSettings }) {
  const device = useDeviceDetail();
  const manipulateWindows = useSetAtom(windowManipulatorAtom);

  const [chartData, setChartData] = useState({
    area: genChartData(8),
    bar: genChartData(5),
    line: genChartData(10),
    heatmap: [
      { label: 'Mon', values: genData(5) },
      { label: 'Tue', values: genData(5) },
      { label: 'Wed', values: genData(5) },
      { label: 'Thu', values: genData(5) },
    ],
    spark: genData(25),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData({
        area: genChartData(8),
        bar: genChartData(5),
        line: genChartData(10),
        heatmap: [
          { label: 'Mon', values: genData(5) },
          { label: 'Tue', values: genData(5) },
          { label: 'Wed', values: genData(5) },
          { label: 'Thu', values: genData(5) },
        ],
        spark: genData(25),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = () => {
    manipulateWindows({
      type: 'add',
      window: { id: genId(), title: 'Charts Window', width: '520px', height: '480px', zIndex: 99999 },
    });
  };

  return (
    <div style={{ padding: '1em', fontFamily: 'system-ui, sans-serif' }}>
      <Button label="Open Charts" action={openWindow} styleSettings={styleSettings} />
      {device?.windows?.map((w) => (
        <BaseWindow key={w.id} id={w.id} device={device} manipulateWindows={manipulateWindows} styleSettings={styleSettings}>
          <WindowContent styleSettings={styleSettings} style={{ border: 'none', padding: '0.75em', background: 'none' }}>
            <WindowTitle value={w.title} styleSettings={styleSettings} />
            <div style={{ fontSize: '0.75em', opacity: 0.5, marginBottom: '0.5em' }}>Data updates every 2s</div>
            <Sparkline data={chartData.spark} styleSettings={styleSettings} />
            <BarChart data={chartData.bar} title="Bar" styleSettings={styleSettings} />
            <LineChart data={chartData.line} title="Line" styleSettings={styleSettings} />
            <AreaChart data={chartData.area} title="Area" styleSettings={styleSettings} />
            <HeatmapChart data={chartData.heatmap} title="Heatmap" styleSettings={styleSettings} />
          </WindowContent>
        </BaseWindow>
      ))}
    </div>
  );
}
