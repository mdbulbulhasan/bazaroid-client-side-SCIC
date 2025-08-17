import React from "react";
import { motion } from "framer-motion";
import vendor1 from "../../../assets/logo.png"; // sample images
import vendor2 from "../../../assets/logo.png";
import vendor3 from "../../../assets/logo.png";

const vendors = [
  { id: 1, name: "Rahim Store", image: vendor1, rating: 4.8, products: 120 },
  { id: 2, name: "Anika Traders", image: vendor2, rating: 4.7, products: 95 },
  { id: 3, name: "Bazar Express", image: vendor3, rating: 4.9, products: 150 },
];

const TopVendors = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">
          🏆 Top Vendors Spotlight
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              className="bg-green-50 rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-xl transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-green-200 mb-4"
              />
              <h3 className="text-xl font-semibold text-green-800">
                {vendor.name}
              </h3>
              <p className="text-gray-600">⭐ {vendor.rating} rating</p>
              <p className="text-gray-600">{vendor.products} products</p>
              <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
                View Store
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendors;
