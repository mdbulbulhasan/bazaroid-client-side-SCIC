import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const UpdateProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams(); // URL থেকে প্রোডাক্ট id নিয়ে আসছি
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date(),
      marketName: "",
      marketDescription: "",
      itemName: "",
      productImage: "",
      pricePerUnit: "",
      prices: [{ date: new Date(), price: "" }],
      itemDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  useEffect(() => {
    // Fetch product data on mount
    axiosSecure
      .get(`/vendor-products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data);

        // Reset form with fetched data, convert dates properly
        reset({
          ...data,
          date: data.date ? new Date(data.date) : new Date(),
          prices: data.prices
            ? data.prices.map((p) => ({
                date: new Date(p.date),
                price: p.price,
              }))
            : [{ date: new Date(), price: "" }],
        });
      })
      .catch(() => {
        toast.error("Failed to load product data", {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, axiosSecure, reset]);

  const onSubmit = (data) => {
    axiosSecure
      .put(`/vendor-products/${id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0 || res.data.success) {
          toast.success("Product updated successfully!", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            transition: Bounce,
          });

          setTimeout(() => {
            navigate("/dashboard/vendorDashboard");
          }, 2000);
        } else {
          toast.info("No changes detected.", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
            transition: Bounce,
          });
        }
      })
      .catch(() => {
        toast.error("Server error while updating product.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        });
      });
  };



  if (loading) return <Loading></Loading>;

  return (
    <div className="bg-green-50 rounded-lg shadow-md p-6 w-full">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Update Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Vendor Email */}
        <div>
          <label className="text-green-800 font-medium mb-1">
            Vendor Email
          </label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Market Name */}
        <div>
          <label className="text-green-800 font-medium mb-1">Market Name</label>
          <input
            type="text"
            {...register("marketName", { required: "Market Name is required" })}
            placeholder="Eg: Rajshahi City Market"
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-600"
          />
          {errors.marketName && (
            <p className="text-red-500">{errors.marketName.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="text-green-800 font-medium mb-1">Date</label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-600"
                dateFormat="yyyy-MM-dd"
              />
            )}
          />
        </div>

        {/* Market Description */}
        <div className="lg:col-span-2">
          <label className="text-green-800 font-medium mb-1">
            Market Description
          </label>
          <textarea
            {...register("marketDescription", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full bg-white text-gray-900 placeholder-gray-600"
            placeholder="Eg: Located near Rajshahi Court, established in 1975, popular for fresh vegetables."
          />
          {errors.marketDescription && (
            <p className="text-red-500">{errors.marketDescription.message}</p>
          )}
        </div>

        {/* Item Name */}
        <div>
          <label className="text-green-800 font-medium mb-1">Item Name</label>
          <input
            type="text"
            {...register("itemName", { required: "Item Name is required" })}
            placeholder="Eg: Onion"
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-600"
          />
          {errors.itemName && (
            <p className="text-red-500">{errors.itemName.message}</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="text-green-800 font-medium mb-1">
            Product Image URL
          </label>
          <input
            type="text"
            {...register("productImage", {
              required: "Product image URL is required",
            })}
            placeholder="Eg: https://example.com/onion.jpg"
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-600"
          />
          {errors.productImage && (
            <p className="text-red-500">{errors.productImage.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="text-green-800 font-medium mb-1">Status</label>
          <input
            type="text"
            value={product?.status || "pending"}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-900"
          />
        </div>

        {/* Price per Unit */}
        <div>
          <label className="text-green-800 font-medium mb-1">
            Price per Unit
          </label>
          <input
            type="text"
            {...register("pricePerUnit", {
              required: "Price per unit is required",
            })}
            placeholder="Eg: ৳30/kg"
            className="input input-bordered w-full bg-white text-gray-900 placeholder-gray-600"
          />
          {errors.pricePerUnit && (
            <p className="text-red-500">{errors.pricePerUnit.message}</p>
          )}
        </div>

        {/* Prices Array */}
        <div className="lg:col-span-2">
          <label className="text-green-800 font-medium mb-1">
            Prices by Date
          </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col lg:flex-row items-center gap-2 mb-2"
            >
              <Controller
                control={control}
                name={`prices.${index}.date`}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    className="input input-bordered bg-white text-gray-900 placeholder-gray-600"
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />

              <input
                type="text"
                {...register(`prices.${index}.price`, {
                  required: "Price required",
                })}
                placeholder="Price"
                className="input input-bordered bg-white text-gray-900 placeholder-gray-600"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-error btn-sm"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ date: new Date(), price: "" })}
            className="btn btn-outline btn-success btn-sm mt-2"
          >
            + Add Price
          </button>
        </div>

        {/* Item Description */}
        <div className="lg:col-span-2">
          <label className="text-green-800 font-medium mb-1">
            Item Description (Optional)
          </label>
          <textarea
            {...register("itemDescription")}
            className="textarea textarea-bordered w-full bg-white text-gray-900 placeholder-gray-600"
            placeholder="Eg: Freshly harvested, large size, sweet taste."
          />
        </div>

        {/* Submit */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
