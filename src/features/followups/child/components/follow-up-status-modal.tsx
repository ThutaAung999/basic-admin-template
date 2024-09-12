import { Modal } from "@/components";
import { Button } from "@/components";
import { useEditFollowUpStatus } from "../api/edit-follow-up-status";
import { toast } from "@/libs/mantine-toast";
import { useQueryClient } from "@tanstack/react-query";

export const FollowUpStatusModal = ({
  isOpen,
  close,
  id,
}: {
  isOpen: boolean;
  close: () => void;
  id: string;
}) => {
  const { mutate: editFollowUpStatus, isPending: isEditLoading } =
    useEditFollowUpStatus();

  const queryClient = useQueryClient();
  const handleStatusChange = () => {
    const data = {
      status: "completed",
    };
    editFollowUpStatus(
      { id, data },
      {
        onSuccess: () => {
          toast.success({ title: "Success!", message: "Edited Status" });
          queryClient.invalidateQueries({
            queryKey: ["followUps"],
          });
          close();
        },
      },
    );
  };
  return (
    <Modal
      title="Please confrim to proceed."
      onClose={close}
      isOpen={isOpen}
      renderActionButton={() => (
        <Button onClick={handleStatusChange} loading={isEditLoading}>
          Confirm
        </Button>
      )}
    ></Modal>
  );
};
