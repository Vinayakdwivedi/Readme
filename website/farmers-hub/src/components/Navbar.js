import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Farmers' Hub</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/crop-prices" className="hover:underline">
            Crop Prices
          </Link>
          <Link to="/news" className="hover:underline">
            News
          </Link>
          <Link to="/marketplace" className="hover:underline">
            Marketplace
          </Link>
          <Link to="/stock-management" className="hover:underline">
            Stock Management
          </Link>
          <button className="bg-green-700 px-4 py-2 rounded hover:bg-green-800">
            Placeholder
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
