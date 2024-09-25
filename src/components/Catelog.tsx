// src/components/Catalog.tsx
import React, { useState } from "react";
import { Product } from "../types"; // Create types file to define interfaces

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [iceCreamToggles, setIceCreamToggles] = useState<{
    [key: string]: boolean;
  }>({});

  // Function to toggle Icecream for each product
  const toggleIceCream = (productId: string) => {
    setIceCreamToggles((prevToggles) => ({
      ...prevToggles,
      [productId]: !prevToggles[productId],
    }));
  };

  // Function to filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex ml-32 mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-bold text-white ${
            selectedCategory === "fruit juice"
              ? "bg-green-600"
              : "bg-green-400 hover:bg-green-500"
          }`}
          onClick={() => setSelectedCategory("fruit juice")}
        >
          Fruit Juice
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold text-white ${
            selectedCategory === "fruit salad"
              ? "bg-orange-600"
              : "bg-orange-400 hover:bg-orange-500"
          }`}
          onClick={() => setSelectedCategory("fruit salad")}
        >
          Fruit Salad
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold text-white ${
            selectedCategory === "Icecream"
              ? "bg-blue-600"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
          onClick={() => setSelectedCategory("Icecream")}
        >
          Ice Cream
        </button>
        <button
          className="px-4 py-2 rounded-lg font-bold text-white bg-gray-500 hover:bg-gray-600"
          onClick={() => setSelectedCategory(null)}
        >
          Show All
        </button>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap w-[350px] lg:w-[900px] justify-center md:justify-start pl-4 max-w-full p-4 gap-4">
        {filteredProducts.map((product) => {
          const isIceCreamAdded = iceCreamToggles[product.id] || false;
          const finalPrice = isIceCreamAdded
            ? product.price + 50
            : product.price;

          return (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg shadow-lg p-4 w-full lg:w-[250px] lg:h-[200px] sm:w-[180px] md:w-[220px] bg-white flex flex-col justify-between items-center hover:shadow-xl transition-shadow duration-200 ease-in-out"
            >
              <h3 className="text-center font-serif font-bold text-lg mb-2">
                {product.name}
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                {product.description}
              </p>
              <div className="flex justify-between items-center w-full px-4 mt-2">
                <p className="text-gray-700 font-semibold text-lg">
                  Rs.{finalPrice}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg font-bold"
                  onClick={() => onAddToCart({ ...product, price: finalPrice })}
                >
                  Add to Cart
                </button>
              </div>

              {/* Add Icecream Option - Only for Fruit Juice or Fruit Salad */}
              {(product.category === "fruit juice" ||
                product.category === "fruit salad") && (
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={isIceCreamAdded}
                    onChange={() => toggleIceCream(product.id)}
                    className="mr-2"
                  />
                  Add Icecream (+Rs.50)
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalog;
