import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FailedReqMsg, RequestLoginCredentials, RequestRegisterCredentials } from "types/api.types";
import { axiosInstance } from "utils/axios/axios";
import {
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setRefreshTokenToLocalStorage,
  setTokenToLocalStorage,
} from "utils/localStorage/localStorage";
import { Tokens } from "types/api.types";

export interface RegistrationInitialValues {
  isRegistrationSuccessful: boolean;
}

const registrationInitialValues: RegistrationInitialValues = {
  isRegistrationSuccessful: false,
};

export const refreshAccessToken = async (refreshToken: Tokens["refreshToken"]) => {
  const res = await axiosInstance.post("/cms/refresh-token", {
    refreshToken,
  });
  return res.data.accessToken;
};

export const logoutUserFromServer = async (
  accessToken: Tokens["accessToken"],
  refreshToken: Tokens["refreshToken"]
) => {
  const res = await axiosInstance.post("/cms/logout", {
    accessToken,
    refreshToken,
  });
  return res;
};
export const logoutUser = async () => {
  try {
    const accessToken = getTokenFromLocalStorage();
    const refreshToken = getRefreshTokenFromLocalStorage();
    const res = await logoutUserFromServer(accessToken, refreshToken);
    removeTokenFromLocalStorage();
    removeRefreshTokenFromLocalStorage();
    toast.success(res.data.message);
  } catch (error) {
    const err = error as AxiosError<FailedReqMsg>;
    toast.error(err.response?.config.data.message);
  }
};
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values: RequestRegisterCredentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/cms/register", {
        ...values,
      });
      toast.success(res.data.message);

      return res.data;
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message, {
        autoClose: false,
      });
      thunkAPI.rejectWithValue(err.response?.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values: RequestLoginCredentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/cms/login", values);
      setTokenToLocalStorage(res.data.accessToken);
      setRefreshTokenToLocalStorage(res.data.refreshToken);
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message);
      thunkAPI.rejectWithValue(err.response?.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: registrationInitialValues,
  reducers: {
    resetRegistrationState(state) {
      state.isRegistrationSuccessful = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isRegistrationSuccessful = true;
    });
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
