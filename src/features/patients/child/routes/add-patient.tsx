import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChildDto, patientSchema } from "../schema/patient";
import { useCreateChildPatient } from "../api/create-child-patient";
import { toast } from "@/libs/mantine-toast";
import { queryClient } from "@/libs/react-query";
import { PatientForm } from "../components";
import { useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";

export const AddPatient = () => {
  const navigate = useNavigate();
  const form: UseFormReturn<ChildDto> = useForm<ChildDto>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      contact_numbers: [" "],
      allergies: [" "],
    },
  });

  const { mutate: createChildPatient, isPending } = useCreateChildPatient();

  const onSubmit: SubmitHandler<ChildDto> = (data) => {
    const filteredData = { ...data };

    if (!filteredData.weight?.value && !filteredData.weight?.unit) {
      delete filteredData.weight;
    }

    if (!filteredData.height?.value) {
      delete filteredData.height;
    }

    createChildPatient(
      { data: filteredData },
      {
        onSuccess: (response) => {
          const newPatientId = response.data._id;
          toast.success({
            title: "Success!",
            message: "New child patient has completely added.",
          });
          queryClient.invalidateQueries({
            queryKey: ["childPatientsList"],
          });
          navigate(`/patients/detail/${newPatientId}`);
          // need to navigate to info page
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
        <PatientForm form={form} onSubmit={onSubmit} isEditing={false} />
      )}
    </>
  );
};
