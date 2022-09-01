import BasePageLayout from "layouts/BasePageLayout/BasePageLayout";
import { ReactComponent as Logo } from "images/logo.svg";
import { ReactComponent as NotFound } from "images/not-found.svg";
import { ReactComponent as NotFound2 } from "images/not-found4.svg";
import { ReactComponent as NotFound3 } from "images/not-found3.svg";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import useDocumentTitle from "common/useDocumentTitle";
const NotFoundPage = () => {
  const { t } = useTranslation("common");
  useDocumentTitle("404");
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCoords({
      x:
        (e.clientX - (containerRef.current?.offsetLeft! + containerRef.current?.offsetWidth! / 2)) /
        -250,
      y: e.clientY / -250,
    });
  };

  return (
    <BasePageLayout img={<Logo width="100%" />}>
      <div
        onMouseMove={handleMouseMove}
        ref={containerRef}
        style={{ display: "flex", flexDirection: "column", width: "100%", overflow: "hidden" }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "150px", sm: "200px", md: "400px" },
          }}
        >
          <Box
            position="absolute"
            width="100%"
            sx={{ height: { xs: "140px", sm: "180px", md: "380px" } }}
          >
            <NotFound
              width="100%"
              height="100%"
              style={{
                transform: `translateX(${coords.x * 5}px) translateY(${coords.y * 5}px)`,
              }}
            />
          </Box>
          <Box
            position="absolute"
            top="15%"
            left="10%"
            width="200px"
            sx={{
              display: { xs: "none", md: "block" },
              width: { sm: "150px", md: "200px" },
            }}
          >
            <NotFound2
              width="100%"
              height="100%"
              style={{
                transform: `translateX(${coords.x * 12}px) translateY(${coords.y * 12}px)`,
              }}
            />
          </Box>
          <Box
            position="absolute"
            top="10%"
            right="10%"
            width="200px"
            sx={{
              display: { xs: "none", md: "block" },
              width: { sm: "150px", md: "200px" },
            }}
          >
            <NotFound3
              width="100%"
              height="100%"
              style={{
                transform: `translateX(${coords.x * 12}px) translateY(${coords.y * 12}px)`,
              }}
            />
          </Box>
        </Box>
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <Typography
            component="p"
            mt={2}
            textAlign="center"
            sx={{ typography: { xs: "h4", sm: "h3", md: "h2" } }}
          >
            OOPS...
          </Typography>
          <Typography
            component="p"
            mt={1}
            textAlign="center"
            sx={{ typography: { xs: "h5", sm: "h4", md: "h3" } }}
          >
            {t("notFoundPage.text")}
          </Typography>
        </div>
        <Link
          to="/"
          style={{
            display: "block",
            margin: "1rem auto",
            textTransform: "uppercase",
            color: `${theme.palette.primary.main}`,
            fontWeight: "bold",
          }}
        >
          {t("notFoundPage.returnButton")}
        </Link>
      </div>
    </BasePageLayout>
  );
};

export default NotFoundPage;
