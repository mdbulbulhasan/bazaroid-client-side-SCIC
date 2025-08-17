import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import Loading from "../../../../components/Loading";
import { motion } from "framer-motion"; // ✅ import motion for smooth animation

const Advertisements = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setUploading(true);

      // Upload image to imgbb first
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
;
      const imgRes = await axios.post(imageUploadUrl, formData);
      const imageUrl = imgRes.data.data.url;

      // Prepare advertisement data with vendorEmail and vendorName
      const adData = {
        title: data.title,
        description: data.description,
        status: "pending",
        imageUrl,
        vendorEmail: user?.email,
        vendorName: user?.displayName || "Unknown Vendor",
      };

      // Post to your backend
      const res = await axiosSecure.post("/advertisements", adData);
      setUploading(false);
      return res;
    },
    onSuccess: (res) => {
      if (res?.data?.insertedId) {
        toast.success("Advertisement posted successfully!");
        reset();
        queryClient.invalidateQueries(["advertisements"]);
      } else {
        toast.error("Failed to post advertisement.");
      }
    },
    onError: () => {
      setUploading(false);
      toast.error("Server error while posting advertisement.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // Smooth fade-in on mount
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isMounted ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center bg-green-50 p-4"
    >
      <div className="bg-white shadow-xl rounded-xl p-8 w-full relative">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Post New Advertisement
        </h2>
        {(uploading || mutation.isLoading) && (
          <Loading></Loading>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Vendor Name */}
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Vendor Name
            </label>
            <input
              type="text"
              value={user?.displayName || "Unknown Vendor"}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-gray-900 border-green-400"
            />
          </div>

          {/* Vendor Email */}
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Vendor Email
            </label>
            <input
              type="email"
              value={user?.email || "No Email"}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-gray-900 border-green-400"
            />
          </div>

          {/* Ad Title */}
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Ad Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Ad title is required" })}
              placeholder="Enter advertisement title"
              className="input input-bordered w-full bg-white text-gray-800 focus:outline-none focus:ring-2 border-green-400 transition"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Short Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter a short description"
              className="textarea textarea-bordered w-full bg-white text-gray-800 focus:outline-none focus:ring-2 border-green-400 transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Banner / Promo Image
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              accept="image/*"
              className="file-input file-input-bordered w-full bg-white text-gray-800 focus:outline-none focus:ring-2 border-green-400 transition"
            />
          </div>

          {/* Status Display */}
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Status
            </label>
            <input
              type="text"
              value="pending"
              readOnly
              className="input input-bordered w-full border-green-400 bg-gray-100 text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={uploading || mutation.isLoading}
            className="btn bg-green-600 hover:bg-green-700 text-white w-full mt-4 transition transform hover:scale-105"
          >
            Post Advertisement
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </motion.div>
  );
};

export default Advertisements;
