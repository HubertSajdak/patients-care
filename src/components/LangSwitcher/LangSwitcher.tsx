import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import FlagWrapper from "./FlagWrapper";
import { availableLangs } from "i18n/AvailableLangs";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import TranslateIcon from "@mui/icons-material/Translate";

const Wrapper = styled.div<{ variant: "link" | "standalone" }>`
  position: relative;
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 200px;
  ${({ variant }) =>
    variant === "link"
      ? css`
          #long-button {
            width: 100%;
            border-radius: 0;
            gap: 1;
            padding: 8px 16px;
            text-align: center;
          }
        `
      : css`
          #long-button {
            position: fixed;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem;
            box-shadow: ${({ theme }) => theme.shadows[2]};
            background: ${({ theme }) => theme.palette.common.white};
            z-index: 10;
          }
        `}
`;

const LangSwitcher = ({ variant }: { variant: "link" | "standalone" }) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Wrapper variant={variant}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ textAlign: "center" }}
      >
        <TranslateIcon color="primary" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {availableLangs.map((lang) => (
          <MenuItem key={lang.lang} onClick={handleClose} sx={{ padding: "0", width: "100%" }}>
            <FlagWrapper
              src={lang.iconUrl}
              alt={lang.lang}
              onClick={() => i18n.changeLanguage(lang.lang)}
            />
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  );
};

export default LangSwitcher;
