const PATIENTS_CARE_APP_ACCESS_TOKEN = "patients-care-access-token";
const PATIENTS_CARE_APP_REFRESH_TOKEN = "patients-care-refresh-token";
export const setTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem(PATIENTS_CARE_APP_ACCESS_TOKEN, JSON.stringify(accessToken));
};
export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem(PATIENTS_CARE_APP_REFRESH_TOKEN, JSON.stringify(refreshToken));
};
export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem(PATIENTS_CARE_APP_ACCESS_TOKEN);
  const token: string = result ? JSON.parse(result) : "";
  return token;
};
export const getRefreshTokenFromLocalStorage = () => {
  const result = localStorage.getItem(PATIENTS_CARE_APP_REFRESH_TOKEN);
  const token: string = result ? JSON.parse(result) : "";
  return token;
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(PATIENTS_CARE_APP_ACCESS_TOKEN);
};
export const removeRefreshTokenFromLocalStorage = () => {
  localStorage.removeItem(PATIENTS_CARE_APP_REFRESH_TOKEN);
};
