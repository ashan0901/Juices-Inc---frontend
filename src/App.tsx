// src/App.tsx
import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import Catalog from "./components/Catelog";

import { Product, CartItem, RawMaterial } from "./types";
import Cart from "./components/Cart";
import CustomProductBuilder from "./components/CustomProductBuilder";
import "./index.css";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Fetch products and raw materials from backend
    api.get("/products").then((response) => setProducts(response.data));
    api
      .get("/raw-materials")
      .then((response) => setRawMaterials(response.data));
  }, []);

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]); // This will clear the cart
  };

  const handleCustomProductSubmit = (
    items: RawMaterial[],
    totalPrice: number
  ) => {
    const customProduct: CartItem = {
      id: "custom-" + Date.now(),
      name: "Custom Product",
      price: totalPrice,
      quantity: 1,
    };
    setCartItems([...cartItems, customProduct]);
  };

  // const handleCheckout = (customerInfo: { name: string; address: string }) => {
  //   // Handle checkout and submit order to backend
  //   const order = {
  //     customerName: customerInfo.name,
  //     customerAddress: customerInfo.address,
  //     items: cartItems,
  //     totalPrice: cartItems.reduce(
  //       (acc, item) => acc + item.price * item.quantity,
  //       0
  //     ),
  //   };
  //   api.post("/orders", order).then(() => {
  //     alert("Order placed successfully!");
  //     setCartItems([]); // Clear cart after successful order
  //   });
  // };

  return (
    <div>
      <h1 className="text-4xl text-center font-bold mb-4 mt-6 font-serif">
        Juices INC Online Ordering
      </h1>
      <div>
        <h1 className="text-3xl font-bold p-4 ">Product List</h1>
      </div>

      {/* Product Catalog */}
      <Catalog products={products} onAddToCart={handleAddToCart} />

      {/* Custom Product Builder */}
      <CustomProductBuilder
        rawMaterials={rawMaterials}
        onSubmitCustomProduct={handleCustomProductSubmit}
      />

      {/* Shopping Cart */}
      <Cart
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        clearCart={clearCart}
      />

      {/* Checkout */}
      {/* <Checkout onCheckout={handleCheckout} /> */}
    </div>
  );
};

export default App;
