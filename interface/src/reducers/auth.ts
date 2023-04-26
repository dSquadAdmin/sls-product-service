import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAuth, IAuthState } from "../types";

const initialState: IAuthState = {
    auth : {
        authToken: "",
    },
    loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserAuth: (state, action: PayloadAction<IAuth>) => {   
        state.loading = true
        state.auth = action.payload
    },

    logIn: (state) => {
      state.loading = true;
    },

    logOut: (state) => {
      state = initialState;
    },

  },
})

export const { saveUserAuth, logIn, logOut } = authSlice.actions;
export default authSlice
