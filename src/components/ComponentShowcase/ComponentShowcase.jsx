import React, { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../../states/themeState';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Checkbox from '../Checkbox/Checkbox';
import Toggle from '../Toggle/Toggle';
import Textarea from '../Textarea/Textarea';
import Badge from '../Badge/Badge';
import Alert from '../Alert/Alert';
import Spinner from '../Spinner/Spinner';
import Divider from '../Divider/Divider';
import TabContainer from '../TabContainer/TabContainer';
import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';
import Radio from '../Radio/Radio';
import Slider from '../Slider/Slider';
import Sparkline from '../Sparkline/Sparkline';
import AreaChart from '../AreaChart/AreaChart';
import BarChart from '../BarChart/BarChart';
import LineChart from '../LineChart/LineChart';
import HeatmapChart from '../HeatmapChart/HeatmapChart';
import WindowContent from '../WindowContent/WindowContent';
import WindowTitle from '../WindowTitle/WindowTitle';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const rng = () => Math.floor(Math.random() * 100);
const point = (label) => ({ label, value: rng() });

const genData = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
const genChartData = (n) => genData(n, (i) => ({ label: `Item ${i + 1}`, value: rng() }));

// ─── Section Wrapper ──────────────────────────────────────────────────────────
const Section = ({ title, children }) => {
  const theme = useAtomValue(themeAtom);
  return (
    <div style={{ marginBottom: '2em' }}>
      <WindowTitle value={title} styleSettings={theme} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em', alignItems: 'flex-start' }}>
        {children}
      </div>
    </div>
  );
};

// ─── ComponentShowcase ────────────────────────────────────────────────────────
export default function ComponentShowcase({ onBack }) {
  const theme = useAtomValue(themeAtom);
  const [demoInput, setDemoInput] = useState('');
  const [demoCheck, setDemoCheck] = useState(true);
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoSlider, setDemoSlider] = useState(50);
  const [demoRadio, setDemoRadio] = useState('a');
  const [demoSelect, setDemoSelect] = useState('');
  const [demoText, setDemoText] = useState('');
  const [progress, setProgress] = useState(0);

  // ── live chart data ─────────────────────────────────────────────────────────
  const [chartData, setChartData] = useState(() => ({
    area: genChartData(8),
    bar: genChartData(6),
    line: genChartData(12),
    heatmap: [
      { label: 'Mon', values: genData(5, rng) },
      { label: 'Tue', values: genData(5, rng) },
      { label: 'Wed', values: genData(5, rng) },
      { label: 'Thu', values: genData(5, rng) },
    ],
    spark: genData(30, rng),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData({
        area: genChartData(8),
        bar: genChartData(6),
        line: genChartData(12),
        heatmap: [
          { label: 'Mon', values: genData(5, rng) },
          { label: 'Tue', values: genData(5, rng) },
          { label: 'Wed', values: genData(5, rng) },
          { label: 'Thu', values: genData(5, rng) },
        ],
        spark: genData(30, rng),
      });
      setProgress(p => (p >= 100 ? 0 : p + 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const s = theme;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
      background: '#111', color: '#eee',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: '1em',
        padding: '0.75em 1em', background: '#1a1a2e',
        borderBottom: '1px solid #333', flexShrink: 0,
      }}>
        <button onClick={onBack} style={{
          padding: '0.3em 0.7em', fontSize: '0.85em',
          background: '#45475a', color: '#fff',
          border: 'none', borderRadius: '4px', cursor: 'pointer',
        }}>
          ← Back to Playground
        </button>
        <strong style={{ fontSize: '1.1em' }}>Component Showcase</strong>
        <span style={{ fontSize: '0.8em', opacity: 0.5 }}>Live demos with auto-updating chart data (2s interval)</span>
      </header>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5em' }}>

        {/* ── Form Controls ──────────────────────────────────────────── */}
        <Section title="Form Controls">
          <WindowContent styleSettings={s} style={{ width: '200px' }}>
            <Input value={demoInput} action={e => setDemoInput(e.target.value)} placeholder="Type here..." styleSettings={s} />
          </WindowContent>
          <WindowContent styleSettings={s} style={{ width: '200px' }}>
            <Select value={demoSelect} action={e => setDemoSelect(e.target.value)}
              options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C' }]}
              placeholder="Pick one..." styleSettings={s} />
          </WindowContent>
          <WindowContent styleSettings={s} style={{ width: '200px' }}>
            <Textarea value={demoText} action={e => setDemoText(e.target.value)} placeholder="Write something..." rows={3} styleSettings={s} />
          </WindowContent>
          <WindowContent styleSettings={s} style={{ minWidth: '180px' }}>
            <Checkbox checked={demoCheck} action={e => setDemoCheck(e.target.checked)} label="Enable feature" styleSettings={s} />
            <div style={{ marginTop: '0.5em' }}>
              <Toggle checked={demoToggle} action={e => setDemoToggle(e.target.checked)} label="Dark mode" styleSettings={s} />
            </div>
          </WindowContent>
          <WindowContent styleSettings={s} style={{ minWidth: '200px' }}>
            <Slider value={demoSlider} onChange={setDemoSlider} label="Volume" styleSettings={s} />
            <Radio checked={demoRadio === 'a'} onChange={() => setDemoRadio('a')} label="Small" styleSettings={s} />
            <Radio checked={demoRadio === 'b'} onChange={() => setDemoRadio('b')} label="Medium" styleSettings={s} />
            <Radio checked={demoRadio === 'c'} onChange={() => setDemoRadio('c')} label="Large" styleSettings={s} />
          </WindowContent>
        </Section>

        {/* ── Buttons ────────────────────────────────────────────────── */}
        <Section title="Buttons">
          <Button label="Default" action={() => {}} styleSettings={s} />
          <Button label="Primary" variant="primary" action={() => {}} styleSettings={s} />
          <Button label="Ghost" variant="ghost" action={() => {}} styleSettings={s} />
          <Button label="Disabled" disabled action={() => {}} styleSettings={s} />
        </Section>

        {/* ── Display & Feedback ─────────────────────────────────────── */}
        <Section title="Display & Feedback">
          <WindowContent styleSettings={s} style={{ minWidth: '300px' }}>
            <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.75em' }}>
              <Badge label="info" variant="info" styleSettings={s} />
              <Badge label="success" variant="success" styleSettings={s} />
              <Badge label="warning" variant="warning" styleSettings={s} />
              <Badge label="danger" variant="danger" styleSettings={s} />
              <Badge label="default" styleSettings={s} />
            </div>
            <Alert variant="success" styleSettings={s}>Operation completed successfully!</Alert>
            <div style={{ marginTop: '0.5em' }}>
              <Alert variant="warning" onClose={() => {}} styleSettings={s}>This is a dismissible warning.</Alert>
            </div>
            <Divider styleSettings={s} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em', marginTop: '0.5em' }}>
              <Spinner size="1em" styleSettings={s} />
              <span style={{ fontSize: '0.85em', opacity: 0.7 }}>Loading...</span>
            </div>
            <div style={{ marginTop: '1em' }}>
              <ProgressBar value={progress} styleSettings={s} />
            </div>
          </WindowContent>
        </Section>

        {/* ── Tabs ───────────────────────────────────────────────────── */}
        <Section title="Tabs">
          <WindowContent styleSettings={s} style={{ width: '400px' }}>
            <TabContainer tabComponents={{
              'Tab 1': () => <div style={{ padding: '0.5em' }}>Content of Tab 1</div>,
              'Tab 2': () => <div style={{ padding: '0.5em' }}>Content of Tab 2</div>,
              'Tab 3': () => <div style={{ padding: '0.5em' }}>Content of Tab 3</div>,
            }} styleSettings={s} />
          </WindowContent>
        </Section>

        {/* ── Card ───────────────────────────────────────────────────── */}
        <Section title="Card">
          <Card header="Card Title" footer={<><Button label="OK" action={() => {}} styleSettings={s} /><Button label="Cancel" variant="ghost" action={() => {}} styleSettings={s} /></>} styleSettings={s}>
            <p style={{ margin: 0, fontSize: '0.85em' }}>Card body content goes here. Supports header, body, and footer sections.</p>
          </Card>
        </Section>

        {/* ── Sparkline ──────────────────────────────────────────────── */}
        <Section title="Sparkline">
          <WindowContent styleSettings={s} style={{ minWidth: '250px' }}>
            <div style={{ fontSize: '0.85em', marginBottom: '0.5em' }}>Live data (30 points):</div>
            <Sparkline data={chartData.spark} styleSettings={s} />
            <div style={{ fontSize: '0.75em', opacity: 0.5, marginTop: '0.25em' }}>Updates every 2s</div>
          </WindowContent>
        </Section>

        {/* ── Charts ─────────────────────────────────────────────────── */}
        <Section title="Charts">
          <AreaChart data={chartData.area} title="Area Chart" styleSettings={s} />
          <BarChart data={chartData.bar} title="Bar Chart" styleSettings={s} />
          <LineChart data={chartData.line} title="Line Chart" styleSettings={s} />
          <HeatmapChart data={chartData.heatmap} title="Heatmap" styleSettings={s} />
        </Section>

      </div>
    </div>
  );
}