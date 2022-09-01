import { Typography } from "@mui/material";
import styled from "styled-components";
export interface FlagWrapperProps {
  src: string;
  alt: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  cursor: pointer;
  img {
    width: 100%;
    max-width: 30px;
    transition: transform 0.2s;
  }
`;

const FlagWrapper = ({ onClick, src, alt }: FlagWrapperProps) => {
  return (
    <Wrapper onClick={onClick}>
      <img src={src} alt={alt} />
      <Typography sx={{ textTransform: "uppercase", fontWeight: "bold", color: "#486581" }}>
        {alt}
      </Typography>
    </Wrapper>
  );
};

export default FlagWrapper;
