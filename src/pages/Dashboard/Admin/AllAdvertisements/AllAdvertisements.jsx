import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [deleteAdId, setDeleteAdId] = useState(null);

  // Fetch all advertisements
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  // Change status mutation (fixed endpoint)
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/advertisements/${id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated!");
      queryClient.invalidateQueries(["advertisements"]);
    },
    onError: () => toast.error("Failed to update status"),
  });

  // Delete mutation
  const deleteAd = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/advertisements/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Advertisement deleted!");
      queryClient.invalidateQueries(["advertisements"]);
    },
    onError: () => toast.error("Failed to delete advertisement"),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">All Advertisements</h2>

      <div className="overflow-x-auto">
        <table className="table border">
          <thead className="bg-green-600 text-black">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {ads.map((ad, idx) => (
              <tr key={ad._id} className="text-black bg-transparent">
                <td>{idx + 1}</td>
                <td>{ad.title}</td>
                <td>{ad.description}</td>
                <td>{ad.vendorName}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      ad.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : ad.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ad.status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  {ad.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-xs"
                        onClick={() =>
                          updateStatus.mutate({
                            id: ad._id,
                            status: "approved",
                          })
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() =>
                          updateStatus.mutate({
                            id: ad._id,
                            status: "rejected",
                          })
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => setDeleteAdId(ad._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteAdId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded shadow">
            <p>Are you sure you want to delete this advertisement?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-error"
                onClick={() => {
                  deleteAd.mutate(deleteAdId);
                  setDeleteAdId(null);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setDeleteAdId(null)}
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

export default AllAdvertisements;
