import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const MyWatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  // Handle Remove confirmation
  const handleRemove = (id) => {
    const updated = watchlist.filter((item) => item._id !== id);
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setWatchlist(updated);
    toast.success("Removed from watchlist!");
    setItemToRemove(null);
  };

  return (
    <div className="w-full mx-auto p-6 text-gray-100 rounded-lg">
      <h1 className="text-3xl text-black font-bold mb-6 text-center">
        My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-400">Your watchlist is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-md">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 border border-gray-700">
                  Product Name
                </th>
                <th className="py-3 px-4 border border-gray-700">
                  Market Name
                </th>
                <th className="py-3 px-4 border border-gray-700">Date</th>
                <th className="py-3 px-4 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item) => (
                <tr key={item._id} className="hover:bg-green-50">
                  <td className="py-3 px-4 text-black border border-gray-700">
                    {item.itemName || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-black border border-gray-700">
                    {item.marketName || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-black border border-gray-700">
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 border border-gray-700 flex ">
                    <div className="max-w-5xl mx-auto flex items-center space-x-2">
                      <button
                        onClick={() => navigate("/allProducts")}
                        className="btn btn-sm btn-success flex items-center gap-1"
                      >
                        <FaPlusCircle /> Add More
                      </button>
                      <button
                        onClick={() => setItemToRemove(item)}
                        className="btn btn-sm btn-error flex items-center gap-1"
                      >
                        <FaTrashAlt /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {itemToRemove && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-green-50 p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Confirm Removal
            </h2>
            <p className="mb-6 text-black">
              Are you sure you want to remove{" "}
              <span className="font-bold text-black">
                {itemToRemove.itemName}
              </span>{" "}
              from your watchlist?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setItemToRemove(null)}
                className="btn btn-sm btn-secondary text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemove(itemToRemove._id)}
                className="btn btn-sm btn-error"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default MyWatchList;
