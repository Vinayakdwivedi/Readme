import HeroSection from "../components/HeroSection";
import CropPrices from "../components/CropPrices";
import NewsSection from "../components/NewsSection";
import WeatherSection from "../components/WeatherSection";
import Marketplace from "../components/Marketplace";

function Home() {
  return (
    <>
      <HeroSection />
      <CropPrices />
      <NewsSection />
      <WeatherSection />
      <Marketplace />
    </>
  );
}

export default Home;
