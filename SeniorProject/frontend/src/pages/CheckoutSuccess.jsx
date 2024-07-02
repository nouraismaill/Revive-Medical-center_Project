import React from "react";

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-200">
      <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500 inline-block mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-lg mb-8">Thank you for your payment.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
