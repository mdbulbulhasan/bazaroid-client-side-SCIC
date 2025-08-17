import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard"; // path check korio
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import useAxios from "../../../../hooks/useAxios";

const ProductSection = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products"); // backend er products API call
        // Filter products frontend e
        const approvedProducts = res.data.filter(
          (product) => product.status === "approved"
        );
        setProducts(approvedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <motion.section
      className="py-10 px-4 bg-green-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
        Latest Market Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} user={user} />
        ))}
      </div>
    </motion.section>
  );
};

export default ProductSection;
