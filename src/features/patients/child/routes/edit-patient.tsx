import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { useGetPatientById } from "../api";
import { PatientForm } from "../components";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChildDto, editChildSchema } from "../schema";
import { useEditChild } from "../api/edit-child";
import { toast } from "@/libs/mantine-toast";
import { queryClient } from "@/libs/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

export const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: child } = useGetPatientById({ id });

  const form: UseFormReturn<ChildDto> = useForm<ChildDto>({
    resolver: zodResolver(editChildSchema),
  });

  const { mutate: editChild, isPending } = useEditChild();

  const onSubmit: SubmitHandler<ChildDto> = (data) => {
    const filteredData = { ...data };

    if (!filteredData.weight?.value && !filteredData.weight?.unit) {
      delete filteredData.weight;
    }

    if (!filteredData.height?.value) {
      delete filteredData.height;
    }

    editChild(
      { id, ...filteredData },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Patient data has edited successfully.",
          });
          queryClient.invalidateQueries({
            queryKey: ["childPatient"],
          });
          navigate(`/patients/detail/${id}`);
        },
      },
    );
  };

  return (
    <>
      {isPending ? (
        <div className="flex">
          <Loader className="mx-auto mt-8" />
        </div>
      ) : (
        <PatientForm
          form={form}
          onSubmit={onSubmit}
          isEditing={true}
          patient={child}
        />
      )}
    </>
  );
};
