import {
  Button,
  DatePickerInput,
  Header,
  Select,
  TextInput,
} from "@/components";
import { Divider, Loader, SimpleGrid } from "@mantine/core";
import dayjs from "dayjs";
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useGetMotherDiagnosis } from "../api/get-mother-diagnosis";
import { useGetConsultants } from "@/features/consultant";
import { useGetAddress } from "../../api";
import { useEffect, useState } from "react";
import { MotherDto } from "../schema/mother-patient";
import { useNavigate } from "react-router-dom";
import { TextAreaInputWithRef } from "../../child";
import { Mother } from "../../types";

const resetPatient = (patient: Mother) => ({
  name: patient?.name,
  caretaker: patient?.caretaker,
  consultant: patient?.consultant,
  dob: dayjs(patient?.dob).toDate(),
  contact_numbers: patient?.contact_numbers.toString(),
  weight: {
    value: patient?.weight?.value.toString(),
    unit: patient?.weight?.unit,
  },
  height: {
    value: patient?.height?.value.toString(),
  },
  anthropometry_date_for_weight: patient?.anthropometry_date_for_weight
    ? dayjs(patient?.anthropometry_date_for_weight).toDate()
    : undefined,
  anthropometry_date_for_height: patient?.anthropometry_date_for_height
    ? dayjs(patient?.anthropometry_date_for_height).toDate()
    : undefined,
  address: {
    sr: patient?.address?.sr?.p_code,
    township: patient?.address?.township?.p_code,
  },
  gravida: patient?.gravida?.toString(),
  parity: patient?.parity?.toString(),
  remark: patient?.remark,
  caretaker_contact_number: patient?.caretaker_contact_number,
  allergy: patient?.allergy,
  diagnosis: patient?.diagnosis,
  has_delivered_baby: patient?.has_delivered_baby?.toString(),
  contraception_history: patient?.contraception_history,
  menstrual_description: patient?.menstrual_description,
  medical_history: patient?.medical_history,
  drugs: patient?.drugs,
  family_personal_condition: patient?.family_personal_condition,
  pregnancy_description: patient?.pregnancy_description,
  lmp_date: patient?.lmp_date,
});

export const MotherPatientForm = ({
  form,
  onSubmit,
  patient,
  isEditing,
}: {
  form: UseFormReturn<MotherDto>;
  onSubmit: SubmitHandler<MotherDto>;
  patient?: Mother;
  isEditing: boolean;
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = form;

  const skip = 0;
  const limit = 0;

  const { data: diagnosis, isLoading: isGettingDiagnosis } =
    useGetMotherDiagnosis({ skip, limit, type: "new" });

  const [stateCode, setStateCode] = useState<string | null>(null);

  const { data: consultants, isLoading: isGettingConsultants } =
    useGetConsultants({ skip, limit });

  const { data: stateData, isLoading: isGettingState } = useGetAddress({
    type: "sr",
    skip,
    limit,
  });

  const { data: townshipData, isLoading: isGettingTown } = useGetAddress({
    type: "tsp",
    limit,
    skip,
  });

  const watchSr = watch("address.sr", "");

  const town = stateCode
    ? stateCode &&
      townshipData?.data.filter((tsp) => tsp.p_code.startsWith(stateCode))
    : townshipData?.data.filter((tsp) => tsp.p_code.startsWith(watchSr));

  const handleStateChange = (val: string | null) => {
    setStateCode(val);
    setValue("address.sr", val || "");
    setValue("address.township", "");
  };

  const stateOptions =
    (stateData &&
      stateData.data?.map((sr) => ({ value: sr.p_code, label: sr.name }))) ||
    [];

  const townshipOptions =
    (town && town?.map((town) => ({ value: town.p_code, label: town.name }))) ||
    [];

  const diagnosisOptions = diagnosis?.data?.map((dia) => dia.name) || [];

  const handleCancelClick = () => {
    navigate("/mothers/patients");
  };

  const handleOnSubmit: SubmitHandler<MotherDto> = (data) => {
    onSubmit(data);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (patient) {
      reset(resetPatient(patient));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [patient, reset]);

  return (
    <div>
      <Header
        title={
          isEditing === true
            ? "Edit Patient(Mother)"
            : "Add New Patient (Mother)"
        }
      />
      {isGettingDiagnosis ||
      isGettingConsultants ||
      isGettingState ||
      isGettingTown ||
      isLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : (
        ""
      )}
      {stateData && consultants && diagnosis && townshipData && (
        <div className="bg-white border rounded-md m-10">
          {isEditing === false && (
            <div className="ms-6">
              <h3 className="inline-block align-middle">Add New</h3>
            </div>
          )}
          <Divider />
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <SimpleGrid
              cols={{ base: 1, sm: 2 }}
              spacing="xl"
              className="mt-4 mb-8"
            >
              <div className="ms-6 flex flex-col gap-y-4 me-6 md:me-0">
                <TextInput
                  label="Name"
                  withAsterisk
                  {...register("name")}
                  error={errors.name?.message}
                />
                <Controller
                  control={control}
                  name="dob"
                  render={({ field }) => (
                    <DatePickerInput
                      label="Date of Birth"
                      withAsterisk
                      placeholder="Pick a Date"
                      value={field.value ? dayjs(field.value).toDate() : null}
                      onChange={field.onChange}
                      error={errors.dob?.message}
                    />
                  )}
                />
                <TextInput
                  label="Contact No"
                  placeholder="Phone..."
                  withAsterisk
                  {...register("contact_numbers")}
                  error={errors.contact_numbers?.message}
                />
                <p className="text-xs text-gray-400 mt-0">
                  *** Please use the following formats (+959123456789,
                  09123456789)
                </p>
                <div className="flex gap-x-4">
                  <Controller
                    name="gravida"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Gravida (Numbers of Pregnancy)"
                        data={["0", "1", "2", "3", "4", "5", "6"]}
                      />
                    )}
                  />
                  <Controller
                    name="parity"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Parity (No of Children)"
                        data={["0", "1", "2", "3", "4", "5", "6"]}
                      />
                    )}
                  />
                </div>
                <TextInput
                  label="Remark(Title)"
                  placeholder="Name..."
                  {...register("remark")}
                />
                <div className="flex gap-x-4 items-center">
                  <Controller
                    control={control}
                    name="anthropometry_date_for_weight"
                    render={({ field }) => (
                      <DatePickerInput
                        label="Date"
                        value={field.value ? dayjs(field.value).toDate() : null}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <TextInput
                    size="sm"
                    label="Weight"
                    className="w-1/3"
                    type="number"
                    {...register("weight.value")}
                  />
                  <Controller
                    name="weight.unit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onChange={field.onChange}
                        value={field.value}
                        data={["kg", "lb"]}
                        className="mt-6"
                      />
                    )}
                  />
                </div>
                <div className="flex gap-x-2 items-center">
                  <Controller
                    control={control}
                    name="anthropometry_date_for_height"
                    render={({ field }) => (
                      <DatePickerInput
                        label="Date"
                        value={field.value ? dayjs(field.value).toDate() : null}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <TextInput
                    size="sm"
                    label="Height(cm)"
                    type="number"
                    {...register("height.value")}
                  />
                </div>
                <div className="flex gap-x-2">
                  <TextInput
                    label="Care Taker Name"
                    placeholder="Name..."
                    withAsterisk
                    {...register("caretaker")}
                    error={errors.caretaker?.message}
                  />
                  <TextInput
                    label="Care Taker Contact Number"
                    placeholder="Name..."
                    withAsterisk
                    {...register("caretaker_contact_number")}
                    error={errors.caretaker_contact_number?.message}
                  />
                </div>
                <TextInput label="Allergy" {...register("allergy")} />
                <Controller
                  name="diagnosis"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Diagnosis"
                      data={diagnosisOptions}
                    />
                  )}
                />
                <Select
                  label="Has Delivered Baby"
                  value={watch("has_delivered_baby")}
                  onChange={(val) =>
                    setValue("has_delivered_baby", val || undefined)
                  }
                  data={[
                    { value: "true", label: "Yes" },
                    { value: "false", label: "No" },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-y-4 me-6 ms-6 md:ms-0">
                <Controller
                  name="consultant"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Consultant Name"
                      data={consultants?.consultants.map(
                        (consultant) => consultant.name,
                      )}
                    />
                  )}
                />
                <Select
                  label="Address (State / Division)"
                  value={watch("address.sr")}
                  onChange={handleStateChange}
                  data={stateOptions}
                  withAsterisk
                  error={errors.address?.message}
                />
                <Select
                  label="Address (Township)"
                  value={watch("address.township")}
                  onChange={(val) => setValue("address.township", val || "")}
                  data={townshipOptions}
                  withAsterisk
                  error={errors.address?.township?.message}
                />
                <TextAreaInputWithRef
                  label="Previous history of contraception"
                  placeholder="Here..."
                  {...register("contraception_history")}
                />
                <TextAreaInputWithRef
                  label="Menstrual, Obsteric, Gynaecological:"
                  placeholder="Here..."
                  {...register("menstrual_description")}
                />
                <TextAreaInputWithRef
                  label="Past Medical and Surgical History"
                  placeholder="Here..."
                  {...register("medical_history")}
                />
                <TextAreaInputWithRef
                  label="Drug History"
                  placeholder="Here..."
                  {...register("drugs")}
                />
                <TextAreaInputWithRef
                  label="Family and Personal Condition"
                  placeholder="Here..."
                  {...register("family_personal_condition")}
                />
                <TextAreaInputWithRef
                  label="History of Present Pregancy"
                  placeholder="Here..."
                  {...register("pregnancy_description")}
                />

                <Controller
                  control={control}
                  name="lmp_date"
                  render={({ field }) => (
                    <DatePickerInput
                      label="LMP Date"
                      className="w-1/2"
                      placeholder="Pick a Date"
                      value={field.value ? dayjs(field.value).toDate() : null}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </SimpleGrid>
            <Divider />
            <div className="flex justify-end p-4 gap-x-4">
              <Button type="submit">
                {isEditing === true ? "UPDATE" : "CREATE"}
              </Button>
              <Button
                type="button"
                onClick={handleCancelClick}
                className="bg-error-300 hover:bg-error-400"
              >
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
