import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../components/Loading";
import useAxios from "../../hooks/useAxios";

const AllProducts = () => {
  const axiosInstance = useAxios();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [sortByPrice, setSortByPrice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(9); // products per page

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = `page=${page}&limit=${limit}`;

      if (sortByPrice) query += `&sortPrice=${sortByPrice}`;

      if (startDate && endDate) {
        const start = startDate.toISOString();
        const end = endDate.toISOString();
        query += `&startDate=${start}&endDate=${end}`;
      } else if (startDate) {
        const start = startDate.toISOString();
        query += `&startDate=${start}`;
      }

      const url = `/products?${query}`;

      const res = await axiosInstance.get(url);
      setProducts(res.data.products || []); // ensure array
      setTotalCount(res.data.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortByPrice, startDate, endDate, page]);

  if (loading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 tracking-wide">
        All Products
      </h2>

      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        {/* Date Range */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              isClearable
              placeholderText="Select start date"
              className="input input-bordered w-40"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              isClearable
              placeholderText="Select end date"
              className="input input-bordered w-40"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Sort by Price
          </label>
          <select
            value={sortByPrice}
            onChange={(e) => setSortByPrice(e.target.value)}
            className="select select-bordered w-48"
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <AnimatePresence>
          {products.length === 0 ? (
            <motion.p
              key="no-products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center col-span-full text-gray-600 text-lg"
            >
              No products found for the selected filters.
            </motion.p>
          ) : (
            products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={product.productImage}
                  alt={product.itemName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-xl text-gray-900 mb-2 truncate">
                    {product.itemName}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Price:</span> ৳
                    {product.pricePerUnit}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(product.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Market:</span>{" "}
                    {product.marketName}
                  </p>
                  <p className="text-gray-700 mb-4 truncate">
                    <span className="font-medium">Vendor:</span>{" "}
                    {product.vendorName || product.vendorEmail}
                  </p>
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="mt-auto btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="btn btn-outline text-green-900"
        >
          Previous
        </button>
        <span className="text-green-800 font-semibold">
          Page {page} of {Math.ceil(totalCount / limit)}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              prev < Math.ceil(totalCount / limit) ? prev + 1 : prev
            )
          }
          disabled={page >= Math.ceil(totalCount / limit)}
          className="btn btn-outline text-green-900"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
