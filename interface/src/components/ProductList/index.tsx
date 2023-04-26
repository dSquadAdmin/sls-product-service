import React, { useEffect } from 'react';
import { IProduct, IProductResponse } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../api';
import { saveProducts } from '../../reducers/product';
import { AppState } from '../../store';
import Product from '../Product';

import './index.css'

const ProductList = () => {
    const dispatch = useDispatch();
    const { data, loading: prodLoading } = useSelector((state: AppState) => state.product );
    const { auth: {authToken: token}, loading: authLoading} = useSelector((state: AppState) => state.auth );

    useEffect(() => {
        getProducts({page: 1, perPage: 10}).then((res)=>{
        dispatch(saveProducts(res as IProductResponse))
        })
    }, [dispatch]);

    return (
       <div>
            <div>
                Add Product
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
                {data.map(prod=>{
                    const props = {...prod, token };
                    return (
                        <Product { ...props } />
                    )
                })}
            </div>
       </div>
    );
};

export default ProductList;
