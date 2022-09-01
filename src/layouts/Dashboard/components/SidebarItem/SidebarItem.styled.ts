import styled from "styled-components";

export const AccordionLinkWrapper = styled.div`
  width: 100%;

  .title {
    display: flex;
    gap: 0.5rem;
    color: ${({ theme }) => theme.palette.grey[700]};
  }
  .nav-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    width: 100%;
    padding: 12px 1rem;
    color: ${({ theme }) => theme.palette.grey[700]};
    text-transform: capitalize;
    transition: all 0.3s;
  }
  .nav-link:hover {
    color: ${({ theme }) => theme.palette.grey[900]};
    background-color: ${({ theme }) => theme.palette.grey[200]};
    padding-left: 1.2rem;
    border-radius: ${({ theme }) => theme.border.borderRadius};
  }

  .active {
    position: relative;
    color: ${({ theme }) => theme.palette.primary.main};
    padding-left: 1.4rem;
    transition: 0.3s;
  }
  .active:hover {
    padding-left: 1.6rem;
  }
`;
export const BaseLinkWrapper = styled.div`
  .nav-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    width: 100%;
    padding: 12px 1rem;
    color: ${({ theme }) => theme.palette.grey[700]};
    text-transform: capitalize;
    transition: all 0.3s;
  }
  .nav-link:hover {
    color: ${({ theme }) => theme.palette.grey[900]};
    background-color: ${({ theme }) => theme.palette.grey[200]};
    padding-left: 1.2rem;
    border-radius: ${({ theme }) => theme.border.borderRadius};
  }
  .active {
    position: relative;
    color: ${({ theme }) => theme.palette.primary.main};
    padding-left: 1.4rem;
    transition: 0.3s;
  }

  .active:hover {
    padding-left: 1.6rem;
  }
`;
