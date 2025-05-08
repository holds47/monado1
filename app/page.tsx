"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Automatically register Chart.js components

const fetchETHPrices = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30"
  );
  const data = await response.json();
  return data.prices.map(([timestamp, price]) => ({
    timestamp: new Date(timestamp).toLocaleDateString(),
    price,
  }));
};

export default function Home() {
  const [ethData, setEthData] = useState([]);

  useEffect(() => {
    const getPrices = async () => {
      const prices = await fetchETHPrices();
      setEthData(prices);
    };
    getPrices();
  }, []);

  const chartData = {
    labels: ethData.map((point) => point.timestamp),
    datasets: [
      {
        label: "Ethereum Price (USD)",
        data: ethData.map((point) => point.price),
        borderColor: "rgba(138, 43, 226, 0.8)",
        backgroundColor: "rgba(138, 43, 226, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #800080, #D8BFD8)", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>Ethereum Price Tracker</h1>
      <div style={{ maxWidth: "800px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "10px" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}
