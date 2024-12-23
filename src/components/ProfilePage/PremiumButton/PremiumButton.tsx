"use client";
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
      <button
        className="  text-white font-medium py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition p-3"
        onClick={openModal}
      >
        Become a Premium User
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Upgrade to Premium
            </h2>
            <Elements stripe={stripePromise}>
              {/* Checkout Form Component */}
              <CheckoutForm price={1000} email={email} userId={userId} />
            </Elements>
            <div className="flex justify-center mt-4">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumButton;
