import { Drawer } from "@mui/material";
import styled, { css } from "styled-components";
export const Wrapper = styled.div<{ isActive?: boolean }>`
  min-height: 100vh;
  margin: 0 -285px;
  transition: all 0.3s ease-in-out;
  ${({ isActive }) =>
    isActive &&
    css`
      margin: 0 0;
    `}
`;
export const DesktopSidebarWrapper = styled.aside`
  position: static;
  display: none;
  background-color: ${({ theme }) => theme.palette.common.white};
  box-shadow: ${({ theme }) => theme.shadows[3]};
  z-index: 200;

  @media (min-width: 900px) {
    display: flex;
  }
`;
export const MobileSidebarWrapper = styled(Drawer)`
  display: block;

  @media (min-width: 900px) {
    display: none;
  }
`;
export const LogoContainerWrapper = styled.div`
  display: grid;
  place-items: center;
  margin: 0 auto;
`;
