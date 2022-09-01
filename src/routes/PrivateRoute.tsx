import { useEffect, useRef } from "react";
import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
import { decodeToken } from "react-jwt";
import {
  getTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "utils/localStorage/localStorage";
import { toast } from "react-toastify";
import { refreshAccessToken, logoutUser } from "features/auth/authSlice";
import { AxiosError } from "axios";
import { FailedReqMsg } from "types/api.types";
import { useTranslation } from "react-i18next";
import UserDataWrapper from "wrappers/UserDataWrapper";
export interface DecodedToken {
  accessToken: {
    _id: string;
    role: string;
    iat: number;
    exp: number;
  };
  refreshToken: {
    _id: string;
    iat: number;
    exp: number;
  };
}

const PrivateRoute = () => {
  const { t } = useTranslation("loginPage");
  const accessToken = getTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTime = new Date().getTime();
  const decodedAccessToken = decodeToken<DecodedToken["accessToken"]>(accessToken!);
  const decodedRefreshToken = decodeToken<DecodedToken["refreshToken"]>(refreshToken!);
  const tokensExpired = useRef(false);
  
  useEffect(() => {
    if (tokensExpired.current === true) return;
    if (decodedAccessToken && currentTime / 1000 > decodedAccessToken.exp) {
      const updateAccessToken = async () => {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          setTokenToLocalStorage(newAccessToken);
        } catch (error) {
          const err = error as AxiosError<FailedReqMsg>;
          const logoutUserAndRedirect = async () => {
            await logoutUser();
            navigate("/login", { state: location.pathname });
          };
          logoutUserAndRedirect();
          toast.error(err.response?.data.message, {
            autoClose: false,
          });
        }
      };
      updateAccessToken();
    }
  }, [navigate, accessToken, refreshToken, location.pathname, currentTime, decodedAccessToken]);

  if (
    decodedAccessToken &&
    currentTime / 1000 > decodedAccessToken.exp &&
    decodedRefreshToken &&
    currentTime / 1000 > decodedRefreshToken.exp
  ) {
    tokensExpired.current = true;
    const logoutUserAndRedirect = async () => {
      await logoutUser();
      navigate("/login", { state: location.pathname });
    };
    logoutUserAndRedirect();
    toast.error(t("logoutNotification"), {
      autoClose: false,
    });
  }
  return (
    <>
      {accessToken && refreshToken ? (
        <UserDataWrapper>
          <Outlet />
        </UserDataWrapper>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
