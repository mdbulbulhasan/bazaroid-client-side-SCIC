import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "../../../components/Loading";
import useAxios from "../../../hooks/useAxios";

const Advertisement = () => {
  const axiosInstance = useAxios();

  const {
    data: ads = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosInstance.get("/advertisements");
      // Filter approved ads only
      return res.data.filter((ad) => ad.status === "approved");
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError) return <div>Error fetching ads: {error.message}</div>;

  return (
    <div className="w-full my-8 mx-auto p-4">
      <h1 className="text-center text-green-900 text-3xl font-bold mb-4">Advertisements of Vendors</h1>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        className="rounded-lg overflow-hidden"
      >
        {ads.map((ad) => (
          <div key={ad._id}>
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="object-cover w-full h-96"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertisement;
