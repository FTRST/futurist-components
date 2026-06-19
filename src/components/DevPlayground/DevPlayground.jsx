import { useState, useCallback, useRef, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useDeviceDetail } from '../../states/deviceDetail';
import { windowManipulatorAtom } from '../../states/deviceDetailState';
import BaseWindow from '../BaseWindow/BaseWindow';
import Alert from '../Alert/Alert';
import Badge from '../Badge/Badge';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import Divider from '../Divider/Divider';
import Input from '../Input/Input';
import Select from '../Select/Select';
import Spinner from '../Spinner/Spinner';
import Textarea from '../Textarea/Textarea';
import Toggle from '../Toggle/Toggle';
import WindowContent from '../WindowContent/WindowContent';
import WindowTitle from '../WindowTitle/WindowTitle';
import ComponentShowcase from '../ComponentShowcase/ComponentShowcase';
import AreaChart from '../AreaChart/AreaChart';
import BarChart from '../BarChart/BarChart';
import LineChart from '../LineChart/LineChart';
import HeatmapChart from '../HeatmapChart/HeatmapChart';
import Sparkline from '../Sparkline/Sparkline';
import TabContainer from '../TabContainer/TabContainer';
import { openWindow } from '../../utils/windowControls';
import { themeAtom, updateThemeAtom, themes } from '../../states/themeState';

// ─── Quick-start window templates ────────────────────────────────────────────
const WINDOW_TEMPLATES = [
  { id: 'notes', title: 'Notes', width: '400px', height: '350px' },
  { id: 'terminal', title: 'Terminal', width: '500px', height: '300px' },
  { id: 'files', title: 'File Manager', width: '600px', height: '450px' },
  { id: 'preview', title: 'Preview', width: '350px', height: '250px' },
  { id: 'charts', title: 'Charts', width: '500px', height: '450px' },
  { id: 'tabs', title: 'Tab Demo', width: '500px', height: '350px' },
];

let idCounter = 0;
const genId = () => `win_${Date.now()}_${++idCounter}`;

// ─── DevPlayground ───────────────────────────────────────────────────────────
export default function DevPlayground() {
  const device = useDeviceDetail();
  const manipulateWindows = useSetAtom(windowManipulatorAtom);

  const [styleSettings, setStyleSettings] = useAtom(themeAtom);
  const setAtomTheme = useSetAtom(updateThemeAtom);
  const [activePreset, setActivePreset] = useState('modern');
  const [showTheme, setShowTheme] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [importValue, setImportValue] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const importRef = useRef(null);
  const [demoCheck, setDemoCheck] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [demoText, setDemoText] = useState('');
  const [demoSelect, setDemoSelect] = useState('');
  const [demoToggle, setDemoToggle] = useState(false);

  // ── live chart demo data ────────────────────────────────────────────────────
  const rng = () => Math.floor(Math.random() * 100);
  const genData = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
  const genChartData = (n) => genData(n, (i) => ({ label: `Item ${i + 1}`, value: rng() }));

  const [chartDemoData, setChartDemoData] = useState({
    area: genChartData(8),
    bar: genChartData(5),
    line: genChartData(10),
    heatmap: [
      { label: 'Mon', values: genData(5, rng) },
      { label: 'Tue', values: genData(5, rng) },
      { label: 'Wed', values: genData(5, rng) },
      { label: 'Thu', values: genData(5, rng) },
    ],
    spark: genData(25, rng),
  });
  const chartIntervalRef = useRef(null);

  // Start/stop chart data loop when windows are open
  useEffect(() => {
    if (device?.windows?.some(w => w.title === 'Charts')) {
      if (!chartIntervalRef.current) {
        chartIntervalRef.current = setInterval(() => {
          setChartDemoData({
            area: genChartData(8),
            bar: genChartData(5),
            line: genChartData(10),
            heatmap: [
              { label: 'Mon', values: genData(5, rng) },
              { label: 'Tue', values: genData(5, rng) },
              { label: 'Wed', values: genData(5, rng) },
              { label: 'Thu', values: genData(5, rng) },
            ],
            spark: genData(25, rng),
          });
        }, 2000);
      }
    } else {
      if (chartIntervalRef.current) {
        clearInterval(chartIntervalRef.current);
        chartIntervalRef.current = null;
      }
    }
    return () => { if (chartIntervalRef.current) clearInterval(chartIntervalRef.current); };
  }, [device?.windows]);

  // ── apply a preset ─────────────────────────────────────────────────────────
  const applyPreset = useCallback((name) => {
    setStyleSettings(themes[name]);
    setActivePreset(name);
  }, []);

  // ── spawn a window ─────────────────────────────────────────────────────────
  const spawnWindow = useCallback((template) => {
    const id = genId();
    openWindow(manipulateWindows, {
      ...template,
      id,
      zIndex: 99999,
    });
  }, [manipulateWindows]);

  // ── theme change helpers ────────────────────────────────────────────────────
  const setStyle = useCallback((category, property, value) => {
    setAtomTheme({ [category]: { [property]: value } });
  }, [setAtomTheme]);

  // ── clear all windows ──────────────────────────────────────────────────────
  const clearWindows = useCallback(() => {
    for (const w of device.windows) {
      manipulateWindows({ type: 'remove', window: { id: w.id } });
    }
  }, [device.windows, manipulateWindows]);

  // ── generate unique id that doesn't conflict with existing windows ─────────
  const safeSpawn = useCallback((template) => {
    const id = genId();
    openWindow(manipulateWindows, { ...template, id, zIndex: 99999 });
  }, [manipulateWindows]);

  // ── CSS variables for the playground chrome ────────────────────────────────
  const chromeStyle = {
    '--bg': styleSettings.window.backgroundColor,
    '--border': styleSettings.window.borderColor,
    '--text': styleSettings.titleBar.textColor,
    '--title-bg': styleSettings.titleBar.backgroundColor,
  };

  // ── copy theme as JSON ──────────────────────────────────────────────────────
  const copyTheme = useCallback(() => {
    const themeJson = JSON.stringify(styleSettings, null, 2);
    navigator.clipboard.writeText(themeJson).then(() => {
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    }).catch(() => {
      // Fallback: select and copy from a temp element
      const ta = document.createElement('textarea');
      ta.value = themeJson;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2000);
    });
  }, [styleSettings]);

  // ── import theme from pasted JSON ───────────────────────────────────────────
  const importTheme = useCallback(() => {
      try {
        const parsed = JSON.parse(importValue);
        if (!parsed.window || !parsed.titleBar || !parsed.borders || !parsed.button || !parsed.spacing || !parsed.dimensions) {
          alert('Invalid theme: missing required sections (window, titleBar, borders, button, spacing, dimensions)');
          return;
        }
        setAtomTheme(parsed);
        setActivePreset(null);
        setShowImport(false);
        setImportValue('');
      } catch (e) {
        alert('Invalid JSON: ' + e.message);
      }
    }, [importValue, setAtomTheme]);

  if (showcase) {
    return <ComponentShowcase onBack={() => setShowcase(false)} />;
  }

  // ── render demo content per window type ─────────────────────────────────────
  const renderWindowContent = (w, ctx) => {
    const s = ctx.styleSettings;

    switch (w.title) {
      case 'Notes':
        return (
          <div>
            <WindowTitle value={w.title} styleSettings={s} />
            <Input
              value={ctx.demoInput}
              action={e => ctx.setDemoInput(e.target.value)}
              placeholder="Type something..."
              styleSettings={s}
            />
            <div style={{ marginTop: '0.5em' }}>
              <Checkbox
                checked={ctx.demoCheck}
                action={e => ctx.setDemoCheck(e.target.checked)}
                label="Remember me"
                styleSettings={s}
              />
            </div>
            <div style={{ marginTop: '0.5em' }}>
              <Toggle
                checked={ctx.demoToggle}
                action={e => ctx.setDemoToggle(e.target.checked)}
                label="Enable notifications"
                styleSettings={s}
              />
            </div>
            <Divider styleSettings={s} />
            <div style={{ fontSize: '0.8em', opacity: 0.6 }}>
              {ctx.demoInput ? `You wrote: "${ctx.demoInput}"` : 'Waiting for input...'}
            </div>
          </div>
        );

      case 'Terminal':
        return (
          <div>
            <WindowTitle value={w.title} styleSettings={s} />
            <Alert variant="info" styleSettings={s}>
              Connection established. All systems nominal.
            </Alert>
            <div style={{ marginTop: '0.5em' }}>
              <Textarea
                value={ctx.demoText}
                action={e => ctx.setDemoText(e.target.value)}
                placeholder="Enter command..."
                rows={3}
                styleSettings={s}
              />
            </div>
            <div style={{ marginTop: '0.5em', display: 'flex', gap: '0.5em', alignItems: 'center' }}>
              <Button label="Run" action={() => {}} styleSettings={s} />
              <Button label="Clear" variant="ghost" action={() => ctx.setDemoText('')} styleSettings={s} />
              <Spinner size="0.9em" styleSettings={s} />
            </div>
          </div>
        );

      case 'File Manager':
        return (
          <div>
            <WindowTitle value={w.title} styleSettings={s} />
            <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
              <Badge label="Documents" variant="info" styleSettings={s} />
              <Badge label="12 items" variant="default" styleSettings={s} />
              <Badge label="Shared" variant="success" styleSettings={s} />
            </div>
            <Select
              value={ctx.demoSelect}
              action={e => ctx.setDemoSelect(e.target.value)}
              options={[
                { value: 'recent', label: 'Recent files' },
                { value: 'shared', label: 'Shared with me' },
                { value: 'starred', label: 'Starred' },
              ]}
              placeholder="Filter..."
              styleSettings={s}
            />
            <Divider styleSettings={s} />
            {[{ name: 'report.pdf', size: '2.4 MB', badge: 'info' },
              { name: 'photo.jpg', size: '1.1 MB', badge: 'default' },
              { name: 'notes.txt', size: '12 KB', badge: 'warning' }].map(f => (
              <div key={f.name} style={{
                display: 'flex', alignItems: 'center', gap: '0.5em',
                padding: '0.4em 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <span style={{ flex: 1 }}>{f.name}</span>
                <span style={{ fontSize: '0.8em', opacity: 0.5 }}>{f.size}</span>
                <Badge label={f.badge} variant={f.badge} styleSettings={s} />
              </div>
            ))}
          </div>
        );

      case 'Charts':
        return (
          <div>
            <WindowTitle value={w.title} styleSettings={s} />
            <div style={{ fontSize: '0.75em', opacity: 0.5, marginBottom: '0.5em' }}>Live data — updates every 2s while open</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
              <Sparkline data={chartDemoData.spark} styleSettings={s} />
              <BarChart data={chartDemoData.bar} title="Bar Chart" styleSettings={s} />
              <LineChart data={chartDemoData.line} title="Line Chart" styleSettings={s} />
              <AreaChart data={chartDemoData.area} title="Area Chart" styleSettings={s} />
              <HeatmapChart data={chartDemoData.heatmap} title="Heatmap" styleSettings={s} />
            </div>
          </div>
        );

      case 'Tab Demo':
        return (
          <div>
            <WindowTitle value={w.title} styleSettings={s} />
            <TabContainer tabComponents={{
              'Details': () => (
                <div>
                  <p style={{ margin: '0 0 0.5em 0', fontSize: '0.85em' }}>Tab content area — each tab shows different content.</p>
                  <Input value={ctx.demoInput} action={e => ctx.setDemoInput(e.target.value)} placeholder="Type in this tab..." styleSettings={s} />
                </div>
              ),
              'Settings': () => (
                <div>
                  <div style={{ marginBottom: '0.5em' }}><Toggle checked={ctx.demoToggle} action={e => ctx.setDemoToggle(e.target.checked)} label="Enable feature" styleSettings={s} /></div>
                  <Checkbox checked={ctx.demoCheck} action={e => ctx.setDemoCheck(e.target.checked)} label="Show on dashboard" styleSettings={s} />
                </div>
              ),
              'Stats': () => (
                <div>
                  <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
                    <Badge label="Active" variant="success" styleSettings={s} />
                    <Badge label="12 items" variant="info" styleSettings={s} />
                    <Badge label="3 warnings" variant="warning" styleSettings={s} />
                  </div>
                  <div style={{ fontSize: '0.85em', opacity: 0.8 }}>Status: all systems operational.</div>
                </div>
              ),
            }} styleSettings={s} />
          </div>
        );

      default:
        return (
          <div>
            <WindowTitle value={w.title} styleSettings={s} />
            <Alert variant="default" styleSettings={s}>
              This is a demo window. Try the other templates!
            </Alert>
            <div style={{ marginTop: '0.75em', fontSize: '0.85em', opacity: 0.6 }}>
              id: {w.id}<br />
              size: {w.width} × {w.height}<br />
              z-index: {w.zIndex}
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
      background: '#111',
      color: '#eee',
      overflow: 'hidden',
    }}>
      {/* ── Header toolbar ────────────────────────────────────────────── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1em',
        padding: '0.75em 1em',
        background: '#1a1a2e',
        borderBottom: '1px solid #333',
        flexShrink: 0,
      }}>
        <strong style={{ fontSize: '1.1em' }}>Dev Playground</strong>

        {/* Theme presets */}
        <div style={{ display: 'flex', gap: '0.25em', marginLeft: '1em' }}>
          {Object.keys(themes).map(name => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              style={{
                padding: '0.3em 0.6em',
                fontSize: '0.8em',
                background: activePreset === name ? '#45475a' : '#2a2a3e',
                color: activePreset === name ? '#fff' : '#999',
                border: '1px solid #555',
                borderRadius: '4px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Window spawn buttons */}
        <div style={{ display: 'flex', gap: '0.3em' }}>
          {WINDOW_TEMPLATES.map(tpl => (
            <button
              key={tpl.id}
              onClick={() => safeSpawn(tpl)}
              style={{
                padding: '0.3em 0.7em',
                fontSize: '0.8em',
                background: '#2a2a3e',
                color: '#ccc',
                border: '1px solid #555',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              + {tpl.title}
            </button>
          ))}
        </div>

        {/* Toggle panels */}
        <button
          onClick={() => setShowTheme(s => !s)}
          style={{
            padding: '0.3em 0.6em',
            fontSize: '0.8em',
            background: showTheme ? '#45475a' : '#2a2a3e',
            color: '#ccc',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Theme
        </button>
        <button
          onClick={() => setShowDebug(s => !s)}
          style={{
            padding: '0.3em 0.6em',
            fontSize: '0.8em',
            background: showDebug ? '#45475a' : '#2a2a3e',
            color: '#ccc',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Debug
        </button>

        {/* Showcase button */}
        <button
          onClick={() => setShowcase(true)}
          style={{
            padding: '0.3em 0.6em',
            fontSize: '0.8em',
            background: '#2a2a3e',
            color: '#ccc',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Showcase
        </button>

        {/* Copy theme button */}
        <button
          onClick={copyTheme}
          style={{
            padding: '0.3em 0.6em',
            fontSize: '0.8em',
            background: copyFeedback ? '#2d4a2d' : '#2a2a3e',
            color: copyFeedback ? '#8f8' : '#ccc',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            minWidth: '5em',
          }}
        >
          {copyFeedback || 'Copy'}
        </button>

        {/* Import button */}
        <button
          onClick={() => {
            setShowImport(s => !s);
            if (!showImport) setTimeout(() => importRef.current?.focus(), 50);
          }}
          style={{
            padding: '0.3em 0.6em',
            fontSize: '0.8em',
            background: showImport ? '#45475a' : '#2a2a3e',
            color: '#ccc',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Import
        </button>
      </header>

      {/* ── Import popover ─────────────────────────────────────────────── */}
      {showImport && (
        <div style={{
          background: '#1a1a2e',
          borderBottom: '1px solid #333',
          padding: '0.5em 1em',
          display: 'flex',
          gap: '0.5em',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '0.8em', opacity: 0.6 }}>Paste theme JSON:</span>
          <textarea
            ref={importRef}
            value={importValue}
            onChange={e => setImportValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); importTheme(); } }}
            placeholder='{"window": {"backgroundColor": "#...", ...}}'
            rows={1}
            style={{
              flex: 1,
              background: '#2a2a3e',
              color: '#ccc',
              border: '1px solid #555',
              borderRadius: '4px',
              padding: '0.3em 0.5em',
              fontSize: '0.8em',
              fontFamily: 'monospace',
              resize: 'none',
              minHeight: '1.8em',
            }}
          />
          <button
            onClick={importTheme}
            disabled={!importValue.trim()}
            style={{
              padding: '0.3em 0.8em',
              fontSize: '0.8em',
              background: importValue.trim() ? '#45475a' : '#2a2a3e',
              color: importValue.trim() ? '#fff' : '#666',
              border: '1px solid #555',
              borderRadius: '4px',
              cursor: importValue.trim() ? 'pointer' : 'default',
            }}
          >
            Apply
          </button>
          <button
            onClick={() => { setShowImport(false); setImportValue(''); }}
            style={{
              padding: '0.3em 0.5em',
              fontSize: '0.8em',
              background: 'none',
              color: '#888',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Theme panel ───────────────────────────────────────────────── */}
      {showTheme && (
        <div style={{
          background: '#1a1a2e',
          borderBottom: '1px solid #333',
          padding: '0.75em 1em',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5em',
          flexShrink: 0,
          fontSize: '0.85em',
        }}>
          {/* Window colors */}
          <ThemeGroup label="Window">
            <ColorInput
              label="Background"
              value={styleSettings.window.backgroundColor}
              onChange={v => setStyle('window', 'backgroundColor', v)}
            />
            <ColorInput
              label="Border"
              value={styleSettings.window.borderColor}
              onChange={v => setStyle('window', 'borderColor', v)}
            />
          </ThemeGroup>

          {/* TitleBar colors */}
          <ThemeGroup label="TitleBar">
            <ColorInput
              label="Background"
              value={styleSettings.titleBar.backgroundColor}
              onChange={v => setStyle('titleBar', 'backgroundColor', v)}
            />
            <ColorInput
              label="Text"
              value={styleSettings.titleBar.textColor}
              onChange={v => setStyle('titleBar', 'textColor', v)}
            />
          </ThemeGroup>

          {/* Borders */}
          <ThemeGroup label="Border">
            <TextInput
              label="Width"
              value={styleSettings.borders.width}
              onChange={v => setStyle('borders', 'width', v)}
              width="4em"
            />
            <select
              value={styleSettings.borders.style}
              onChange={e => setStyle('borders', 'style', e.target.value)}
              style={{
                background: '#2a2a3e',
                color: '#ccc',
                border: '1px solid #555',
                borderRadius: '4px',
                padding: '0.2em',
                fontSize: '0.85em',
              }}
            >
              {['solid', 'double', 'dashed', 'ridge', 'inset', 'outset'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </ThemeGroup>

          {/* Spacing */}
          <ThemeGroup label="Spacing">
            <TextInput
              label="Padding"
              value={styleSettings.spacing.padding}
              onChange={v => setStyle('spacing', 'padding', v)}
              width="4em"
            />
          </ThemeGroup>

          {/* Dimensions */}
          <ThemeGroup label="Constraints">
            <NumberInput
              label="Min W"
              value={styleSettings.dimensions.minWidth}
              onChange={v => setStyle('dimensions', 'minWidth', v)}
            />
            <NumberInput
              label="Min H"
              value={styleSettings.dimensions.minHeight}
              onChange={v => setStyle('dimensions', 'minHeight', v)}
            />
          </ThemeGroup>

          {/* Button colors */}
          <ThemeGroup label="Button">
            <ColorInput
              label="Text"
              value={styleSettings.button.primaryText}
              onChange={v => setStyle('button', 'primaryText', v)}
            />
            <ColorInput
              label="BG"
              value={styleSettings.button.primaryBg}
              onChange={v => setStyle('button', 'primaryBg', v)}
            />
          </ThemeGroup>
        </div>
      )}

      {/* ── Main workspace ─────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        background: '#0d0d1a',
      }}>
        {/* Floating windows */}
        {device?.windows?.map((w, i) => (
          <BaseWindow
            key={w.id}
            id={w.id}
            device={device}
            manipulateWindows={manipulateWindows}
            styleSettings={styleSettings}
          >
            <WindowContent styleSettings={styleSettings} style={{ border: 'none', padding: '0.75em', background: 'none' }}>
              {renderWindowContent(w, {
                demoCheck, setDemoCheck,
                demoInput, setDemoInput,
                demoText, setDemoText,
                demoSelect, setDemoSelect,
                demoToggle, setDemoToggle,
                styleSettings,
              })}
            </WindowContent>
          </BaseWindow>
        ))}

        {/* Empty state */}
        {device?.windows?.length === 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1em',
            color: '#555',
            fontSize: '1.1em',
          }}>
            <div style={{ fontSize: '3em' }}>⬜</div>
            <div>No windows open</div>
            <div style={{ fontSize: '0.85em' }}>Click + in the toolbar to spawn one</div>
          </div>
        )}
      </div>

      {/* ── Debug panel ────────────────────────────────────────────────── */}
      {showDebug && (
        <div style={{
          background: '#1a1a2e',
          borderTop: '1px solid #333',
          padding: '0.75em 1em',
          flexShrink: 0,
          maxHeight: '200px',
          overflow: 'auto',
          fontSize: '0.8em',
          fontFamily: 'monospace',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5em' }}>
            <strong>Debug — {device.windows.length} window(s)</strong>
            <span>Viewport: {device.width}×{device.height} | DeskSpace: {device.deskSpace.width}×{device.deskSpace.height}</span>
          </div>
          {device.windows.map(w => (
            <div key={w.id} style={{
              display: 'flex',
              gap: '1em',
              padding: '0.25em 0',
              borderBottom: '1px solid #2a2a3e',
            }}>
              <span style={{ color: styleSettings.window.borderColor }}>{w.title}</span>
              <span style={{ opacity: 0.5 }}>{w.id}</span>
              <span>{w.width}×{w.height}</span>
              <span>z:{w.zIndex}</span>
              <span>{w.maximize ? '🟢 max' : ''}</span>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => manipulateWindows({
                  type: 'remove',
                  window: { id: w.id }
                })}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f88',
                  cursor: 'pointer',
                  fontSize: '0.9em',
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Inline mini-components for the theme panel ───────────────────────────────

function ThemeGroup({ label, children }) {
  return (
    <div>
      <div style={{
        fontWeight: 600,
        marginBottom: '0.3em',
        fontSize: '0.8em',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        opacity: 0.5,
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center', flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
      <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{label}</span>
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '1.8em',
          height: '1.8em',
          padding: 0,
          border: '1px solid #555',
          borderRadius: '4px',
          cursor: 'pointer',
          background: 'none',
        }}
      />
    </label>
  );
}

function TextInput({ label, value, onChange, width }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
      <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{label}</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: width || '3em',
          background: '#2a2a3e',
          color: '#ccc',
          border: '1px solid #555',
          borderRadius: '4px',
          padding: '0.2em 0.3em',
          fontSize: '0.85em',
        }}
      />
    </label>
  );
}

function NumberInput({ label, value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.3em' }}>
      <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{label}</span>
      <input
        type="number"
        value={value}
        onChange={e => onChange(parseInt(e.target.value) || 0)}
        style={{
          width: '3.5em',
          background: '#2a2a3e',
          color: '#ccc',
          border: '1px solid #555',
          borderRadius: '4px',
          padding: '0.2em 0.3em',
          fontSize: '0.85em',
        }}
      />
    </label>
  );
}