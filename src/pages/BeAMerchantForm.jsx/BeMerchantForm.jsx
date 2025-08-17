import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MerchantRequestForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ Fetch user info from backend using email (since _id might not be in auth user)
  useEffect(() => {
    console.log("Auth user:", user);
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`) // Update your backend route to support email-based query if needed
        .then((res) => {
          console.log("Fetched user info:", res.data);
          setUserInfo(res.data);
          setValue("name", res.data.name);
          setValue("email", res.data.email);
        })
        .catch((err) => {
          console.error("Failed to fetch user info", err);
          toast.error("Failed to load user info");
        });
    }
  }, [user, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    const requestData = {
      userId: userInfo._id,
      name: userInfo.name,
      email: userInfo.email,
      businessName: data.businessName,
      businessAddress: data.businessAddress,
      phone: data.phone,
      website: data.website,
      businessDescription: data.businessDescription,
    };

    try {
      const res = await axiosSecure.post("/merchantRequests", requestData);
      if (res.data.insertedId) {
        toast.success("Merchant request submitted successfully!");
        reset();
      } else {
        toast.info(res.data.message || "Request already exists.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-8 text-green-700 text-center">
        Merchant Registration Form
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name (read-only) */}
        <div>
          <label className="block mb-1 font-medium text-black">Name</label>
          <input
            type="text"
            value={userInfo.name}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed text-black"
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium text-black">Email</label>
          <input
            type="email"
            value={userInfo.email}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed text-black"
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block mb-1 font-medium text-black">
            Business Name *
          </label>
          <input
            type="text"
            {...register("businessName", {
              required: "Business name is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600 text-black"
            placeholder="Enter your business name"
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm">
              {errors.businessName.message}
            </p>
          )}
        </div>

        {/* Business Address */}
        <div>
          <label className="block mb-1 font-medium text-black">
            Business Address *
          </label>
          <input
            type="text"
            {...register("businessAddress", {
              required: "Business address is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600 text-black"
            placeholder="Enter your business address"
          />
          {errors.businessAddress && (
            <p className="text-red-500 text-sm">
              {errors.businessAddress.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium text-black">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600 text-black"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block mb-1 font-medium text-black">Website</label>
          <input
            type="url"
            {...register("website")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600 text-black"
            placeholder="Enter your business website (optional)"
          />
        </div>

        {/* Business Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-black">
            Business Description *
          </label>
          <textarea
            {...register("businessDescription", {
              required: "Description is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600 text-black"
            placeholder="Briefly describe your business"
            rows={4}
          ></textarea>
          {errors.businessDescription && (
            <p className="text-red-500 text-sm">
              {errors.businessDescription.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-green-700 cursor-pointer hover:bg-green-800 text-white px-6 py-3 rounded-md shadow transition w-full"
          >
            Submit Request
          </button>
        </div>
      </form>
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
    </div>
  );
};

export default MerchantRequestForm;
