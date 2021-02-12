import React from 'react';
import '../PaymentPage/payment.scss';
import StripeCheckout from 'react-stripe-checkout';


function Payment() {

    function handleToken(token, addresses) {
        console.log({token, addresses})
    }


    return (
            <section className="payment">
                <form className="payment__form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"/>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"/>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"/>
                    <input
                        type="text"
                        name="postal"
                        placeholder="Postal Code"/>
                    <StripeCheckout
                        stripeKey="pk_test_51IJgZCGQO6SRRWlIQysuM4pjKjmvYoYfoWCkjNGuUiU11r4Y8IBowrEN2NgJGuKqynOhUKFq773Doervs1akG8f1004IUuoOJs"
                        token={handleToken}
                        />
                    </form>
            </section>
    )
}

export default Payment
