import React from 'react';


const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const style={
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '150px'
    }
    return (
        <div style={style} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <button onClick={() =>props.removeProduct(key)} className="main-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;