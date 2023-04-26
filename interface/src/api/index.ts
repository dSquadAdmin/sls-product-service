import axios from 'axios';
import { IProduct, IProductResponse } from "../types";
import { baseUrl } from './url';

export const getProducts = async (payload: {fromIndex: number, limit: number}, apiKey: string) => {
    const {fromIndex, limit} = payload;
    return await axios.get<IProductResponse>(`${baseUrl}/products?fromIndex=${fromIndex}&limit=${limit}`, {headers: {"Authorization": apiKey}});
};

export const saveProduct = async (payload: IProduct, apiKey: string) => {
    return await axios.post(`${baseUrl}/products`, payload, {headers: {"Authorization": apiKey}});
};

export const deleteProduct = async (payload: {id: string}, apiKey: string) => {
    return await axios.delete(`${baseUrl}/products/${payload.id}`, {headers: {"Authorization": apiKey}});
};
