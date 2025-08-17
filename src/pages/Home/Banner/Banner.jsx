import React from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/Banner/banner-1.jpg";
import bannerImg2 from "../../../assets/Banner/banner-2.jpg";
import bannerImg3 from "../../../assets/Banner/banner-3.jpg";
import bannerImg4 from "../../../assets/Banner/banner-4.jpg";
import { useNavigate } from "react-router";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Banner = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleBrowseMore = () => {
    navigate("/allproducts"); // ✅ navigate to your AllProducts route
  };

  return (
    <div className="overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4500}
        stopOnHover
        showThumbs={false}
        showStatus={false}
        swipeable
        emulateTouch
      >
        {/* Slide 1 */}
        <div className="relative group">
          <img
            src={bannerImg1}
            alt="Fresh Vegetables"
            className="h-[350px] md:h-[500px] w-full object-cover transform transition-transform duration-500 group-hover:-translate-y-1"
          />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="absolute inset-0  bg-opacity-30 flex flex-col justify-center items-center text-white px-4 text-center cursor-pointer"
          >
            <motion.h2
              variants={textVariant}
              className="text-2xl md:text-5xl font-bold mb-3"
            >
              Farm Fresh Vegetables
            </motion.h2>
            <motion.p variants={textVariant} className="max-w-xl mb-4">
              Experience the crispness of garden-picked vegetables delivered
              straight to your kitchen. Healthy eating starts here.
            </motion.p>
            <motion.button
              onClick={handleBrowseMore}
              variants={textVariant}
              className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded text-white font-medium cursor-pointer"
            >
              Browse More
            </motion.button>
          </motion.div>
        </div>

        {/* Slide 2 */}
        <div className="relative group">
          <img
            src={bannerImg2}
            alt="Seasonal Fruits"
            className="h-[350px] md:h-[500px] w-full object-cover transform transition-transform duration-500 group-hover:-translate-y-1"
          />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="absolute inset-0  bg-opacity-30 flex flex-col justify-center items-center text-white px-4 text-center cursor-pointer"
          >
            <motion.h2
              variants={textVariant}
              className="text-2xl md:text-5xl font-bold mb-3"
            >
              Juicy Seasonal Fruits
            </motion.h2>
            <motion.p variants={textVariant} className="max-w-xl mb-4">
              Sweetness that nourishes your body. Explore our collection of
              freshly picked seasonal fruits just for you.
            </motion.p>
            <motion.button
              onClick={handleBrowseMore}
              variants={textVariant}
              className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded text-white font-medium cursor-pointer"
            >
              Browse More
            </motion.button>
          </motion.div>
        </div>

        {/* Slide 3 */}
        <div className="relative group">
          <img
            src={bannerImg3}
            alt="Herbs and Spices"
            className="h-[350px] md:h-[500px] w-full object-cover transform transition-transform duration-500 group-hover:-translate-y-1"
          />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="absolute inset-0  bg-opacity-30 flex flex-col justify-center items-center text-white px-4 text-center cursor-pointer"
          >
            <motion.h2
              variants={textVariant}
              className="text-2xl md:text-5xl font-bold mb-3"
            >
              Aromatic Herbs & Spices
            </motion.h2>
            <motion.p variants={textVariant} className="max-w-xl mb-4">
              Elevate your cooking with our premium selection of herbs and
              spices for unforgettable flavors.
            </motion.p>
            <motion.button
              onClick={handleBrowseMore}
              variants={textVariant}
              className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded text-white font-medium cursor-pointer"
            >
              Browse More
            </motion.button>
          </motion.div>
        </div>

        {/* Slide 4 */}
        <div className="relative group">
          <img
            src={bannerImg4}
            alt="Daily Essentials"
            className="h-[350px] md:h-[500px] w-full object-cover transform transition-transform duration-500 group-hover:-translate-y-1"
          />
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="absolute inset-0  bg-opacity-30 flex flex-col justify-center items-center text-white px-4 text-center cursor-pointer"
          >
            <motion.h2
              variants={textVariant}
              className="text-2xl md:text-5xl font-bold mb-3"
            >
              Your Daily Essentials
            </motion.h2>
            <motion.p variants={textVariant} className="max-w-xl mb-4">
              Everything you need for a healthy home and kitchen, available at
              your fingertips with Bazaroid.
            </motion.p>
            <motion.button
              onClick={handleBrowseMore}
              variants={textVariant}
              className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded text-white font-medium cursor-pointer"
            >
              Browse More
            </motion.button>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
