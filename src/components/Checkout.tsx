import React, { useState } from "react";

interface CheckoutProps {
  onCheckout: (customerInfo: { name: string; address: string }) => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onCheckout, onBack }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleCheckout = () => {
    if (name && address) {
      onCheckout({ name, address }); // Pass customer details to parent component
    } else {
      alert("Please fill in all the details.");
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg p-6 border border-gray-400 max-w-lg w-full mx-auto md:fixed md:top-1/2 md:right-20 md:transform md:-translate-y-1/2 md:w-[500px]">
        <h2 className="text-lg font-bold mb-4">Checkout</h2>
        <div className="mb-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full md:w-[200px] mx-2"
            onClick={handleCheckout}
          >
            Submit Order
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full md:w-[200px] mx-2"
            onClick={onBack}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
