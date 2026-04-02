import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

const selectContainerStyle = (settings) => css`
  position: relative;
  display: inline-block;
`;

const StyledSelectContainer = styled.div`
  ${props => selectContainerStyle(props.styleSettings)}
`;

const SelectTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  width: ${props => props.width || '100%'};
  padding: ${props => props.theme?.spacing?.padding || '.5em'};
  background-color: ${props => props.theme?.button?.primaryBg || '#02111B'};
  border: ${props => props.theme?.borders?.width || '.15em'} ${props => props.theme?.borders?.style || 'solid'} ${props => props.theme?.window?.borderColor || '#6BF178'};
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  cursor: pointer;
  text-align: left;
  font-family: inherit;

  &:hover {
    border-color: ${props => props.theme?.window?.borderColor || '#6BF178'};
  }
`;

const SelectValue = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SelectArrow = styled.span`
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  font-size: 0.75em;
`;

const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25em;
  background-color: ${props => props.theme?.button?.primaryBg || '#02111B'};
  border: ${props => props.theme?.borders?.width || '.15em'} ${props => props.theme?.borders?.style || 'solid'} ${props => props.theme?.window?.borderColor || '#6BF178'};
  max-height: 200px;
  overflow-y: auto;
  z-index: 9999;

  &::before {
    content: '';
    position: absolute;
    top: -${props => props.theme?.borders?.width || '.15em'};
    left: 0;
    right: 0;
    height: ${props => props.theme?.borders?.width || '.15em'};
    background-color: ${props => props.theme?.button?.primaryBg || '#02111B'};
  }
`;

const SelectOption = styled.button`
  display: block;
  width: 100%;
  padding: ${props => props.theme?.spacing?.padding || '.5em'};
  background: transparent;
  border: none;
  border-bottom: ${props => props.theme?.borders?.width || '.05em'} solid rgba(107, 241, 120, 0.2);
  color: ${props => props.theme?.titleBar?.textColor || '#6bf178'};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: rgba(107, 241, 120, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }

  &.selected {
    background-color: ${props => props.theme?.window?.borderColor || '#6BF178'};
    color: ${props => props.theme?.button?.primaryBg || '#02111B'};
  }
`;

const Select = ({ value, onChange, options, label, placeholder = 'Select...', width, styleSettings, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <StyledSelectContainer 
      className={`ftrst select ${className || ''}`}
      ref={containerRef}
      theme={styleSettings}
      styleSettings={styleSettings}
    >
      {label && (
        <label 
          className="ftrst select-label"
          style={{ display: 'block', marginBottom: '0.25em', color: styleSettings?.titleBar?.textColor || '#6bf178' }}
        >
          {label}
        </label>
      )}
      <SelectTrigger 
        className="ftrst select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        theme={styleSettings}
        width={width}
      >
        <SelectValue theme={styleSettings}>
          {selectedOption?.label || placeholder}
        </SelectValue>
        <SelectArrow theme={styleSettings}>{isOpen ? '▲' : '▼'}</SelectArrow>
      </SelectTrigger>
      
      {isOpen && (
        <SelectDropdown 
          className="ftrst select-dropdown"
          theme={styleSettings}
        >
          {options.map((option) => (
            <SelectOption
              key={option.value}
              className={`ftrst-select-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              theme={styleSettings}
            >
              {option.label}
            </SelectOption>
          ))}
        </SelectDropdown>
      )}
    </StyledSelectContainer>
  );
};

export default Select;
