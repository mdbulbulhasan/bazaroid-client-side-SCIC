import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Loading from "../../../../components/Loading";
import Swal from "sweetalert2";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch products using useQuery
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor-products", user?.email],
    enabled: !!user?.email, // runs only if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor-products?vendorEmail=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      );
      return res.data;
    },
    onError: () => {
      toast.error("Failed to load products");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/vendor-products/${id}`)
          .then((res) => {
            if (res.data.success) {
              toast.success("Product deleted successfully");
              refetch(); // refresh after deletion
            } else {
              toast.error("Failed to delete product");
            }
          })
          .catch(() => {
            toast.error("Server error while deleting product");
          });
      }
    });
  };



  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl textb text-green-700 font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p className="text-black text-center">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-300">
            <thead className="text-green-700">
              <tr>
                <th>Item Name</th>
                <th>Price per Unit</th>
                <th>Market Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t text-green-700 border-gray-200"
                >
                  <td>{product.itemName}</td>
                  <td>{product.pricePerUnit}</td>
                  <td>{product.marketName}</td>
                  <td>{new Date(product.date).toLocaleDateString()}</td>
                  <td>
                    {product.status}
                    {product.status === "rejected" && product.feedback && (
                      <p className="text-sm text-red-600">
                        Feedback: {product.feedback}
                      </p>
                    )}
                  </td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/vendorDashboard/updateProduct/${product._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    </div>
  );
};

export default MyProducts;
