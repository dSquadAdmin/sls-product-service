import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducers/auth'
import productSlice from '../reducers/product'

export const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      product: productSlice.reducer
    },
  })

  export type AppState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
