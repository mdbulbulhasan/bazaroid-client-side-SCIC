import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole"; // Custom hook to get role
import { Bounce, toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [comparisonDate, setComparisonDate] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);

  const { role, isLoading: roleLoading } = useUserRole();

  // Fetch product details using Tanstack Query
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch reviews when product loads
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?._id) return;
      try {
        const res = await axiosSecure.get(`/reviews/${product._id}`);
        setReviews(res.data);
      } catch {
        toast.error("Failed to fetch reviews.");
      }
    };
    fetchReviews();
  }, [product?._id, axiosSecure]);

  // Fetch comparison data on date change
  useEffect(() => {
    const fetchComparison = async () => {
      if (!comparisonDate || !product?._id) return;
      try {
        const res = await axiosSecure.get(
          `/products/${
            product._id
          }/comparison?date=${comparisonDate.toISOString()}`
        );
        setComparisonData(res.data);
      } catch {
        toast.error("Failed to load comparison data");
      }
    };
    fetchComparison();
  }, [comparisonDate, product?._id, axiosSecure]);

  // Handle add to watchlist
  const handleAddToWatchlist = () => {
    if (!user) return navigate("/login");
    if (roleLoading) return; // wait for role to load
    if (["admin", "vendor"].includes(role)) {
      toast.info("Admins and vendors cannot add to watchlist.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem("watchlist")) || [];
    const isAlreadyAdded = existing.find((p) => p._id === product._id);
    if (isAlreadyAdded) {
      toast.info("Already in watchlist");
      return;
    }
    existing.push(product);
    localStorage.setItem("watchlist", JSON.stringify(existing));
    toast.success("Added to watchlist");
  };

  // Handle buy product (order)
  const handleBuyNow = async () => {
    if (!user) return navigate("/login");
    if (roleLoading) return;
    if (["admin", "vendor"].includes(role)) {
      toast.info("Admins and vendors cannot place orders.");
      return;
    }
    if (!product) return toast.error("Product not loaded yet");

    const orderData = {
      userEmail: user.email,
      products: [
        {
          productId: product._id,
          name: product.itemName,
          marketName: product.marketName,
          price: product.pricePerUnit,
          quantity: 1,
          image: product.productImage,
        },
      ],
      totalPrice: product.pricePerUnit,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);
      if (res.data.insertedId) {
        toast.success("Order placed successfully");
        setTimeout(() => {
          navigate("/dashboard/userDashboard");
        }, 1500);
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  // Handle submit review
  const handleSubmitReview = async () => {
    if (!user) return navigate("/login");
    if (roleLoading) return;
    if (["admin", "vendor"].includes(role)) {
      toast.info("Admins and vendors cannot submit reviews.");
      return;
    }
    if (!reviewRating || !reviewText.trim()) {
      toast.warn("Please provide rating and comment.");
      return;
    }
    if (!product) {
      toast.error("Product data not loaded");
      return;
    }
    try {
      const newReview = {
        productId: product._id,
        userName: user.displayName || user.email,
        userEmail: user.email,
        rating: reviewRating,
        comment: reviewText.trim(),
        date: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/reviews", newReview);
      if (res.data.insertedId) {
        setReviews((prev) => [newReview, ...prev]);
        setReviewText("");
        setReviewRating(0);
        toast.success(`Thanks for your ${reviewRating}★ review!`);
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  if (isLoading || roleLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product details.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-10 rounded-lg text-black"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">
        {product?.itemName}
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={product?.productImage}
          alt={product?.itemName || "Product image"}
          className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
        />

        <div className="flex-1 space-y-4">
          <p>
            <span className="font-semibold">Market:</span> {product?.marketName}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {product?.date
              ? new Date(product.date).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Vendor:</span>{" "}
            {product?.vendorName || product?.vendorEmail || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ৳
            {product?.pricePerUnit}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handleAddToWatchlist}
              disabled={["admin", "vendor"].includes(role)}
              className="btn btn-primary"
            >
              Add to Watchlist
            </button>
            <button
              onClick={handleBuyNow}
              disabled={["admin", "vendor"].includes(role)}
              className="btn btn-success"
            >
              Buy Product
            </button>
          </div>
        </div>
      </div>

      <div className="my-10 border-t border-gray-700"></div>

      {/* Reviews section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">User Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-400 mb-6">
            No reviews yet. Be the first to review!
          </p>
        ) : (
          <ul className="space-y-4 mb-8 max-h-64 overflow-y-auto">
            {reviews.map((r, i) => (
              <li
                key={i}
                className="border p-4 rounded shadow-sm bg-gray-800 text-gray-100"
              >
                <p className="font-semibold">{r.userName || r.userEmail}</p>
                <p className="text-yellow-400">⭐ {r.rating} / 5</p>
                <p>{r.comment}</p>
                <p className="text-xs text-gray-500">
                  {r.date
                    ? new Date(r.date).toLocaleDateString()
                    : "Unknown date"}
                </p>
              </li>
            ))}
          </ul>
        )}

        {user ? (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Add Your Review</h3>
            <div>
              <label htmlFor="rating" className="block font-medium">
                Rating:
              </label>
              <select
                id="rating"
                value={reviewRating}
                onChange={(e) => setReviewRating(parseInt(e.target.value, 10))}
                className="select select-bordered w-24 bg-gray-800 text-gray-100"
                disabled={["admin", "vendor"].includes(role)}
              >
                <option value={0}>Select</option>
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              rows={3}
              placeholder="Write your comment..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="textarea textarea-bordered w-full bg-gray-800 text-gray-100"
              disabled={["admin", "vendor"].includes(role)}
            ></textarea>
            <button
              onClick={handleSubmitReview}
              className="btn btn-primary"
              disabled={["admin", "vendor"].includes(role)}
            >
              Submit Review
            </button>
          </div>
        ) : (
          <p className="mt-2 text-gray-400 italic">Login to add a review.</p>
        )}
      </section>

      <div className="my-10 border-t border-gray-700"></div>

      {/* Comparison section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Compare Prices with Previous Date
        </h2>
        <input
          type="date"
          value={
            comparisonDate ? comparisonDate.toISOString().slice(0, 10) : ""
          }
          onChange={(e) =>
            setComparisonDate(e.target.value ? new Date(e.target.value) : null)
          }
          className="input input-bordered mb-6 max-w-xs bg-gray-800 text-gray-100"
        />
        {comparisonData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="itemName" stroke="#ddd" />
              <YAxis stroke="#ddd" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "#fff" }}
              />
              <Bar dataKey="priceDifference" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">Select a date to see comparison.</p>
        )}
      </section>

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

export default ProductDetails;
