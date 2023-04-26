export interface IAuthRequest {
    userName: string;
    password: string;
}

export interface IAuthState {
    authToken: string;
}

export interface IProductResponse {
    data: {
        products: Array<IProduct>;
    },
    fromIndex: number;
    limit: number;
}

export interface IProduct {
    id: number;
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