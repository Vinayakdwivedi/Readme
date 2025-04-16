import { useState } from "react";
import { marketplaceItems as initialItems } from "../mockData";

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [items, setItems] = useState(initialItems);

  const filterItems = () => {
    return initialItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        item.price <= maxPrice
    );
  };

  return (
    <section id="marketplace" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Marketplace</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Filters</h3>
            <div className="bg-white p-4 rounded shadow">
              <label htmlFor="crop-search" className="block mb-2">
                Search Crops:
              </label>
              <input
                type="text"
                id="crop-search"
                className="w-full p-2 border rounded mb-4"
                placeholder="e.g., Wheat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <label htmlFor="price-filter" className="block mb-2">
                Price Range:
              </label>
              <input
                type="range"
                id="price-filter"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full mb-4"
              />
              <p>Max Price: ${maxPrice}</p>
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filterItems().map((item, index) => (
                <div key={index} className="bg-white p-4 rounded shadow card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Price: ${item.price}/ton</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Marketplace;
