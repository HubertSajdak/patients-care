import styled from "styled-components";

export const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 24;
  padding: 1rem;
  border-top: 0.5rem solid;
  border-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px 8px 0px 0px;
`;
