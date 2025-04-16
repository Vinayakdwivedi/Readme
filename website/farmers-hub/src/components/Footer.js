import { useEffect } from "react";

function Footer() {
  useEffect(() => {
    // Load Google Maps
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.initMap = () => {
      new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 28.6139, lng: 77.209 }, // Default: Delhi
        zoom: 10,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-green-600 text-white py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4">Farmers' Hub</h3>
            <p>Connecting farmers and buyers for a sustainable future.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold mb-4">Location</h3>
            <div id="map" className="h-48 w-full md:w-96"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
