import React, { useState } from "react";
import { CartItem } from "../types";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary"; // New component for showing the summary
import { api } from "../services/api";

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveItem, clearCart }) => {
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", address: "" });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle checkout button click
  const handleCheckoutButton = () => {
    if (totalPrice > 0) {
      setIsCheckoutVisible(true);
    } else {
      alert("Cannot proceed to checkout. Your cart is empty.");
    }
  };

  const handleCheckout = (customerInfo: { name: string; address: string }) => {
    // Store the customer info and proceed to the summary view
    setCustomerInfo(customerInfo);
    setIsCheckoutVisible(false);
    setIsSummaryVisible(true);
  };

  const handleConfirmOrder = () => {
    // Handle final order submission
    const order = {
      customerName: customerInfo.name,
      customerAddress: customerInfo.address,
      items: cartItems,
      totalPrice,
    };

    api.post("/orders", order).then(() => {
      alert("Order placed successfully!");
      clearCart(); // Clear cart after successful order
      setIsSummaryVisible(false); // Hide the summary form after submission
    });
  };

  // Handle "Back to Cart" action
  const handleBackToCart = () => {
    setIsCheckoutVisible(false); // Show the cart again
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg p-6 border border-gray-400 max-w-lg w-full mx-auto md:fixed md:top-1/2 md:right-20 md:transform md:-translate-y-1/2 md:w-[500px]">
        <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in the cart.</p>
        ) : (
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">
                    Rs.{item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  className="bg-red-500 text-white rounded px-2 py-1 text-sm hover:bg-red-600"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <h3 className="text-lg font-bold">Total: ${totalPrice}</h3>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded w-full md:ml-0 md:w-auto md:ml-auto"
          onClick={handleCheckoutButton}
        >
          Checkout
        </button>
      </div>
      {/* Conditionally render the Checkout or OrderSummary component */}
      {isCheckoutVisible && (
        <Checkout onCheckout={handleCheckout} onBack={handleBackToCart} />
      )}
      {isSummaryVisible && (
        <OrderSummary
          cartItems={cartItems}
          customerInfo={customerInfo}
          totalPrice={totalPrice}
          onConfirmOrder={handleConfirmOrder}
          onBack={() => setIsSummaryVisible(false)}
        />
      )}
    </div>
  );
};

export default Cart;
