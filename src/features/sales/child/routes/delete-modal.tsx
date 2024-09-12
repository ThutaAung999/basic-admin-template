import { Button, Modal } from "@/components";
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import { useDeleteChildSale } from "../api/delete-child-sale";
import { toast } from "@/libs/mantine-toast";
import { Purchase } from "../types";

type Props = {
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;

  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        data: Purchase[];
        count: number;
      },
      Error
    >
  >;
  isModalOpen: boolean;
  closeDeleteModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteModal = ({
  selectedId,
  setSelectedId,
  refetch,
  isModalOpen,
  closeDeleteModal,
  setIsModalOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteChildSale();

  const handleDelete = async () => {
    if (selectedId) {
      try {
        deleteMutation.mutate(
          { id: selectedId },
          {
            onSuccess: () => {
              toast.success({
                title: "Success!",
                message: "Deleted child sale",
              });
              queryClient.invalidateQueries({ queryKey: ["childsales"] });
            },
            onError: () => {
              toast.error({
                title: "Error!",
                message: "Failed to delete child call",
              });
            },
            onSettled: () => {
              refetch();
            },
          },
        );
      } catch (error) {
        console.error("Failed to delete the item", error);
      } finally {
        setIsModalOpen(false);
        setSelectedId(null);
      }
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      isOpen={isModalOpen}
      onClose={closeDeleteModal}
      renderActionButton={() => (
        <Button
          onClick={handleDelete}
          variant="filled" /* className="text-white bg-red-700" */
        >
          Delete
        </Button>
      )}
    >
      Are you sure you want to delete this item?
    </Modal>
  );
};
