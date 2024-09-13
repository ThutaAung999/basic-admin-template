import {
  Button,
  Checkbox,
  DatePickerInput,
  Header,
  Select,
  TextInput,
} from "@/components";
import { Textarea as MantineTextarea, TextareaProps } from "@mantine/core";
import { useGetConsultants } from "@/features/consultant";
import { Divider, Group, Loader, Radio, SimpleGrid, Text } from "@mantine/core";
import { useGetAddress } from "../../api";
import { ForwardedRef, useEffect, useState } from "react";

import { FaPlusSquare, FaWindowClose } from "react-icons/fa";
import {
  SubmitHandler,
  Controller,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { ChildDto } from "../schema/patient";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { Child } from "../../types";
import { useGetChildDiagnoses } from "../../api/get-child-diagnoses";

export const TextAreaInputWithRef = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>((props, ref: ForwardedRef<HTMLTextAreaElement>) => (
  <MantineTextarea {...props} ref={ref} />
));

const resetPatient = (patient: Child) => ({
  name: patient?.name,
  caretaker: patient?.caretaker,
  consultant: patient?.consultant,
  gender: patient?.gender,
  dob: dayjs(patient?.dob).toDate(),
  hn: patient?.hn,
  past_diagnosis: patient?.past_diagnosis,
  past_history: patient?.past_history,
  contact_numbers: patient?.contact_numbers,
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
  allergies: patient?.allergies,
  address: {
    sr: patient?.address?.sr?.p_code,
    township: patient?.address?.township?.p_code,
  },
});

export const PatientForm = ({
  form,
  patient,
  onSubmit,
  isEditing,
}: {
  form: UseFormReturn<ChildDto>;
  patient?: Child;
  onSubmit: SubmitHandler<ChildDto>;
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
    resetField,
    reset,
  } = form;

  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    //@ts-expect-error name is typed as never for some reson
    name: "contact_numbers",
  });

  const {
    fields: allergyFields,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    // @ts-expect-error name is typed as never for some reason
    name: "allergies",
    control: form.control,
  });

  const [allergyChecked, setAllergyChecked] = useState(false);
  const watchSr = watch("address.sr", "");
  const watchNw = watch("use_nw_hn", false);

  const skip = 0;
  const limit = 0;

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

  const { data: diagnosis, isLoading: isGettingDiagnosis } =
    useGetChildDiagnoses({ skip, limit, type: "new" });

  const town =
    watchSr &&
    townshipData?.data.filter((tsp) => tsp.p_code.startsWith(watchSr));

  const handleStateChange = (val: string | null) => {
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
    navigate("/patients");
  };

  const handleOnSubmit: SubmitHandler<ChildDto> = (data) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (patient) {
      if (patient?.allergies.length) {
        setAllergyChecked(true);
      }

      reset(resetPatient(patient));
    }
  }, [patient, reset]);

  return (
    <div>
      <Header
        title={
          isEditing === true ? "Edit Patient(Child)" : "Add New Patient (Child)"
        }
      />
      {isGettingDiagnosis ||
      isGettingConsultants ||
      isGettingState ||
      isGettingTown ? (
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
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Radio.Group
                      label="Gender"
                      value={field.value || undefined}
                      onChange={field.onChange}
                      withAsterisk
                      error={errors.gender?.message}
                    >
                      <Group mt="xs">
                        <Radio value="male" label="Male" />
                        <Radio value="female" label="Female" />
                      </Group>
                    </Radio.Group>
                  )}
                />
                <div className="flex gap-x-4 mt-4 items-center">
                  {patient ? (
                    <>
                      <div className="flex flex-col mr-4">
                        <Text size="sm" fw={600} className="mb-2">
                          Use N.W
                        </Text>
                        {patient?.use_nw_hn === true && <FaCheck />}
                      </div>
                      <div>
                        <Text size="sm" fw={600} className="mb-1">
                          HN(Hospital No)
                        </Text>
                        <Text>{patient?.hn}</Text>
                      </div>
                    </>
                  ) : (
                    <>
                      <Controller
                        control={control}
                        name="use_nw_hn"
                        render={({ field }) => (
                          <Checkbox
                            label="Use N.W"
                            checked={field.value}
                            onChange={(event) => {
                              setValue(
                                "use_nw_hn",
                                event.currentTarget.checked,
                              );
                              resetField("hn");
                            }}
                          />
                        )}
                      />
                      {!watchNw && (
                        <TextInput
                          label="HN (Hospital No.)"
                          type="number"
                          placeholder="HN.."
                          withAsterisk
                          {...register("hn")}
                          error={errors?.hn?.message}
                        />
                      )}
                    </>
                  )}
                </div>
                <TextInput
                  label="Care Taker Name"
                  withAsterisk
                  placeholder="Name..."
                  {...register("caretaker")}
                  error={errors.caretaker?.message}
                />
                <div className="flex mb-0">
                  <Text size="sm" fw={600}>
                    Care Taker Phone(s)
                  </Text>
                  <FaPlusSquare
                    className="text-primary-600 mt-1 ms-1"
                    onClick={() => appendContact("")}
                  />
                </div>
                {contactFields.map((item, index) => (
                  <div key={item.id} className="flex gap-x-2 items-center">
                    <TextInput
                      label={index === 0 ? "Account" : "Other"}
                      placeholder="Phone..."
                      withAsterisk={index === 0}
                      {...register(`contact_numbers.${index}`)}
                      error={errors.contact_numbers?.[index]?.message}
                    />
                    {index > 0 && (
                      <Button
                        onClick={() => removeContact(index)}
                        className="mt-6 bg-error-300 hover:bg-error-400"
                      >
                        <FaWindowClose />
                      </Button>
                    )}
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-0">
                  *** Please use the following formats (+959123456789,
                  09123456789)
                </p>
                <TextAreaInputWithRef
                  label="Past History and Remark"
                  placeholder="Here..."
                  {...register("past_history")}
                />
              </div>
              <div className="flex flex-col gap-y-4 me-6 ms-6 md:ms-0">
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
                <Select
                  label="Consultant Name"
                  value={watch("consultant")}
                  onChange={(val) => setValue("consultant", val || "")}
                  data={consultants?.consultants.map(
                    (consultant) => consultant.name,
                  )}
                />

                <Select
                  label="Past Diagnosis"
                  value={watch("past_diagnosis")}
                  onChange={(val) => setValue("past_diagnosis", val || "")}
                  // onChange={(val) => setValue("past_diagnosis", val)}
                  data={diagnosisOptions}
                />
                <Controller
                  control={control}
                  name="anthropometry_date_for_weight"
                  render={({ field }) => (
                    <DatePickerInput
                      label="Anthropometry Date for Weight"
                      className="w-1/2"
                      placeholder="Pick a Date"
                      value={field.value ? dayjs(field.value).toDate() : null}
                      onChange={field.onChange}
                    />
                  )}
                />

                <div className="flex gap-x-2 items-center">
                  <TextInput
                    size="sm"
                    label="Weight"
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
                <div className="flex gap-x-4">
                  <Controller
                    control={control}
                    name="anthropometry_date_for_height"
                    render={({ field }) => (
                      <DatePickerInput
                        label="Anthropometry Date for Height"
                        value={field.value ? dayjs(field.value).toDate() : null}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <TextInput
                    size="sm"
                    label="Height(cm)"
                    placeholder="Height..."
                    className="w-1/3"
                    type="number"
                    {...register("height.value")}
                  />
                </div>
                <div className="flex gap-x-4 mt-4">
                  <Controller
                    control={control}
                    name="g6pd"
                    render={({ field }) => (
                      <Checkbox
                        label="G6PD"
                        checked={field.value}
                        onChange={(event) => {
                          field.onChange(event.currentTarget.checked);
                        }}
                      />
                    )}
                  />
                  <div>
                    <div className="flex">
                      <Checkbox
                        label="Allergy"
                        checked={allergyChecked}
                        onChange={(e) =>
                          setAllergyChecked(e.currentTarget.checked)
                        }
                      />
                      {allergyChecked && (
                        <div onClick={() => appendAllergy("")}>
                          <FaPlusSquare className="text-primary-600" />
                        </div>
                      )}
                    </div>
                    {allergyChecked &&
                      allergyFields.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center mt-4 gap-x-2"
                        >
                          <TextInput
                            size="sm"
                            placeholder="Allergy..."
                            {...register(`allergies.${index}`)}
                          />
                          <Button
                            onClick={() => removeAllergy(index)}
                            className="bg-error-300 hover:bg-error-400"
                          >
                            <FaWindowClose />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
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
