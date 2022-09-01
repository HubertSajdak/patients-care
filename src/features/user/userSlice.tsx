import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "utils/axios/axios";
import {
  FailedReqMsg,
  RequestRenewPassword,
  RequestUpdateUser,
  SuccessfulReqMsg,
  UserProfile,
} from "types/api.types";
import { AxiosError } from "axios";

const initialUserState: UserProfile = {
  name: "",
  surname: "",
  email: "",
  avatar: "",
};

export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (avatarUrl: FormData, { dispatch, fulfillWithValue }) => {
    try {
      const res = await axiosPrivateInstance.put<SuccessfulReqMsg>("/users/me/avatar", avatarUrl);
      dispatch(getUserData());
      fulfillWithValue(res);
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message);
    }
  }
);

export const deleteUserAvatar = createAsyncThunk("avatar/deleteUserAvatar", async (_, thunkAPI) => {
  try {
    const res = await axiosPrivateInstance.delete<SuccessfulReqMsg>("/users/me/avatar");
    toast.success(res.data.message);
    thunkAPI.dispatch(getUserData());
  } catch (error) {
    const err = error as AxiosError<FailedReqMsg>;
    toast.error(err.response?.data.message);
  }
});

export const getUserData = createAsyncThunk("user/getUserData", async (_, thunkAPI) => {
  try {
    const res = await axiosPrivateInstance.get<UserProfile>("/users/me");
    if (res.data.avatar !== "") {
      return { ...res.data, avatar: process.env.REACT_APP_API_KEY! + res.data.avatar };
    }
    return res.data;
  } catch (error) {
    const err = error as AxiosError<FailedReqMsg>;
    toast.error(err.response?.data.message);
    return thunkAPI.rejectWithValue(err.response?.data.message);
  }
});

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (values: RequestUpdateUser, { dispatch }) => {
    try {
      const res = await axiosPrivateInstance.put<SuccessfulReqMsg>("/users/me", values);
      console.log(res);
      toast.success(res.data.message);
      dispatch(getUserData());
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.message);
    }
  }
);
export const updateUserPassword = async (values: RequestRenewPassword) => {
  try {
    const res = await axiosPrivateInstance.put<SuccessfulReqMsg>(
      "/users/me/update-password",
      values
    );
    toast.success(res.data.message);
  } catch (error) {
    const err = error as AxiosError<FailedReqMsg>;
    toast.error(err.response?.data.message, {
      autoClose: false,
    });
  }
};

export const deleteAccount = async () => {
  try {
    const res = await axiosPrivateInstance.delete<SuccessfulReqMsg>("/users/me/delete");
    toast.success(res.data.message);
  } catch (error) {
    const err = error as AxiosError<FailedReqMsg>;
    toast.error(err.response?.data.message, {
      autoClose: false,
    });
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (_, { payload }) => {
      return { ...payload };
    });
  },
});

export default userSlice.reducer;
