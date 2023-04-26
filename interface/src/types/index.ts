export interface IAuthRequest {
    userName: string;
    password: string;
}

export interface IAuthState {
    authToken: string;
}


export interface IProductRequest {
    page: number;
    perPage: number;
}

export interface IProductResponse {
    data: {
        products: Array<IProduct>;
    },
    fromIndex: number;
    limit: number;
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