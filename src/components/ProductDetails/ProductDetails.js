import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        fetch('https://desolate-citadel-78188.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])
   
    return (
        <div>
            <h1>{productKey} Details Coming soon...</h1>
            <Product showBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;