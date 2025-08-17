import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = (productsdata) => {
    // Include vendor email and name before sending
    productsdata.vendorEmail = user?.email || "";
    productsdata.vendorName = user?.displayName || "";
    productsdata.status = "pending"; // default status

    console.log("Submitted Data:", productsdata);

    axiosSecure
      .post("/vendor-products", productsdata)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success(` Product added successfully!`);
        } else {
          toast.error("Failed to add product.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Server error while adding product.");
      });
  };

  return (
    <div className="bg-green-50 rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Add Product Update
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Hidden vendor email */}
        <input
          type="hidden"
          value={user?.email || ""}
          {...register("vendorEmail")}
        />

        {/* Hidden vendor name */}
        <input
          type="hidden"
          value={user?.displayName || ""}
          {...register("vendorName")}
        />

        {/* Vendor Email Display */}
        <div>
          <label className="text-green-800 font-medium mb-1">
            Vendor Email
          </label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Vendor Name Display */}
        <div>
          <label className="text-green-800 font-medium mb-1">Vendor Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName || ""}
            className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
          />
        </div>

        {/* Market Name */}
        <div>
          <label className="text-green-800 font-medium mb-1">Market Name</label>
          <input
            type="text"
            {...register("marketName", { required: "Market Name is required" })}
            placeholder="Eg: Rajshahi City Market"
            className="input input-bordered w-full focus:outline-none focus:ring-2 border-green-400 transition bg-white text-gray-900 placeholder-gray-600"
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
                className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
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
            className="textarea textarea-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
            placeholder="Eg: Located near Rajshahi Court, established in 1975, popular for fresh vegetables."
          ></textarea>
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
            className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
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
            className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
          />
          {errors.productImage && (
            <p className="text-red-500">{errors.productImage.message}</p>
          )}
        </div>

        {/* Status Display */}
        <div>
          <label className="text-green-800 font-medium mb-1">Status</label>
          <input
            type="text"
            value="pending"
            readOnly
            className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-gray-100 text-gray-900"
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
            className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
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
                    className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition bg-white text-gray-900 placeholder-gray-600"
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
                className="input input-bordered focus:outline-none focus:ring-2 border-green-400 transition bg-white text-gray-900 placeholder-gray-600"
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
            className="textarea textarea-bordered focus:outline-none focus:ring-2 border-green-400 transition w-full bg-white text-gray-900 placeholder-gray-600"
            placeholder="Eg: Freshly harvested, large size, sweet taste."
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full"
          >
            Submit Product
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
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default AddProduct;
