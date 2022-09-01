import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "store/store";
import {
  FailedReqMsg,
  PatientsResponse,
  RequestPatient,
  SinglePatientResponse,
  SuccessfulReqMsg,
} from "types/api.types";
import { axiosPrivateInstance } from "utils/axios/axios";
export interface initialPatientsDataValue extends Omit<PatientsResponse, "data"> {
  search: string;
  sortBy: string;
  sortDirection: "asc" | "desc";
  pageSize: number;
  currentPage: number;
  isLoading: boolean;
  isError: boolean;
  data: PatientsResponse["data"] | null;
}
export interface initialSinglePatientDataValue {
  isLoading: boolean;
  isError: boolean;
  data: SinglePatientResponse["data"] | null;
}
export interface editPatientValue extends RequestPatient {
  patientId: string;
}

const initialPatientsData: initialPatientsDataValue = {
  search: "",
  sortBy: "name",
  sortDirection: "desc",
  pageSize: 5,
  currentPage: 1,
  isLoading: false,
  isError: false,
  data: null,
  totalItems: 0,
};

const initialSinglePatientData: initialSinglePatientDataValue = {
  isLoading: false,
  isError: false,
  data: null,
};

export const getAllPatients = createAsyncThunk(
  "patients/getAllPatients",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;

    const { search, sortBy, sortDirection, pageSize, currentPage } = state.patients.allPatientsData;

    try {
      const res = await axiosPrivateInstance.get<PatientsResponse>("/patients", {
        params: {
          sortBy,
          sortDirection,
          pageSize,
          currentPage,
          ...(search && { search }),
        },
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message);
      return rejectWithValue(err);
    }
  }
);

export const getSinglePatient = createAsyncThunk(
  "patients/getSinglePatient",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosPrivateInstance.get<SinglePatientResponse>(`/patients/${id}`);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.message, {
        autoClose: false,
      });
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addNewPatient = createAsyncThunk(
  "patients/addPatient",
  async (values: RequestPatient) => {
    try {
      const res = await axiosPrivateInstance.post<SuccessfulReqMsg>("/patients", values);
      toast.success(res.data.message);
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message);
    }
  }
);
export const editPatient = createAsyncThunk(
  "patients/editPatient",
  async (values: editPatientValue, thunkAPI) => {
    try {
      const res = await axiosPrivateInstance.patch<SuccessfulReqMsg>(
        `/patients/${values.patientId}`,
        values
      );
      thunkAPI.dispatch(getSinglePatient(values.patientId));
      toast.success(res.data.message);
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message);
    }
  }
);
export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (id: string, thunkAPI) => {
    try {
      const res = await axiosPrivateInstance.delete<SuccessfulReqMsg>(`/patients/${id}`);
      thunkAPI.dispatch(getAllPatients());
      toast.success(res.data.message);
    } catch (error) {
      const err = error as AxiosError<FailedReqMsg>;
      toast.error(err.response?.data.message);
    }
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    allPatientsData: initialPatientsData,
    singlePatientData: initialSinglePatientData,
  },
  reducers: {
    changeAllPatientsSort: (
      state,
      { payload }: PayloadAction<{ sortingProperty: string; sortingDirection: "asc" | "desc" }>
    ) => {
      state.allPatientsData.sortBy = payload.sortingProperty;
      state.allPatientsData.sortDirection = payload.sortingDirection;
    },
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.allPatientsData.currentPage = payload;
    },
    changeRowsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.allPatientsData.pageSize = payload;
      state.allPatientsData.currentPage = 1;
    },
    changeSearch: (state, { payload }: PayloadAction<string>) => {
      state.allPatientsData.search = payload;
      state.allPatientsData.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPatients.pending, (state) => {
      state.allPatientsData.isLoading = true;
      state.allPatientsData.isError = false;
    });
    builder.addCase(getAllPatients.fulfilled, (state, { payload }) => {
      state.allPatientsData.data = payload.data;
      state.allPatientsData.totalItems = payload.totalItems;
      state.allPatientsData.isLoading = false;
    });
    builder.addCase(getAllPatients.rejected, (state) => {
      state.allPatientsData.isLoading = false;
      state.allPatientsData.isError = true;
    });
    builder.addCase(getSinglePatient.pending, (state) => {
      state.singlePatientData.isLoading = true;
      state.singlePatientData.isError = false;
    });
    builder.addCase(getSinglePatient.fulfilled, (state, { payload }) => {
      state.singlePatientData.isLoading = false;
      state.singlePatientData.data = payload.data;
    });
    builder.addCase(getSinglePatient.rejected, (state) => {
      state.singlePatientData.isLoading = false;
      state.singlePatientData.isError = true;
    });
  },
});

export const patientsActions = patientsSlice.actions;
export default patientsSlice.reducer;
