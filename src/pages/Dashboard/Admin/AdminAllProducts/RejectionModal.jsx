import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const RejectionModal = ({ product, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const mutation = useMutation({
    mutationFn: (data) =>
      axiosSecure.patch(`/admin/products/${product._id}/status`, data),
    onSuccess: () => {
      toast.success("Product rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // ✅ v5 syntax
      closeModal();
    },
    onError: () => {
      toast.error("Failed to reject product.");
    },
  });

  const handleReject = () => {
    if (!reason || !feedback) {
      toast.error("Please provide both rejection reason and feedback.");
      return;
    }
    mutation.mutate({
      status: "rejected",
      rejectionReason: reason,
      feedback: feedback,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 text-black">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          Reject Product: {product.itemName}
        </h2>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Rejection Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="input input-bordered border-black w-full bg-white"
            placeholder="Enter reason"
            disabled={mutation.isPending}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Feedback to Vendor</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="textarea textarea-bordered border-black w-full bg-white"
            placeholder="Write feedback message"
            disabled={mutation.isPending}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-outline"
            onClick={closeModal}
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleReject}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Rejecting..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
