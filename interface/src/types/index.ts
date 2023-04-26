export interface IAuthRequest {
    userName: string;
    password: string;
}

export interface IAuth {
    authToken: string;
}

export interface IAuthState  {
    auth: IAuth;
    loading: boolean;
}

export interface IProductRequest {
    page: number;
    perPage: number;
}

export interface IProductResponse {
    products: Array<IProduct>;
    page: number;
    perPage: number;
    total: number;
}

export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

export interface IProductsState {
    data: Array<IProduct>;
    fromIndex: number;
    limit: number;
    total: number;
    loading: boolean;
}