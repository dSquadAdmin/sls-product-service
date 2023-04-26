import React from 'react';
import { IProduct } from '../../types';

interface IProdProps extends IProduct {
    token: string;
}
const Product = (props: IProdProps) => {
    const {
        id,
        name,
        description,
        price
    } = props;
    return ( 
     <>
        <div className="w-full max-w-sm bg-white border rounded-lg bg-gray-100 shadow border-gray-300">
            <a href="#">
                <img className="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-black ">{name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 text-gray-400">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-black">$ {price}</span>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                </div>
            </div>
        </div>
     </>
        
    );
};

export default Product;
