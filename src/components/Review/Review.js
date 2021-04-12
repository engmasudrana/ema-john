import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Card from '../Card/Card';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [card, setCard] = useState([]);

    const [orderPlace, setOrderPlace] = useState(false)

    const history = useHistory()

    const ProceedCheckout = () =>{
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCard = card.filter(pd => pd.key !== productKey);
        setCard(newCard)
        removeFromDatabaseCart(productKey);
    }

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
    }, [])

    let thankyou;
    if(orderPlace){
        thankyou = <img src={happyImg} alt=""/>
    } 

    return (
        <div className="twin-container">

            <div className="product-container">
                {
                    card.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div className="card-container">
                <Card card={card}>
                    <button onClick={ProceedCheckout} className="main-btn">Proceed Checkout</button>
                </Card>
            </div>
        </div>
    );
};

export default Review;