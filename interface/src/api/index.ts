import { IProduct, IProductResponse } from "../types";

const PROD_DATA: IProductResponse = {
    page: 1,
    perPage: 10,
    products: [1,2,3,4,5,6,7,8,9,10].map(i => ({
               id: `item-id-${i}`,
               name: `name ${i}`,
               description: `description ${i} lorem
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                ipsum dollor lorem ipsum dollar lorem ipsum dollar
                `,
               imageUrl: `https://example.com/img/${i}`, 
               price: 2.5*i
    })),
    total: 10
}

export const getProducts = (payload: {page: number, perPage: number}) => {
    return new Promise((resolve, reject) => {
        resolve(PROD_DATA);
    });
};

export const saveProduct = (payload: IProduct) => {
    return new Promise((resolve, reject) => {
        resolve(payload);
    });
};

export const updateProduct = (payload: IProduct) => {
    return new Promise((resolve, reject) => {
        resolve(payload);
    });
};

export const deleteProduct = (payload: IProduct) => {
    return new Promise((resolve, reject) => {
        resolve("");
    });
};
