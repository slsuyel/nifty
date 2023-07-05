import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import StripePayment from "./StripePayment";

const Payment = () => {
    
    const stripePromise = loadStripe("pk_test_51N2GidJraFl18PG7uUF1NuI4viviEG2LXw5gP0VxnficoL6KJhnd9oZOkdH62ote6F0NCzF6IcikUVQ5lYOo5vbH00ZHLMtEWD");

    return (
        <div>
            <h2 className="text-center">Payment now</h2>
            <Elements stripe={stripePromise}>
                <StripePayment  />
            </Elements>
        </div>
    );
};

export default Payment;