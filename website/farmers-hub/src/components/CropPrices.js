import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CropPrices() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Wheat ($/ton)",
        data: [200, 210, 205, 220, 215, 230],
        borderColor: "#4CAF50",
        fill: false,
      },
      {
        label: "Corn ($/ton)",
        data: [180, 185, 190, 195, 200, 210],
        borderColor: "#FFC107",
        fill: false,
      },
    ],
  };

  return (
    <section id="crop-prices" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Crop Price Trends
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <Line
              data={data}
              options={{
                responsive: true,
                scales: { y: { beginAtZero: false } },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CropPrices;
