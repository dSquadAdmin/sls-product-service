import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../types";

const token = sessionStorage.getItem("token") as string;

const initialState: IAuthState = {
  authToken: (token === null || token === undefined)? "" : token
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserAuth: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      sessionStorage.setItem("token", action.payload);
    },
    logOut: (state) => {
      state.authToken = "";
      sessionStorage.clear();
    },
  },
});

export const { saveUserAuth, logOut } = authSlice.actions;
export default authSlice;
