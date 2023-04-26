import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductResponse, IProductsState } from "../types";

const initialState: IProductsState = {
    data: [],
    perPage: 10,
    page: 1,
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
            const {products: data, page, perPage, total } = action.payload
            state.data = data
            state.page = page
            state.perPage = perPage
            state.total = total
            state.loading = false
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            const products = state.data.filter(p=>p.id !== action.payload);
            state.data = products;
            state.loading = false;
            state.total -= 1;
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
