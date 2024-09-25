import React, { useState, useEffect } from "react";
import { RawMaterial } from "../types";

interface Props {
  rawMaterials: RawMaterial[];
  onSubmitCustomProduct: (items: RawMaterial[], totalPrice: number) => void; // Adjusted to accept items and totalPrice
}

const CustomProductBuilder: React.FC<Props> = ({
  rawMaterials,
  onSubmitCustomProduct,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    { id: string; quantity: number }[]
  >([]);

  const [productType, setProductType] = useState<"Fruit Juice" | "Fruit Salad">(
    "Fruit Juice"
  );

  const [addIceCream, setAddIceCream] = useState(false);

  // Calculate total price dynamically
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Calculate the cost of selected ingredients
    selectedIngredients.forEach((item) => {
      const rawMaterial = rawMaterials.find(
        (material) => material.id === item.id
      );
      if (rawMaterial) {
        totalPrice += rawMaterial.pricePerUnit * item.quantity;
      }
    });

    // Add the extra cost for Fruit Salad
    if (productType === "Fruit Salad") {
      totalPrice += 100;
    }

    // Add the extra cost for ice cream
    if (addIceCream) {
      totalPrice += 50;
    }

    return totalPrice;
  };

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Recalculate the total price whenever the selections change
  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedIngredients, productType, addIceCream]);

  const handleAddIngredient = (id: string) => {
    const ingredient = selectedIngredients.find((item) => item.id === id);
    if (ingredient) {
      setSelectedIngredients(
        selectedIngredients.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setSelectedIngredients([...selectedIngredients, { id, quantity: 1 }]);
    }
  };

  // Clear the selected ingredients
  const handleClearIngredients = () => {
    setSelectedIngredients([]); // Reset the state
  };

  const handleSubmit = () => {
    // Map selectedIngredients to RawMaterial type
    const selectedRawMaterials = selectedIngredients
      .map((ingredient) => {
        const rawMaterial = rawMaterials.find((rm) => rm.id === ingredient.id);
        return rawMaterial
          ? { ...rawMaterial, quantity: ingredient.quantity }
          : null;
      })
      .filter((material) => material !== null) as RawMaterial[];

    onSubmitCustomProduct(selectedRawMaterials, totalPrice); // Pass the mapped ingredients and total price
    handleClearIngredients();
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Create a Custom Product</h2>

      {/* Product Type Selection */}
      <div className="mb-4">
        <label className="font-semibold mr-4">Select Product Type: </label>
        <select
          value={productType}
          onChange={(e) =>
            setProductType(e.target.value as "Fruit Juice" | "Fruit Salad")
          }
          className="border border-gray-300 p-2 rounded"
        >
          <option value="Fruit Juice">Fruit Juice</option>
          <option value="Fruit Salad">Fruit Salad (+100 Rs)</option>
        </select>
      </div>

      {/* Ice Cream Toggle */}
      <div className="mb-4">
        <label className="font-semibold mr-4">Add Ice Cream (+50 Rs): </label>
        <input
          type="checkbox"
          checked={addIceCream}
          onChange={(e) => setAddIceCream(e.target.checked)}
        />
      </div>

      {/* Raw materials grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl p-4">
        {rawMaterials.map((material) => (
          <div key={material.id} className="w-full">
            <table className="table-auto w-full border border-gray-300">
              <tr className="border-b border-gray-200">
                <td className="p-4 text-left">{material.name}</td>
                <td className="p-4 text-right">
                  <span>Rs.{material.pricePerUnit}</span>
                </td>
                <td className="font-semibold">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAddIngredient(material.id)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </table>
          </div>
        ))}
      </div>

      {/* Selected Ingredients */}
      <h3 className="text-xl font-semibold mt-4">Selected Ingredients:</h3>
      <div className="space-y-2">
        {selectedIngredients.map((item) => {
          const rawMaterial = rawMaterials.find(
            (material) => material.id === item.id
          );
          return (
            <div key={item.id}>
              {rawMaterial?.name} x {item.quantity}
            </div>
          );
        })}
      </div>

      {/* Total Price Display */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Total Price: Rs.{totalPrice} </h3>
      </div>

      {/* Buttons */}
      <div className="mt-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Add to Cart
        </button>
        <button
          className="bg-red-500 ml-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClearIngredients}
        >
          Clear Ingredients
        </button>
      </div>
    </div>
  );
};

export default CustomProductBuilder;
