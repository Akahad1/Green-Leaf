"use client";
import { useAddUserInfo } from "@/hooks/user.hook";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";

// Adjust the path as necessary

interface CheckoutFormProps {
  price: number; // Assuming price is a number
  email: string;
  userId: string; // User ID
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  price,
  email,
  userId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartError, setCarterror] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(true);
  const [transfierid, setTransfierid] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const { mutate: updateUser } = useAddUserInfo(); // Mutation to update user status

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetch("http://localhost:5000/api/a6/payment/createPament", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.result.clientSecret);
          console.log("data.result.clientSecret", data.result.clientSecret);
          setProcessing(false);
        });
    }
  }, [price]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error: paymentError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentError) {
      setCarterror(
        paymentError.message ||
          "An error occurred while processing the payment."
      );
      return;
    } else {
      setCarterror("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email,
          },
        },
      });

    if (confirmError) {
      setCarterror(
        confirmError.message || "An error occurred during confirmation."
      );
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        price,
        email,
        transactionId: paymentIntent.id,
        orderId: userId,
      };
      setSuccess("Payment successful!");
      // Store payment data in the database

      fetch("http://localhost:5000/api/a6/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result.insertedId) {
            setTransfierid(paymentIntent.id);
            console.log("paymentIntent.id", paymentIntent.id);
            setSuccess("Payment successful!");

            // Update the user's verified status in the database
            const upadetData = {
              user: userId,
              data: {
                verified: true,
              },
            };
            updateUser(upadetData);
          }
        })
        .catch((err) => {
          console.error("Error saving payment data:", err);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-sm  mt-5"
          type="submit"
          disabled={processing || !stripe || !elements}
        >
          Pay
        </button>
        {cartError && <p className="text-red-400">{cartError}</p>}
        {success && <p className=" text-blue-400">{success}</p>}
        {transfierid && (
          <p className=" text-red-400">Transaction ID: {transfierid}</p>
        )}
      </form>
    </>
  );
};

export default CheckoutForm;
