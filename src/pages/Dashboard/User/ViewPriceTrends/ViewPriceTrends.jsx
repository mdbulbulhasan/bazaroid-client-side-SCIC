import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

function calculateTrend(history) {
  if (!history || history.length < 2) return 0;
  const firstPrice = history[0].price;
  const lastPrice = history[history.length - 1].price;
  return (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(1);
}


export default function ViewPriceTrends() {
  const axiosSecure = useAxiosSecure();
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchProducts = async () => {
    const response = await axiosSecure.get("/products");
    const data = response.data;

    return data.map((item) => ({
      id: item._id,
      name: item.itemName,
      market: item.marketName,
      vendor: item.vendorName || item.vendor,
      priceHistory: item.prices.map((p) => ({
        date: p.date.split("T")[0],
        price: p.price,
      })),
    }));
  };

  const {
    data: trackedItems = [],
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      if (data.length > 0 && !selectedItemId) {
        setSelectedItemId(data[0].id);
      }
    },
  });

  useEffect(() => {
    if (trackedItems.length && !selectedItemId) {
      setSelectedItemId(trackedItems[0].id);
    }
  }, [trackedItems, selectedItemId]);

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!trackedItems.length) return <p>No tracked items available.</p>;

  const selectedItem = trackedItems.find((item) => item.id === selectedItemId);
  if (!selectedItem) return <p>Selected item not found.</p>;

  const trend = selectedItem.priceHistory
    ? calculateTrend(selectedItem.priceHistory)
    : "N/A";

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        fontFamily: "Arial",
      }}
    >
      {/* Sidebar list */}
      <div
        style={{
          width: "200px",
          borderRight: "1px solid #ccc",
          paddingRight: "1rem",
        }}
      >
        <h3 className="text-black">Tracked Items</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {trackedItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                backgroundColor:
                  item.id === selectedItemId ? "#ddd" : "transparent",
                borderRadius: "4px",
                marginBottom: "0.5rem",
                userSelect: "none",
              }}
            >
              <span style={{ marginRight: "0.5rem" }}>{item.emoji}</span>{" "}
              <span className="text-black">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div style={{ flex: 1 }}>
        <h2>
          {selectedItem.emoji}{" "}
          <span className="text-black">{selectedItem.name}</span>
        </h2>
        <p className="text-black">{selectedItem.market}</p>
        <p className="text-black">
          <b>Vendor:</b> {selectedItem.vendor}
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={selectedItem.priceHistory}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`Price: ${value}`, ""]} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <p
          className="text-black"
          style={{ marginTop: "1rem", fontWeight: "bold" }}
        >
          Trend:{" "}
          <span style={{ color: trend >= 0 ? "green" : "red" }}>
            {trend >= 0 ? "+" : ""}
            {trend} % last {selectedItem.priceHistory.length} days
          </span>
        </p>
      </div>
    </div>
  );
}
