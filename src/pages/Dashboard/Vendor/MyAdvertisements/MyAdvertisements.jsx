import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";
import Swal from "sweetalert2";

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingAd, setEditingAd] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Fetch advertisements by vendor email
  const { data: advertisements = [], isLoading } = useQuery({
    queryKey: ["myAdvertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/advertisements?vendor=${user.email}`);
      return res.data;
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedAd) => {
      const res = await axiosSecure.patch(
        `/advertisements/${updatedAd._id}`,
        updatedAd
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Advertisement updated successfully!");
      queryClient.invalidateQueries(["myAdvertisements"]);
      setEditingAd(null);
    },
    onError: () => toast.error("Failed to update advertisement."),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/advertisements/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Advertisement deleted successfully!");
      queryClient.invalidateQueries(["myAdvertisements"]);
    },
    onError: () => toast.error("Failed to delete advertisement."),
  });

  const onUpdateSubmit = (data) => {
    updateMutation.mutate({ ...data, _id: editingAd._id });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-green-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full mx-auto bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          My Advertisements
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-green-800 text-left">
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {advertisements.map((ad) => (
                <tr key={ad._id} className="hover:bg-green-50 text-black">
                  <td>{ad.title}</td>
                  <td>{ad.description}</td>
                  <td>{ad.status}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        setEditingAd(ad);
                        reset(ad);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDelete(ad._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Modal */}
        {editingAd && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4 text-green-700 text-center">
                Update Advertisement
              </h3>
              <form
                onSubmit={handleSubmit(onUpdateSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-green-800 font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className="input input-bordered w-full bg-white text-gray-800 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                <div>
                  <label className="block text-green-800 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    className="textarea textarea-bordered w-full bg-white text-gray-800 border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm bg-gray-400 hover:bg-gray-500 text-white"
                    onClick={() => setEditingAd(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </motion.div>
  );
};

export default MyAdvertisements;
