import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";


const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["/orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  // Update order status mutation
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/orders/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      toast.success("Order status updated successfully!");
      setSelectedOrder(null);
    },
    onError: () => {
      toast.error("Failed to update order status.");
    },
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl text-black font-bold mb-4">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-green-600 text-gray-700">
              <th>#</th>
              <th>User Email</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id} className="hover:bg-green-50 text-black">
                <td>{idx + 1}</td>
                <td>{order.userEmail}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-black">
              Update Order Status
            </h3>
            <p className="text-black">
              Current Status:{" "}
              <span className="font-semibold">{selectedOrder.status}</span>
            </p>

            <div className="mt-4 flex gap-4">
              <button
                className="btn btn-success flex-1"
                onClick={() =>
                  updateOrderStatus.mutate({
                    id: selectedOrder._id,
                    status: "approved",
                  })
                }
              >
                Approve
              </button>
              <button
                className="btn btn-outline flex-1 bg-gray-300 text-black"
                onClick={() => setSelectedOrder(null)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </motion.div>
  );
};

export default AllOrders;
