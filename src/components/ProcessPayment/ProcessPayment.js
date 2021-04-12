import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from '../CardForm/CardForm';

const stripePromise = loadStripe('pk_test_51IfES5EJ8iiyMKgnloi1vatBYeQlweA2MaHSglkjr1XMkGh8XuY3VFNkAlWscwbKrhqUunkECxdUlZYNRILgkEuy00PpLoZStc');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <CardForm handlePayment={handlePayment}/>
        </Elements>
    );
};

export default ProcessPayment;