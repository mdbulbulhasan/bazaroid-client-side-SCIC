import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import RejectionModal from "./RejectionModal";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRejectProduct, setSelectedRejectProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const approveProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/products/${id}/status`, {
        status: "approved",
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product approved!");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => toast.error("Failed to approve product"),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/vendor-products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries(["products"]);
      setDeleteProductId(null);
    },
    onError: () => toast.error("Failed to delete product"),
  });


  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table border">
          <thead className="bg-green-600 text-black">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr key={p._id} className="text-black">
                <td>{idx + 1}</td>
                <td>{p.itemName}</td>
                <td>{p.vendorName}</td>
                <td>${p.pricePerUnit}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      p.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : p.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2 justify-center">
                  {p.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() => approveProduct.mutate(p._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() => setSelectedRejectProduct(p)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <Link
                    to={`/dashboard/vendorDashboard/updateProduct/${p._id}`}
                  >
                    <button className="btn btn-primary btn-xs">Update</button>
                  </Link>
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => setDeleteProductId(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal */}
      {selectedRejectProduct && (
        <RejectionModal
          product={selectedRejectProduct}
          closeModal={() => setSelectedRejectProduct(null)}
          refetch={() => queryClient.invalidateQueries(["allProducts"])}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded shadow">
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-error"
                onClick={() => deleteProduct.mutate(deleteProductId)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setDeleteProductId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
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

export default AdminAllProducts;
