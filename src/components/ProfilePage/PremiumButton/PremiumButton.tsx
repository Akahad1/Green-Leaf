"use client"; // Ensure you're using the correct context for your application
import React, { useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe outside of a component’s render to avoid recreating the `stripe` object on every render.
const stripePromise: Promise<Stripe | null> = loadStripe(
  "pk_test_51M6bnCGbMWtcM0fITPmW5rk0kyfE3bZ0IeIWZyrfoKWssuOTQI9mnMkGnYSzpLKsP6ginziugFJIXUnFOH6SPDCz00F8rCB8MF"
); // Replace with your Stripe public key

interface PremiumButtonProps {
  userId: string; // Assuming userId is a string
  email: string; // Assuming email is a string
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ userId, email }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //   const id = useAppSelector(useCurrentId);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={openModal}>
        Become a Premium User
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
            <Elements stripe={stripePromise}>
              {/* Other components */}
              <CheckoutForm price={1000} email={email} userId={userId} />
            </Elements>
            <button className="btn btn-secondary mt-4" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumButton;
