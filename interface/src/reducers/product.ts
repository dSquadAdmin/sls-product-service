import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductResponse, IProductsState } from "../types";

const initialState: IProductsState = {
    data: [],
    limit: 10,
    fromIndex: new Date().getTime(),
    loading: false,
    total: 0
};
  
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        loadingProducts: (state) =>  {
            state.loading = true;
        },
        loadedProducts: (state) => {
            state.loading = false;
        },
        saveProducts: (state, action: PayloadAction<IProductResponse>) => {
            const {data: { products }, fromIndex, limit } = action.payload
            state.data = products
            state.fromIndex = fromIndex
            state.limit = limit
            state.loading = false
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const products = state.data.filter(p=>p.id !== action.payload);
            state.data = products;
            state.loading = false;
        },
        saveProduct: (state, action: PayloadAction<IProduct>) => {
            const products = state.data.filter(p=>p.id !== action.payload.id);
            state.data = [...products, action.payload];
            state.loading = false;
        },
  
    },
});

export const { loadedProducts, loadingProducts, saveProducts, saveProduct, deleteProduct } = productSlice.actions;
export default productSlice
