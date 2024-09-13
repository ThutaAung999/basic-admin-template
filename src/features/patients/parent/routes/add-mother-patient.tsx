import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MotherDto, motherPatientSchema } from "../schema/mother-patient";
import { useCreateMotherPatient } from "../api/create-mother-patient";
import { toast } from "@/libs/mantine-toast";
import { queryClient } from "@/libs/react-query";
import { MotherPatientForm } from "../components";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

export const AddMotherPatient = () => {
  const navigate = useNavigate();
  const form: UseFormReturn<MotherDto> = useForm<MotherDto>({
    resolver: zodResolver(motherPatientSchema),
  });

  const { mutate: createMotherPatient, isPending } = useCreateMotherPatient();

  const onSubmit: SubmitHandler<MotherDto> = (data) => {
    const filteredData = { ...data };

    if (!filteredData.weight?.value && !filteredData.weight?.unit) {
      delete filteredData.weight;
    }

    if (!filteredData.height?.value) {
      delete filteredData.height;
    }

    createMotherPatient(
      { data: filteredData },
      {
        onSuccess: (response) => {
          const newPatientId = response?._id;
          toast.success({
            title: "Success",
            message: "New mother patient has completely added",
          });
          queryClient.invalidateQueries({
            queryKey: ["motherPatientsList"],
          });
          // need to navigate to info page
          navigate(`/mothers/patients/detail/${newPatientId}`);
          // also need to add creating loading ui
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
        <MotherPatientForm form={form} onSubmit={onSubmit} isEditing={false} />
      )}
    </>
  );
};
