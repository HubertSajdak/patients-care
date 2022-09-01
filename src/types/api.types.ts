export interface SuccessfulReqMsg {
  message: string;
}
export interface RequestRegisterCredentials {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatedPassword: string;
}
export interface RequestLoginCredentials {
  email: string;
  password: string;
}
export interface RequestUpdateUser {
  name: string;
  surname: string;
  email: string;
}
export interface RequestRemindPasswordCredentials {
  email: string;
}
export interface RequestRenewPassword {
  password: string;
  repeatedPassword: string;
}
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export interface UserProfile {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
}
export interface FailedReqMsg {
  message: string;
  error?: any;
}
export interface Avatar {
  avatarUrl: string;
}
export interface RequestPatient {
  name: string;
  surname: string;
  phoneNumber: number;
  address: {
    state: string;
    city: string;
    avenue: string;
  };
}
export interface AddressExtended {
  state: string;
  city: string;
  avenue: string;
  _id: string;
}
export interface PhotoExtended {
  originalName: string;
  url: string;
  filename: string;
  _id: string;
}
export interface PatientsResponse {
  data: {
    _id: string;
    name: string;
    surname: string;
    phoneNumber: number;
    address: AddressExtended;
    photos: PhotoExtended[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  totalItems: number;
}

export interface SinglePatientResponse {
  data: {
    _id: string;
    name: string;
    surname: string;
    phoneNumber: string;
    address: AddressExtended;
    photos: PhotoExtended[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
