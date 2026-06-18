import React, { useState, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { themeAtom, updateThemeAtom } from '../../states/themeState';
import BaseWindow from '../BaseWindow/BaseWindow';
import Draggable from 'react-draggable';

const AccordionSection = ({ title, isOpen, onToggle, children, draggableType }) => {
  const handleDragStart = (e) => {
    if (draggableType) {
      e.dataTransfer.setData('componentType', draggableType);
      e.dataTransfer.effectAllowed = 'copy';
    }
  };

  return (
    <div style={{ marginBottom: '0.5em', border: '1px solid #6bf178', borderRadius: '4px' }}>
      <button
        onClick={onToggle}
        draggable={!!draggableType}
        onDragStart={handleDragStart}
        style={{
          width: '100%',
          padding: '0.75em',
          background: isOpen ? '#02111B' : 'transparent',
          color: '#6bf178',
          border: 'none',
          textAlign: 'left',
          cursor: draggableType ? 'grab' : 'pointer',
          fontWeight: 'bold',
          fontSize: '1em',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>{isOpen ? '▼' : '▶'} {title}</span>
      </button>
      {isOpen && <div style={{ padding: '0.75em' }}>{children}</div>}
    </div>
  );
};

const ColorInput = ({ label, value, onChange }) => (
  <div style={{ marginBottom: '0.5em' }}>
    <label style={{ display: 'block', marginBottom: '0.25em', fontSize: '0.875em' }}>{label}</label>
    <input
      type="color"
      value={value || '#6bf178'}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', height: '2em', cursor: 'pointer' }}
    />
  </div>
);

const TextInput = ({ label, value, onChange, placeholder }) => (
  <div style={{ marginBottom: '0.5em' }}>
    <label style={{ display: 'block', marginBottom: '0.25em', fontSize: '0.875em' }}>{label}</label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '0.375em', background: '#02111B', color: '#6bf178', border: '1px solid #6bf178' }}
    />
  </div>
);

const SelectInput = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: '0.5em' }}>
    <label style={{ display: 'block', marginBottom: '0.25em', fontSize: '0.875em' }}>{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', padding: '0.375em', background: '#02111B', color: '#6bf178', border: '1px solid #6bf178' }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const NumberInput = ({ label, value, onChange, placeholder }) => (
  <div style={{ marginBottom: '0.5em' }}>
    <label style={{ display: 'block', marginBottom: '0.25em', fontSize: '0.875em' }}>{label}</label>
    <input
      type="number"
      value={value || ''}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '0.375em', background: '#02111B', color: '#6bf178', border: '1px solid #6bf178' }}
    />
  </div>
);

const DraggableComponent = ({ type, children }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('componentType', type);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        cursor: 'grab',
        padding: '0.5em',
        background: '#02111B',
        border: '1px solid #6bf178',
        borderRadius: '4px',
        marginBottom: '0.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </div>
  );
};

const Customizer = () => {
  const theme = useAtomValue(themeAtom);
  const updateTheme = useSetAtom(updateThemeAtom);

  const [openSection, setOpenSection] = useState(null);
  const [activeTab, setActiveTab] = useState('components');
  const [droppedComponents, setDroppedComponents] = useState([]);
  const exampleAppRef = useRef(null);
  const [exampleAppOpen, setExampleAppOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  const handleChange = (category, property, value) => {
    updateTheme({ [category]: { [property]: value } });
  };

  const getStyleValue = (category, property) => theme[category]?.[property] || '';

  const handleDropInWindow = (e) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('componentType');
    
    if (componentType && exampleAppRef.current) {
      const rect = exampleAppRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setDroppedComponents(prev => [...prev, { 
        id: Date.now(), 
        type: componentType, 
        x, 
        y 
      }]);
    }
  };

  const removeComponent = (id) => {
    setDroppedComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const handleExampleAppClick = () => {
    setExampleAppOpen(true);
  };

  const renderComponentType = (comp) => {
    switch(comp.type) {
      case 'baseWindow':
        return (
          <div style={{
            position: 'relative',
            border: `${theme.borders?.width || '.25em'} ${theme.borders?.style || 'double'} ${theme.window?.borderColor || '#6bf178'}`,
            backgroundColor: theme.window?.backgroundColor || 'rgba(2,17,27,.7)',
            width: '300px',
            height: '300px'
          }}>
            <div style={{
              background: theme.titleBar?.backgroundColor || '#02111b',
              color: theme.titleBar?.textColor || '#6bf178',
              borderBottom: `${theme.borders?.style || 'double'} ${theme.borders?.width || '0.1em'} ${theme.window?.borderColor || '#6bf178'}`,
              padding: '0.5em',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>New Window</span>
              <div style={{ display: 'flex', gap: '0.25em' }}>
                <button style={{ background: 'transparent', border: 'none', color: theme.titleBar?.textColor || '#6bf178', cursor: 'pointer' }}>−</button>
                <button style={{ background: 'transparent', border: 'none', color: theme.titleBar?.textColor || '#6bf178', cursor: 'pointer' }}>□</button>
                <button style={{ background: 'transparent', border: 'none', color: '#f50000', cursor: 'pointer' }}>×</button>
              </div>
            </div>
          </div>
        );
      case 'titleBar':
        return (
          <div className="ftrst title-bar" style={{
            background: theme.titleBar?.backgroundColor || '#02111b',
            color: theme.titleBar?.textColor || '#6bf178',
            padding: '0.5em',
            width: '200px'
          }}>Title Bar Text</div>
        );
      case 'button':
        return (
          <button className="ftrst button" style={{
            color: '#6BF178',
            backgroundColor: theme.button?.primaryBg || '#02111B',
            padding: '0.5em 1em',
            border: `outset ${theme.borders?.width || 'medium'} ${theme.window?.borderColor || '#6BF178'}`,
            outline: `solid .1em ${theme.button?.primaryBg || '#02111B'}`
          }}>Click Me</button>
        );
      case 'checkbox':
        return (
          <label className="ftrst checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5em', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ display: 'none' }} />
            <span style={{
              width: '1.25em',
              height: '1.25em',
              border: `${theme.borders?.width || '.15em'} ${theme.borders?.style || 'solid'} ${theme.window?.borderColor || '#6BF178'}`,
              backgroundColor: theme.window?.borderColor || '#6BF178',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: theme.button?.primaryBg || '#02111B', fontWeight: 'bold' }}>✓</span>
            </span>
            <span className="ftrst checkbox-label" style={{ color: theme.titleBar?.textColor || '#6bf178' }}>Checked</span>
          </label>
        );
      case 'input':
        return (
          <input className="ftrst input" type="text" placeholder="Type here..." style={{
            textAlign: 'center',
            color: theme.titleBar?.textColor || '#6bf178',
            padding: '.5em',
            backgroundColor: theme.button?.primaryBg || '#02111b',
            border: `ridge ${theme.borders?.width || '.25em'} ${theme.window?.borderColor || '#6bf178'}`,
            width: '150px'
          }} />
        );
      case 'card':
        return (
          <div className="ftrst card" style={{
            backgroundColor: theme.button?.primaryBg || '#02111B',
            border: `${theme.borders?.width || '.15em'} ${theme.borders?.style || 'solid'} ${theme.window?.borderColor || '#6BF178'}`,
            padding: theme.spacing?.padding || '.5em',
            color: theme.titleBar?.textColor || '#6bf178',
            width: '150px'
          }}>
            <h4 style={{ margin: '0 0 0.5em 0', borderBottom: `${theme.borders?.width || '.1em'} solid ${theme.window?.borderColor || '#6bf178'}`, paddingBottom: '0.5em' }}>Card Title</h4>
            <p style={{ margin: 0, fontSize: '0.875em' }}>Card content here</p>
          </div>
        );
      default:
        return (
          <div style={{
            padding: '0.5em',
            background: theme.button?.primaryBg || '#02111B',
            border: `1px solid ${theme.window?.borderColor || '#6bf178'}`,
            color: theme.titleBar?.textColor || '#6bf178'
          }}>
            {comp.type}
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '25% 75%', gap: '0', height: '100vh' }}>
      {/* Left Column - Controls */}
      <div style={{ 
        borderRight: `1px solid #6bf178`, 
        overflowY: 'auto',
        background: '#02111B',
        padding: '1em'
      }}>
        <h3 style={{ color: '#6bf178', marginBottom: '1em', fontSize: '1em' }}>Customizer</h3>

        {/* BaseWindow */}
        <AccordionSection
          title="BaseWindow"
          isOpen={openSection === 'baseWindow'}
          onToggle={() => toggleSection('baseWindow')}
          draggableType="baseWindow"
        >
          <ColorInput label="Border Color" value={getStyleValue('window', 'borderColor')} onChange={(v) => handleChange('window', 'borderColor', v)} />
          <ColorInput label="Background Color" value={getStyleValue('window', 'backgroundColor')} onChange={(v) => handleChange('window', 'backgroundColor', v)} />
        </AccordionSection>

        {/* TitleBar */}
        <AccordionSection
          title="TitleBar"
          isOpen={openSection === 'titleBar'}
          onToggle={() => toggleSection('titleBar')}
          draggableType="titleBar"
        >
          <ColorInput label="Background Color" value={getStyleValue('titleBar', 'backgroundColor')} onChange={(v) => handleChange('titleBar', 'backgroundColor', v)} />
          <ColorInput label="Text Color" value={getStyleValue('titleBar', 'textColor')} onChange={(v) => handleChange('titleBar', 'textColor', v)} />
        </AccordionSection>

        {/* Button */}
        <AccordionSection
          title="Button"
          isOpen={openSection === 'button'}
          onToggle={() => toggleSection('button')}
          draggableType="button"
        >
          <ColorInput label="Primary Background" value={getStyleValue('button', 'primaryBg')} onChange={(v) => handleChange('button', 'primaryBg', v)} />
        </AccordionSection>

        {/* Checkbox */}
        <AccordionSection
          title="Checkbox"
          isOpen={openSection === 'checkbox'}
          onToggle={() => toggleSection('checkbox')}
          draggableType="checkbox"
        >
          <p style={{ fontSize: '0.75em', color: '#6bf178', marginBottom: '0.5em' }}>Checkbox with custom styled box and checkmark</p>
        </AccordionSection>

        {/* Input */}
        <AccordionSection
          title="Input"
          isOpen={openSection === 'input'}
          onToggle={() => toggleSection('input')}
          draggableType="input"
        >
          <p style={{ fontSize: '0.75em', color: '#6bf178', marginBottom: '0.5em' }}>Text input styling</p>
        </AccordionSection>

        {/* Card */}
        <AccordionSection
          title="Card"
          isOpen={openSection === 'card'}
          onToggle={() => toggleSection('card')}
          draggableType="card"
        >
          <p style={{ fontSize: '0.75em', color: '#6bf178', marginBottom: '0.5em' }}>Card component with header and content</p>
        </AccordionSection>

        {/* Borders */}
        <AccordionSection
          title="Borders"
          isOpen={openSection === 'borders'}
          onToggle={() => toggleSection('borders')}
          draggableType="border"
        >
          <TextInput label="Border Width" value={getStyleValue('borders', 'width')} onChange={(v) => handleChange('borders', 'width', v)} placeholder=".25em" />
          <SelectInput label="Border Style" value={getStyleValue('borders', 'style')} onChange={(v) => handleChange('borders', 'style', v)} options={[
            { value: 'solid', label: 'Solid' },
            { value: 'double', label: 'Double' },
            { value: 'dashed', label: 'Dashed' }
          ]} />
        </AccordionSection>

        {/* Spacing */}
        <AccordionSection
          title="Spacing"
          isOpen={openSection === 'spacing'}
          onToggle={() => toggleSection('spacing')}
          draggableType="spacing"
        >
          <TextInput label="Padding" value={getStyleValue('spacing', 'padding')} onChange={(v) => handleChange('spacing', 'padding', v)} placeholder=".5em" />
          <TextInput label="Margin" value={getStyleValue('spacing', 'margin')} onChange={(v) => handleChange('spacing', 'margin', v)} placeholder=".5em" />
        </AccordionSection>

        {/* Dimensions */}
        <AccordionSection
          title="Dimensions"
          isOpen={openSection === 'dimensions'}
          onToggle={() => toggleSection('dimensions')}
        >
          <NumberInput label="Min Width (px)" value={getStyleValue('dimensions', 'minWidth')} onChange={(v) => handleChange('dimensions', 'minWidth', v)} placeholder="200" />
          <NumberInput label="Min Height (px)" value={getStyleValue('dimensions', 'minHeight')} onChange={(v) => handleChange('dimensions', 'minHeight', v)} placeholder="200" />
        </AccordionSection>

        {/* Theme Actions */}
        <div style={{ marginTop: '2em', paddingTop: '1em', borderTop: '1px solid #6bf178' }}>
          <h4 style={{ color: '#6bf178', marginBottom: '0.5em' }}>Theme Actions</h4>
          <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(theme, null, 2)); alert('Theme copied to clipboard!'); }}
            style={{ marginRight: '0.5em', padding: '0.5em 1em', background: '#6bf178', color: '#02111B', border: 'none', cursor: 'pointer' }}>Copy JSON</button>
          <button onClick={() => { const input = prompt('Paste theme JSON:'); if (input) { try { updateTheme(JSON.parse(input)); alert('Theme loaded!'); } catch (e) { alert('Invalid JSON'); } } }}
            style={{ padding: '0.5em 1em', background: '#6bf178', color: '#02111B', border: 'none', cursor: 'pointer' }}>Load JSON</button>
        </div>
      </div>

      {/* Right Column - Preview with Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#02111B' }}>
        {/* Tab Headers */}
        <div style={{ display: 'flex', borderBottom: `1px solid #6bf178` }}>
          <button onClick={() => setActiveTab('components')} style={{ flex: 1, padding: '0.75em', background: activeTab === 'components' ? '#6bf178' : 'transparent', color: activeTab === 'components' ? '#02111B' : '#6bf178', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Components</button>
          <button onClick={() => setActiveTab('canvas')} style={{ flex: 1, padding: '0.75em', background: activeTab === 'canvas' ? '#6bf178' : 'transparent', color: activeTab === 'canvas' ? '#02111B' : '#6bf178', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Canvas</button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1em' }}>
          {activeTab === 'components' && (
            <div>
              <h3 style={{ color: '#6bf178', marginBottom: '1em' }}>Preview</h3>
              <div style={{ padding: '1em', background: '#02111B', border: '1px solid #6bf178', borderRadius: '4px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {openSection === 'baseWindow' && (
                  <div className="ftrst window" style={{ position: 'relative', border: `${theme.borders?.width || '.25em'} ${theme.borders?.style || 'double'} ${theme.window?.borderColor || '#6BF178'}`, backgroundColor: theme.window?.backgroundColor || 'rgba(2,17,27,.7)', padding: '0', width: '200px', height: '100px' }}>
                    <div className="ftrst title-bar" style={{ background: theme.titleBar?.backgroundColor || '#02111b', color: theme.titleBar?.textColor || '#6bf178', borderBottom: `${theme.borders?.style || 'double'} ${theme.borders?.width || '0.1em'} ${theme.window?.borderColor || '#6bf178'}`, padding: '0.5em' }}>Preview Window</div>
                  </div>
                )}
                {openSection === 'titleBar' && (
                  <DraggableComponent type="titleBar">
                    <div className="ftrst title-bar" style={{ background: theme.titleBar?.backgroundColor || '#02111b', color: theme.titleBar?.textColor || '#6bf178', padding: '0.5em', width: '200px' }}>Title Bar Text</div>
                  </DraggableComponent>
                )}
                {openSection === 'button' && (
                  <DraggableComponent type="button">
                    <button className="ftrst button" style={{ color: '#6BF178', backgroundColor: theme.button?.primaryBg || '#02111B', padding: '0.5em 1em', border: `outset ${theme.borders?.width || 'medium'} ${theme.window?.borderColor || '#6BF178'}`, outline: `solid .1em ${theme.button?.primaryBg || '#02111B'}` }}>Click Me</button>
                  </DraggableComponent>
                )}
                {openSection === 'checkbox' && (
                  <DraggableComponent type="checkbox">
                    <label className="ftrst checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5em', cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ display: 'none' }} />
                      <span style={{ width: '1.25em', height: '1.25em', border: `${theme.borders?.width || '.15em'} ${theme.borders?.style || 'solid'} ${theme.window?.borderColor || '#6BF178'}`, backgroundColor: theme.window?.borderColor || '#6BF178', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: theme.button?.primaryBg || '#02111B', fontWeight: 'bold' }}>✓</span>
                      </span>
                      <span className="ftrst checkbox-label" style={{ color: theme.titleBar?.textColor || '#6bf178' }}>Checked</span>
                    </label>
                  </DraggableComponent>
                )}
                {openSection === 'input' && (
                  <DraggableComponent type="input">
                    <input className="ftrst input" type="text" placeholder="Type here..." style={{ textAlign: 'center', color: theme.titleBar?.textColor || '#6bf178', padding: '.5em', backgroundColor: theme.button?.primaryBg || '#02111b', border: `ridge ${theme.borders?.width || '.25em'} ${theme.window?.borderColor || '#6bf178'}`, width: '150px' }} />
                  </DraggableComponent>
                )}
                {openSection === 'card' && (
                  <DraggableComponent type="card">
                    <div className="ftrst card" style={{ backgroundColor: theme.button?.primaryBg || '#02111B', border: `${theme.borders?.width || '.15em'} ${theme.borders?.style || 'solid'} ${theme.window?.borderColor || '#6BF178'}`, padding: theme.spacing?.padding || '.5em', color: theme.titleBar?.textColor || '#6bf178', width: '150px' }}>
                      <h4 style={{ margin: '0 0 0.5em 0', borderBottom: `${theme.borders?.width || '.1em'} solid ${theme.window?.borderColor || '#6bf178'}`, paddingBottom: '0.5em' }}>Card Title</h4>
                      <p style={{ margin: 0, fontSize: '0.875em' }}>Card content here</p>
                    </div>
                  </DraggableComponent>
                )}
                {!openSection && <span style={{ color: '#6bf178', fontSize: '0.875em' }}>Select a section to preview</span>}
              </div>
            </div>
          )}

          {activeTab === 'canvas' && (
            <div style={{ width: '100%', height: 'calc(100% - 2em)', background: '#1a1a2e', position: 'relative', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!exampleAppOpen ? (
                <div onClick={handleExampleAppClick} style={{ cursor: 'pointer', padding: '1em', background: theme.window?.backgroundColor || 'rgba(2,17,27,.7)', border: `${theme.borders?.width || '.25em'} ${theme.borders?.style || 'double'} ${theme.window?.borderColor || '#6bf178'}`, borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em' }}>
                  <div style={{ width: '48px', height: '48px', background: theme.window?.borderColor || '#6bf178', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: theme.button?.primaryBg || '#02111B', fontSize: '24px' }}>📱</span>
                  </div>
                  <span style={{ color: theme.titleBar?.textColor || '#6bf178', fontSize: '0.875em' }}>Example App</span>
                </div>
              ) : null}

              {exampleAppOpen && (
                <BaseWindow id="example-app-canvas" device={{ width: '100%', height: '100%', deskSpace: { width: 9999, height: 9999 }, windows: [{ id: 'example-app-canvas', title: 'Example App', width: '400px', height: '500px', maximize: false, top: '10%', left: '1em', zIndex: 99999, prevWidth: '400px', prevHeight: '500px', prevTop: '10%', prevLeft: '1em' }] }} manipulateWindows={() => {}} styleSettings={theme}>
                  <div ref={exampleAppRef} className="example-app-inner" onDragOver={(e) => e.preventDefault()} onDrop={handleDropInWindow} style={{ width: '100%', height: '100%', padding: theme.spacing?.padding || '.5em', position: 'relative', overflow: 'auto' }}>
                    {droppedComponents.length === 0 && <span style={{ color: theme.titleBar?.textColor || '#6bf178', fontSize: '0.875em' }}>Drag components here</span>}
                    {droppedComponents.map((comp) => (
                      <Draggable key={comp.id} bounds=".example-app-inner" position={{ x: comp.x, y: comp.y }} onStop={(e, data) => setDroppedComponents(prev => prev.map(c => c.id === comp.id ? { ...c, x: data.x, y: data.y } : c))}>
                        <div style={{ position: 'absolute', cursor: 'grab' }}>
                          {renderComponentType(comp)}
                        </div>
                      </Draggable>
                    ))}
                  </div>
                </BaseWindow>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customizer;
