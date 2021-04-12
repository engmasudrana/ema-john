import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [shippingData, setShippingData] = useState(null);

    const onSubmit = data => {
        setShippingData(data)
    };

    const handlePaymentSuccess = paymentId => {
       
        const savedCard = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCard,
            shipment: shippingData,
            paymentId,
            orderTime: new Date()
        }

        fetch('https://desolate-citadel-78188.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('your placed successfully')
                }
            })

    }

    console.log(watch("example"));

    return (

        <div className="row">
            <div style={{display: shippingData ? 'none': 'block'}} className="col-md-6">
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                    <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="name" />
                    {errors.name && <span className="error">name is required</span>}

                    <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="email" />
                    {errors.email && <span className="error">email is required</span>}

                    <input name="address" ref={register({ required: true })} placeholder="address" />
                    {errors.address && <span className="error">address is required</span>}

                    <input name="phone" ref={register({ required: true })} placeholder="phone" />
                    {errors.phone && <span className="error">phone is required</span>}

                    <input type="submit" />
                </form>
            </div>

            <div style={{display: shippingData ? 'block': 'none'}} className="col-md-6">
                <h1>Please Pay for me</h1>
                <ProcessPayment  handlePayment={handlePaymentSuccess}/>
            </div>
        </div>

    );
};

export default Shipment;