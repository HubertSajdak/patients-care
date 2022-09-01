import { useState } from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconProps,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { AccordionLinkWrapper, BaseLinkWrapper } from "./SidebarItem.styled";

export interface SidebarLinkBase {
  variant: "base";
  /**
   * Use "t" from "useTranslation" hook and pass the text to be displayed inside sidebar link.
   * 
   * @example
   * 
   *     {
      variant: "submenu",
      id: 5,
      text: t("sidebar.appointment"),
      icon: <BookIcon />,
      sublinks: [
        {
          id: 6,
          text: t("sidebar.makeAppointment"),
          path: "/makeAppointment",
          subIcon: <BookmarkAddIcon />,
        },
      ],
    },
   */
  text: string;
  path: string;
  icon: IconProps;
}
export interface SidebarLinkWithSublinks {
  variant: "submenu";
  /**
   * Use "t" from "useTranslation" hook and pass the text to be displayed inside sidebar link.
   * 
   * @example
   * 
   *     {
      variant: "submenu",
      id: 5,
      text: t("sidebar.appointment"),
      icon: <BookIcon />,
      sublinks: [
        {
          id: 6,
          text: t("sidebar.makeAppointment"),
          path: "/makeAppointment",
          subIcon: <BookmarkAddIcon />,
        },
      ],
    },
   */
  text: string;
  icon: IconProps;
  sublinks: {
    /**
   * Use "t" from "useTranslation" hook and pass the text to be displayed inside sidebar link.
   * 
   * @example
   * 
   *     {
      variant: "submenu",
      id: 5,
      text: t("sidebar.appointment"),
      icon: <BookIcon />,
      sublinks: [
        {
          id: 6,
          text: t("sidebar.makeAppointment"),
          path: "/makeAppointment",
          subIcon: <BookmarkAddIcon />,
        },
      ],
    },
   */
    text: string;
    path: string;
    subIcon: IconProps;
  }[];
}
export type SidebarLinksProps = SidebarLinkBase | SidebarLinkWithSublinks;

const SidebarItem = (props: SidebarLinksProps) => {
  const location = useLocation();

  const isExpandedByDefault =
    props.variant === "submenu"
      ? props.sublinks.some((link) => location.pathname.includes(link.path))
      : false;

  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  return props.variant === "submenu" ? (
    <AccordionLinkWrapper>
      <MuiAccordion
        sx={{ boxShadow: "none", whiteSpace: "nowrap", textTransform: "capitalize" }}
        expanded={isExpanded}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ padding: "0 16px" }}
        >
          <Typography className="title" variant="body1">
            <>
              {props.icon}
              {props.text}
            </>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ width: "100%", padding: "0 0 0 8px" }}>
          {props.sublinks.map((sublink) => {
            return (
              <NavLink key={sublink.text} to={sublink.path} className="nav-link">
                <>
                  {sublink.subIcon}
                  {sublink.text}
                </>
              </NavLink>
            );
          })}
        </AccordionDetails>
      </MuiAccordion>
    </AccordionLinkWrapper>
  ) : (
    <BaseLinkWrapper>
      <NavLink key={props.text} to={props.path} className="nav-link">
        <>
          {props.icon}
          {props.text}
        </>
      </NavLink>
    </BaseLinkWrapper>
  );
};

export default SidebarItem;
