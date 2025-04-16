import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CropPricesPage from "./pages/CropPricesPage";
import NewsPage from "./pages/NewsPage";
import MarketplacePage from "./pages/MarketplacePage";
import StockManagementPage from "./pages/StockManagementPage";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crop-prices" element={<CropPricesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/stock-management" element={<StockManagementPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
