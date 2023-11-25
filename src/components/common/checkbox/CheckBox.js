import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin: 0;
  margin-left: 8px;
  user-select: none;
  cursor: pointer;
  font-weight: normal;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: unset !important;
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px ;
  height: 20px;
  background: ${props => (props.checked ? 'var(--mainColor)' : '#fff')};
  border: 1px solid var(--mainColor);
  border-radius: 4px;
  transition: background 0.3s;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  svg {
    fill: none;
    stroke: white;
    stroke-width: 2px;
  }
`;

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        {checked && <svg viewBox="0 0 24 24" width="16" height="16">
          <polyline points="20 6 9 17 4 12" />
        </svg>}
      </StyledCheckbox>
      <Label>{label}</Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;