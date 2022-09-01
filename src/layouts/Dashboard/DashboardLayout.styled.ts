import styled from "styled-components";

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.palette.grey[200]};
  min-height: 100vh;
  .dashboard {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  @media (max-width: 900px) {
    .dashboard {
      grid-template-columns: 1fr;
    }
  }
`;
