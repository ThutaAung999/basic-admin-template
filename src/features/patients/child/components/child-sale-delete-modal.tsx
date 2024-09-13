import { Button, Modal } from "@/components";
import { useDeleteChildSale } from "@/features/sales/child";
import { toast } from "@/libs/mantine-toast";
import { queryClient } from "@/libs/react-query";

export const ChildSaleDeleteModal = ({
  isOpen,
  close,
  id,
}: {
  isOpen: boolean;
  close: () => void;
  id: string;
}) => {
  const { mutate: deleteChildSale, isPending } = useDeleteChildSale();

  const handleDeleteSale = () => {
    deleteChildSale(
      { id },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Sale has deleted successfully.",
          });
          queryClient.invalidateQueries({
            queryKey: ["childSalesById"],
          });
          close();
        },
      },
    );
  };

  return (
    <Modal
      title="Do you really want to delete this sale?"
      onClose={close}
      isOpen={isOpen}
      centered
      renderActionButton={() => (
        <Button onClick={handleDeleteSale} loading={isPending}>
          Confirm
        </Button>
      )}
    ></Modal>
  );
};
