import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch orders of the current user
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("User email missing");
      const res = await axiosSecure.get(
        `/orders/my-orders?userEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load orders. Please try again later.
      </p>
    );

  // Prepare data for price trend chart (latest 7 orders)
  const chartData = orders.slice(-7).map((order) => ({
    date: new Date(order.orderDate).toLocaleDateString(),
    price: order.totalPrice,
  }));

  return (
    <motion.div
      className="w-full mx-auto p-6 rounded-lg text-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-black">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-md text-gray-200">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-3 px-4 border border-gray-700">Product Name</th>
              <th className="py-3 px-4 border border-gray-700">Market Name</th>
              <th className="py-3 px-4 border border-gray-700">Price (৳)</th>
              <th className="py-3 px-4 border border-gray-700">Order Date</th>
              <th className="py-3 px-4 border border-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No orders found.
                </td>
              </tr>
            )}
            {orders.map((order, idx) => {
              const product = order.products[0];
              return (
                <tr
                  key={order._id || idx}
                  className="hover:bg-green-50 cursor-pointer"
                >
                  <td className="py-3 px-4 border text-black border-gray-700">
                    {product?.name || "N/A"}
                  </td>
                  <td className="py-3 px-4 border text-black border-gray-700">
                    {product?.marketName || "N/A"}
                  </td>
                  <td className="py-3 px-4 border text-black border-gray-700">
                    {product?.price || order.totalPrice}
                  </td>
                  <td className="py-3 px-4 border text-black border-gray-700">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 border text-black border-gray-700">
                    <button
                      onClick={() =>
                        navigate(`/productDetails/${product?.productId || ""}`)
                      }
                      className="btn btn-sm btn-info"
                    >
                      🔍 View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Price Trend Chart */}
      {chartData.length > 1 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Price Trends (Last 7 Orders)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#000" />
              <YAxis stroke="#000" />
              <Tooltip
                contentStyle={{ backgroundColor: "#222", color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4ade80"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#22c55e" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}
    </motion.div>
  );
};

export default MyOrders;
