import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userSlice from "features/user/userSlice";
import authSlice from "features/auth/authSlice";
import patientsSlice from "features/patients/patientsSlice";
export const store = configureStore({
  reducer: { user: userSlice, auth: authSlice, patients: patientsSlice },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
