import React from 'react';
// import { Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
    const card = props.card;
    // const total = card.reduce( (total, prd) => total + prd.price, 0);

    let total = 0;
    for (let i = 0; i < card.length; i++) {
        const product = card[i];
        total = total + product.price * product.quantity || 1;
        debugger
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    const tax = (total / 10).toFixed(2); 
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    // const formatNumber = num =>{
    //     const precision = num.toFixed(2);
    //     return Number(precision);
    // } 
    
    return (
        <div className="product-card">
            <h4>Order Summary</h4>
            <h5>Items Ordered: {card.length}</h5>
            <h5>Product Price: {total}</h5>
            <h5><small>Shipping Cost: {shipping}</small></h5>
            <h5><small>Tax + vat: {tax}</small></h5>
            <h4>Total Price: {grandTotal}</h4>

                {
                    props.children
                }
        </div>
    );
};

export default Card;