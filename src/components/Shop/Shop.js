import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState([]);
    const [card, setCard] = useState([]);

    useEffect(() => {
        fetch('https://desolate-citadel-78188.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [])

    useEffect(() => {
        const savedCard = getDatabaseCart();
        const productKeys = Object.keys(savedCard);
        fetch('https://desolate-citadel-78188.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCard(data));
    }, []);

    const handelAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = card.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCard;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = card.filter(pd => pd.key !== toBeAddedKey);
            newCard = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCard = [...card, product]
        }

        setCard(newCard);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="twin-container">

            <div className="product-container">

                {
                    products.map(pd => <Product
                        key={pd.key}
                        showBtn={true}
                        handelAddProduct={handelAddProduct}
                        product={pd}>
                    </Product>)
                }

            </div>

            <div className="card-container">
                <Card card={card}>
                    <Link to="/review"> <button className="main-btn">Review Order</button></Link>
                </Card>
            </div>
        </div>
    );
};

export default Shop;