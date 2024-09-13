import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditMotherDto,
  editMotherSchema,
  MotherDto,
} from "../schema/mother-patient";
import { MotherPatientForm } from "../components";
import { useGetMotherPatientById } from "../api";
import { useEditMotherPatient } from "../api/edit-mother-patient";
import { toast } from "@/libs/mantine-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

export const EditMotherPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: mother } = useGetMotherPatientById({ id });

  const form: UseFormReturn<MotherDto> = useForm<MotherDto>({
    resolver: zodResolver(editMotherSchema),
  });

  const { mutate: editMotherPatient, isPending } = useEditMotherPatient();

  const onSubmit: SubmitHandler<EditMotherDto> = (data) => {
    const filteredData = { ...data };

    if (!filteredData.weight?.value && !filteredData.weight?.unit) {
      delete filteredData.weight;
    }

    if (!filteredData.height?.value) {
      delete filteredData.height;
    }
    editMotherPatient(
      { id, ...filteredData },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Patient data has edited successfully",
          });
          navigate(`/mothers/patients/detail/${id}`);
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
        <MotherPatientForm
          form={form}
          onSubmit={onSubmit}
          isEditing={true}
          patient={mother}
        />
      )}
    </>
  );
};
