import React from "react";
import { CartItem } from "../types";

interface OrderSummaryProps {
  cartItems: CartItem[];
  customerInfo: { name: string; address: string };
  totalPrice: number;
  onConfirmOrder: () => void;
  onBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  customerInfo,
  totalPrice,
  onConfirmOrder,
  onBack,
}) => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-lg p-6 border border-gray-400 max-w-lg w-full mx-auto md:fixed md:top-1/2 md:right-20 md:transform md:-translate-y-1/2 md:w-[500px]">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <h3 className="font-bold">Customer Details:</h3>
          <p>Name: {customerInfo.name}</p>
          <p>Address: {customerInfo.address}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Items:</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - Rs.{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Total Price: Rs.{totalPrice}</h3>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full md:w-[200px] mx-2"
            onClick={onConfirmOrder}
          >
            Confirm Order
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full md:w-[200px] mx-2"
            onClick={onBack}
          >
            Back to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
