import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  width: 100%;
  min-height: 100vh;
`;
export const LogoContainerWrapper = styled.div`
  display: grid;
  place-items: center;
  max-width: 20rem;
  margin: 1rem auto;
  padding: 0 2rem;
`;
