import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const PendingMerchant = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["pendingMerchantRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/merchantRequests/pending");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Pending Merchant Requests
      </h2>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead className="bg-green-600 text-white ">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Business Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Business Address</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr
                key={req._id}
                className="border-b text-black hover:bg-green-50 transition"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{req.name}</td>
                <td className="py-3 px-4">{req.businessName}</td>
                <td className="py-3 px-4">{req.email}</td>
                <td className="py-3 px-4">{req.phone}</td>
                <td className="py-3 px-4">{req.businessAddress}</td>
                <td className="py-3 px-4">{req.createdAt}</td>
                <td className="py-3 px-4 capitalize">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PendingMerchant;
