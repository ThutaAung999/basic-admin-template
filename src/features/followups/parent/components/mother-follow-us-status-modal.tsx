import { Modal } from "@/components";
import { Button } from "@/components";
import { useEditMotherFollowUsStatus } from "..";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/libs/mantine-toast";

export const MotherFollowUpStatusModal = ({
  isOpen,
  close,
  id,
}: {
  isOpen: boolean;
  close: () => void;
  id: string;
}) => {
  const { mutate: editMotherFollowUpStatus, isPending: isEditLoading } =
    useEditMotherFollowUsStatus();

  const queryClient = useQueryClient();
  const handleStatusChange = () => {
    const data = {
      status: "completed",
    };
    editMotherFollowUpStatus(
      { id, data },
      {
        onSuccess: () => {
          toast.success({ title: "Success!", message: "Edited status." });
          queryClient.invalidateQueries({
            queryKey: ["mother-follow-ups"],
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
