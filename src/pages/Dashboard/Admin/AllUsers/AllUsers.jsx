import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../../components/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users with search functionality
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/users/search?q=${encodeURIComponent(searchTerm)}`
      );
      return res.data;
    },
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const res = await axiosSecure.patch(`/users/${userId}`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
      toast.success("User role updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update user role.");
    },
  });

  // Handle update button click
  const handleUpdateRole = (userId, currentRole) => {
    Swal.fire({
      title: "Select new role",
      input: "select",
      inputOptions: { user: "User", vendor: "Vendor", admin: "Admin" },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: "Update",
      inputValidator: (value) => {
        if (!value) return "You need to select a role!";
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newRole = result.value;
        updateRoleMutation.mutate({ userId, newRole });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-black">All Users</h2>

      {/* Search input */}
      <div className="mb-4 text-black flex flex-col sm:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && refetch()}
          className="px-4 py-2 border rounded w-full sm:max-w-sm"
        />
        <button
          onClick={() => refetch()}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-600 text-black">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className="border-b hover:bg-green-50 text-black transition"
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleUpdateRole(user._id, user.role)}
                    className="bg-green-400 hover:bg-green-500 text-black px-3 py-1 rounded transition cursor-pointer"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        theme="light"
        transition={Bounce}
      />
    </motion.div>
  );
};

export default AllUsers;
