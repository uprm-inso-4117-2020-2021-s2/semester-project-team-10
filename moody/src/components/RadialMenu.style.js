import { css } from 'styled-components';

export const container = css`
  border: 20px solid #8FB0AF;
`;

export const center = css`
  background: #eee3ef;
  &:not(:empty):hover {
    cursor: pointer;
  }
  > svg {
    position: relative;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
  }
`;

export const slice = css`
  cursor: pointer;
  color: #8FB0AF;
  background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, white ${centerRadius}`});
  &[filled=true] {
    color: black;
  }
  &:hover,
  &[active=true] {
    color: white;
    background: radial-gradient(transparent ${({ centerRadius }) => `${centerRadius}, #eee3ef ${centerRadius}`});
  }
`; 