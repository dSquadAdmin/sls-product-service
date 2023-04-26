import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../types";

const initialState: IAuthState = {
  authToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserAuth: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    logOut: (state) => {
      state.authToken = "";
    },
  },
});

export const { saveUserAuth, logOut } = authSlice.actions;
export default authSlice;
