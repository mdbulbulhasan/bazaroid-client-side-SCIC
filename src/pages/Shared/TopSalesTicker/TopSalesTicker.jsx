import React from "react";
import Marquee from "react-fast-marquee";

const TopSalesTicker = () => {
  return (
    <Marquee
      pauseOnHover
      gradient={false}
      speed={50}
      className="bg-green-100 text-green-800 py-1 font-medium"
    >
      🥦 Broccoli ৳50/kg • 🥕 Carrot ৳40/kg • 🧅 Onion ৳30/kg • 🥔 Potato ৳25/kg
    </Marquee>
  );
};

export default TopSalesTicker;
