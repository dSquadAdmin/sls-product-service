import axios from 'axios';
import { IProduct, IProductResponse } from "../types";
import { baseUrl } from './url';

export const getProducts = async (payload: {fromIndex: number, limit: number, forward: boolean}, apiKey: string) => {
    const {fromIndex, limit, forward} = payload;
    const url = `${baseUrl}/products?fromIndex=${fromIndex}&limit=${limit}&forward=${forward?"1":"0"}`
    return await axios.get<IProductResponse>(url, {headers: {"Authorization": apiKey}});
};

export const saveProduct = async (payload: IProduct, apiKey: string) => {
    return await axios.post(`${baseUrl}/products`, payload, {headers: {"Authorization": apiKey}});
};

export const deleteProduct = async (payload: {id: number}, apiKey: string) => {
    return await axios.delete(`${baseUrl}/products/${payload.id}`, {headers: {"Authorization": apiKey}});
};
