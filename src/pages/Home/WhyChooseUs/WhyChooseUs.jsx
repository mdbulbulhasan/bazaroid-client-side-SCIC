import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const benefits = [
  {
    id: 1,
    title: "Real-time Market Prices",
    description:
      "Stay updated with the latest verified market prices directly from vendors.",
  },
  {
    id: 2,
    title: "Trusted Vendors",
    description:
      "We carefully approve vendors to ensure top quality and honest pricing.",
  },
  {
    id: 3,
    title: "Easy Comparison",
    description:
      "Compare prices across markets instantly to save money every day.",
  },
];

const reviews = [
  {
    id: 1,
    name: "Aminul Haque",
    review:
      "Bazaroid saves me so much time! I always know where to buy fresh vegetables at the best price.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sadia Rahman",
    review:
      "As a working mom, this platform is a blessing. The vendor reviews help me choose trusted sellers.",
    rating: 4,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-12 text-center">
          💚 Why Choose Bazaroid?
        </h2>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="bg-green-50 rounded-lg shadow-md p-6 hover:shadow-xl transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FaCheckCircle className="text-green-700 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* User Reviews */}
        <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">
          ⭐ User Reviews
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-green-50 rounded-lg shadow p-6 hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-2" />
                <span className="font-bold">{review.rating}/5</span>
              </div>
              <p className="text-gray-700 mb-2">"{review.review}"</p>
              <p className="text-green-800 font-semibold">- {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
