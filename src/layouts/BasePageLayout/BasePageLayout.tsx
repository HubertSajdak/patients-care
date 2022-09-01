import { Container } from "@mui/material";
import { LogoContainerWrapper, Wrapper } from "layouts/BasePageLayout/BasePageLayout.styled";
import LangSwitcher from "components/LangSwitcher/LangSwitcher";
export interface BasePageLayoutProps {
  children: React.ReactNode;
  img: React.ReactNode;
}
const BasePageLayout = ({ children, img }: BasePageLayoutProps) => {
  return (
    <Wrapper>
      <LangSwitcher variant="standalone" />
      <LogoContainerWrapper>{img}</LogoContainerWrapper>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Container>
    </Wrapper>
  );
};

export default BasePageLayout;
