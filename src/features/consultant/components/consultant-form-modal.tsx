import { Button, Modal, TextInput } from "@/components";
import { toast } from "@/libs/mantine-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  BaseConsultantDto,
  baseConsultantSchema,
  Consultant,
  useAddConsultant,  
  useEditConsultant,
} from "../";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const ConsultantFormModal = ({
  isOpen,
  close,
  oldData,
}: {
  isOpen: boolean;
  close: () => void;
  oldData?: Consultant;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BaseConsultantDto>({
    resolver: zodResolver(baseConsultantSchema),
  });

  const { mutate: createConsultant, isPending: isCreateLoading } =
    useAddConsultant();
  const { mutate: editConsultant, isPending: isEditLoading } =
    useEditConsultant();

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    if (oldData) {
      editConsultant(
        { id: oldData._id, ...data },
        {
          onSuccess: () => {
            toast.success({ title: "Success!", message: "Edited Consultant" });
            queryClient.invalidateQueries({
              queryKey: ["consultants"],
            });
            close();
          },
        },
      );
    } else {
      createConsultant(data, {
        onSuccess: () => {
          toast.success({ title: "Success!", message: "Added Consultant" });
          queryClient.invalidateQueries({
            queryKey: ["consultants"],
          });
          close();
        },
      });
    }
  });

  useEffect(() => {
    if (isOpen) {
      reset(oldData);
    } else {
      reset();
    }
  }, [isOpen, oldData, reset]);

  return (
    <Modal
      title={`${oldData ? "Edit" : "Add"} Consultant`}
      isOpen={isOpen}
      renderActionButton={() => (
        <Button
          type="submit"
          form="consultant-form"
          loading={oldData ? isEditLoading : isCreateLoading}
        >
          Save
        </Button>
      )}
      onClose={close}
      size="lg"
    >
      <form onSubmit={onSubmit} id="consultant-form">
        <TextInput
          withAsterisk
          label="Consultant Name"
          placeholder="Enter Consultant Name"
          registration={register("name")}
          error={errors.name?.message}
        />
      </form>
    </Modal>
  );
};
