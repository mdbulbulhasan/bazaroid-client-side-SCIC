import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { AiFillStar } from "react-icons/ai";
import useAxios from "../../../../hooks/useAxios";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [ratingData, setRatingData] = useState({ averageRating: 0, count: 0 });

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axiosInstance.get(`/reviews/${product._id}/average`);
        setRatingData(res.data);
      } catch (error) {
        console.error("Failed to load rating", error);
      }
    };

    fetchRating();
  }, [product._id, axiosInstance]);

  const handleViewDetails = () => {
    navigate(`/productDetails/${product._id}`);
  };

  return (
    <motion.div
      className="rounded-lg shadow-md p-4 hover:shadow-xl transition space-y-3"
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={product.productImage || product.image}
        alt={product.itemName || product.marketName}
        className="rounded mb-3 h-60 w-full object-cover"
      />

      <div className="flex justify-between">
        <div>
          <h3 className="text-green-800 font-bold text-lg">
            {product.itemName}
          </h3>
          <h3 className="text-green-800 font-bold text-lg">
            {product.marketName}
          </h3>
        </div>

        {/* ⭐ Rating Section */}
        <div className="flex items-center space-x-2 text-yellow-500">
          <span>
            <AiFillStar className="text-yellow-500" />
          </span>
          <span className="font-semibold">{ratingData.averageRating}</span>
          <span className="text-gray-500 text-sm">({ratingData.count})</span>
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-gray-900 text-sm mb-2">
          Date: {new Date(product.date).toLocaleDateString()}
        </p>

        <ul className="mb-3 text-black">
          {product.items && product.items.length > 0 ? (
            product.items.map((item, index) => (
              <li key={index}>
                {item.name} — ৳{item.price}/kg
              </li>
            ))
          ) : (
            <li>৳{product.pricePerUnit}/kg</li>
          )}
        </ul>
      </div>

      <button onClick={handleViewDetails} className="btn btn-primary w-full">
        View Details
      </button>
    </motion.div>
  );
};

export default ProductCard;
