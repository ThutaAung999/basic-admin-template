import {
  DatePickerInput,
  Select,
  TextInput,
  Button,
  Modal,
} from "@/components";
import { Group, Radio, SimpleGrid, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MotherSaleDto, motherSaleSchema, useCreateMotherSale } from "..";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "@/libs/mantine-toast";
import { Mother } from "../../types";
import { MOTHER_PATIENT_TYPES } from "@/features/followups";

const paymentMethod = [
  { value: "kbz", label: "KBZ" },
  { value: "kbzpay", label: "KBZ Pay" },
  { value: "cb", label: "CB" },
  { value: "aya", label: "AYA" },
  { value: "okdollar", label: "OK$" },
  { value: "wave", label: "Wave Money" },
  { value: "onepay", label: "One Pay" },
  { value: "cash", label: "Cash" },
  { value: "foc", label: "FOC" },
];

const saleDurations = [
  { label: "3 days", value: "3" },
  { label: "7 days", value: "7" },
  { label: "1 month", value: "31" },
  { label: "2 months", value: "62" },
  { label: "3 months", value: "93" },
  { label: "4 months", value: "124" },
  { label: "5 months", value: "155" },
  { label: "6 months", value: "186" },
  { label: "7 months", value: "217" },
  { label: "8 months", value: "248" },
  { label: "9 months", value: "279" },
  { label: "10 months", value: "310" },
  { label: "11 months", value: "341" },
  { label: "12 months", value: "372" },
];

export const MotherSaleForm = ({
  isOpen,
  close,
  patient,
}: {
  isOpen: boolean;
  close: () => void;
  patient?: Mother;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MotherSaleDto>({
    resolver: zodResolver(motherSaleSchema),
    defaultValues: {
      remark: "",
      amount: "",
    },
  });

  const { mutate: createMotherSale } = useCreateMotherSale();
  const onSubmit: SubmitHandler<MotherSaleDto> = (data) => {
    // need to add patient objectID like this(get from patient data)
    // const patient = "66b9b9114a6b34001532ebec";
    data.patient = patient?._id;
    reset();

    createMotherSale(
      { data },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Parient sale has added successfully.",
          });
          close();
          reset();
          // reset does not work , need to check
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="sale-form">
      <Modal
        isOpen={isOpen}
        onClose={close}
        renderActionButton={() => (
          <Button type="submit" form="sale-form">
            Confirm
          </Button>
        )}
        size="xl"
        title="Add Sale"
      >
        <div className="flex mb-4">
          <Text fw={500}>{patient?.name}</Text>
          <Text className=" text-gray-400 ms-2">{patient?.patient_number}</Text>
        </div>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" className="mb-8">
          <div className="flex flex-col gap-y-4">
            <Controller
              name="purchase_date"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <DatePickerInput
                  label="Purchase Date"
                  withAsterisk
                  value={field.value ? dayjs(field.value).toDate() : null}
                  onChange={field.onChange}
                  error={errors?.purchase_date?.message}
                />
              )}
            />
            <Controller
              name="package_plan"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Radio.Group
                  label="Package Type"
                  withAsterisk
                  {...field}
                  error={errors?.package_plan?.message}
                >
                  <Group mt="xs">
                    <Radio value="standard" label="Standard" />
                    <Radio value="yinthway_plus" label="Yin Thway Plus" />
                  </Group>
                </Radio.Group>
              )}
            />
            <Controller
              name="customer_type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  data={MOTHER_PATIENT_TYPES}
                  label="Customer Type"
                  withAsterisk
                  error={errors?.customer_type?.message}
                />
              )}
            />
            <TextInput
              label="Remark"
              placeholder="type remark"
              {...register("remark")}
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <TextInput
              label="Amount"
              withAsterisk
              placeholder="amount"
              type="number"
              {...register("amount")}
              error={errors?.amount?.message}
            />
            <Controller
              name="payment_provider"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  data={paymentMethod}
                  label="Payment Method"
                  withAsterisk
                  error={errors?.payment_provider?.message}
                />
              )}
            />
            <Controller
              name="duration"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value?.toString() || ""}
                  data={saleDurations}
                  label="Month"
                  withAsterisk
                  error={errors?.duration?.message}
                />
              )}
            />
          </div>
        </SimpleGrid>
      </Modal>
    </form>
  );
};
