import styled from "styled-components";

export const CenteredLayout = styled.div<{fullsize?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.fullsize ? '100vw' : 'auto'};
  height: ${props => props.fullsize ? '100vh' : 'auto'};
`;