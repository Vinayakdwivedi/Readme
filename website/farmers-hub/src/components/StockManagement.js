import { useState } from "react";
import { stockData } from "../mockData";

function StockManagement() {
  const [stocks, setStocks] = useState(stockData);
  const [newStock, setNewStock] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!newStock.name || !newStock.quantity || !newStock.price) return;
    if (editingIndex !== null) {
      const updatedStocks = [...stocks];
      updatedStocks[editingIndex] = newStock;
      setStocks(updatedStocks);
      setEditingIndex(null);
    } else {
      setStocks([...stocks, newStock]);
    }
    setNewStock({ name: "", quantity: "", price: "" });
  };

  const handleEdit = (index) => {
    setNewStock(stocks[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  return (
    <section id="stock-management" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Stock Management
        </h2>
        <div className="mb-8 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">
            {editingIndex !== null ? "Edit Stock" : "Add New Stock"}
          </h3>
          <input
            type="text"
            placeholder="Crop Name"
            className="w-full p-2 border rounded mb-4"
            value={newStock.name}
            onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity (tons)"
            className="w-full p-2 border rounded mb-4"
            value={newStock.quantity}
            onChange={(e) =>
              setNewStock({ ...newStock, quantity: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price ($/ton)"
            className="w-full p-2 border rounded mb-4"
            value={newStock.price}
            onChange={(e) =>
              setNewStock({ ...newStock, price: e.target.value })
            }
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-4">Crop Name</th>
                <th className="p-4">Quantity (tons)</th>
                <th className="p-4">Price ($/ton)</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">{stock.name}</td>
                  <td className="p-4">{stock.quantity}</td>
                  <td className="p-4">{stock.price}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default StockManagement;
