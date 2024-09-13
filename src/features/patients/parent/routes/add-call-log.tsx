import { useState, useEffect } from "react";
import {
  Checkbox,
  DatePickerInput,
  Select,
  TextInput,
  Button,
  Modal,
} from "@/components";
import {
  Group,
  Loader,
  Radio,
  SimpleGrid,
  Text,
  Textarea,
} from "@mantine/core";
import { DateTimePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MotherCallLogDto, motherCallLogSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMotherCallLog, useGetMotherDiagnosis } from "../api";
import { toast } from "@/libs/mantine-toast";
import { Mother } from "../../types";

export const MotherCallLogForm = ({
  isOpen,
  close,
  patient,
  setActiveTab,
}: {
  isOpen: boolean;
  close: () => void;
  patient?: Mother;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const [isRunning, setIsRunning] = useState(true);
  const [checked, setChecked] = useState(false);

  const { data: callDiagnosis, isLoading } = useGetMotherDiagnosis({
    skip: 0,
    limit: 0,
    type: "new",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<MotherCallLogDto>({
    resolver: zodResolver(motherCallLogSchema),
    defaultValues: {
      call_start_time: new Date(),
      phone: "",
      call_type: "",
      diagnosis: "",
      hopi: "",
      initial_treatment: "",
      chief_complaint: "",
    },
  });

  const callDiagnosisOptions =
    callDiagnosis?.data?.map((dia) => ({ value: dia._id, label: dia.name })) ||
    [];

  useEffect(() => {
    let timer: number | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentTime(dayjs().format("HH:mm:ss"));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (isOpen) {
      setIsRunning(true);
      setCurrentTime(dayjs().format("HH:mm:ss"));

      setValue("call_start_time", dayjs().toDate());
    }
  }, [isOpen, setValue]);

  const handleStop = () => {
    setIsRunning(false);

    const combinedDateTime = dayjs()
      .set("hour", parseInt(currentTime.split(":")[0]))
      .set("minute", parseInt(currentTime.split(":")[1]))
      .set("second", parseInt(currentTime.split(":")[2]));

    setValue("call_end_time", combinedDateTime.toDate());
  };

  const { mutate: createMotherCallLog } = useCreateMotherCallLog();

  const onSubmit: SubmitHandler<MotherCallLogDto> = (data) => {
    // const hn = "66b9b9114a6b34001532ebec";
    // need to add patient objectID like this(get from patient data)
    data.patient = patient?._id;
    createMotherCallLog(
      { data },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Patient Call log has created successfully.",
          });
          close();
          // need to check whether the fields reset or not
          reset();
          setChecked(false);
        },
      },
    );
  };

  const handleViewClick = () => {
    setActiveTab("call-logs");
    close();
  };

  return (
    <form id="call-log-form" onSubmit={handleSubmit(onSubmit)}>
      <Modal
        isOpen={isOpen}
        onClose={close}
        renderActionButton={() => (
          <Button form="call-log-form" type="submit">
            Create
          </Button>
        )}
        size="xl"
        title="Add Call Log"
      >
        {isLoading && <Loader />}
        {callDiagnosis && (
          <>
            <SimpleGrid cols={2} spacing="xl" className="mb-4">
              <div className="flex">
                <Text fw={500}>{patient?.name}</Text>
                <Text className=" text-gray-400 ms-2">
                  {patient?.patient_number}
                </Text>
              </div>
              <div className="justify-self-end">
                <Button onClick={handleViewClick}>VIEW CALL LOGS</Button>
              </div>
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" className="mb-8">
              <div className="flex flex-col gap-y-4">
                <Controller
                  name="call_start_time"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      label="Call Start Time"
                      value={field.value}
                      disabled
                      withSeconds
                      withAsterisk
                    />
                  )}
                />
                <div className="flex items-end gap-x-4">
                  <Controller
                    name="call_end_time"
                    control={control}
                    render={({ field }) => (
                      <TimeInput
                        label="Call End Time"
                        withSeconds
                        value={currentTime}
                        onChange={field.onChange}
                        // need to change
                        disabled
                        withAsterisk
                        error={errors?.call_end_time?.message}
                      />
                    )}
                  />
                  <Button
                    className=" bg-error-300 hover:bg-error-400"
                    onClick={handleStop}
                    disabled={!isRunning}
                    size="sm"
                  >
                    Stop
                  </Button>
                </div>
                <TextInput
                  label="Caller No"
                  withAsterisk
                  type="number"
                  placeholder="09 xxx xxx xxx"
                  {...register("phone")}
                  error={errors?.phone?.message}
                />
                <Controller
                  name="call_type"
                  control={control}
                  render={({ field }) => (
                    <Radio.Group
                      label="Call Type"
                      withAsterisk
                      {...field}
                      error={errors?.call_type?.message}
                    >
                      <Group mt="xs">
                        <Radio value="incoming" label="Incoming" />
                        <Radio value="outgoing" label="Outgoing" />
                      </Group>
                    </Radio.Group>
                  )}
                />
                <Controller
                  name="diagnosis"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onChange={field.onChange}
                      data={callDiagnosisOptions}
                      label="Call Diagnosis"
                      withAsterisk
                      error={errors?.diagnosis?.message}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex md:mt-6 gap-x-4">
                  {/* Mother field */}
                  <Checkbox
                    label="Need follow up"
                    checked={checked}
                    onChange={(e) => setChecked(e.currentTarget.checked)}
                  />
                </div>
                {checked && (
                  <>
                    <Controller
                      name="follow_up_date"
                      control={control}
                      render={({ field }) => (
                        <DatePickerInput
                          label="Follow Up Date"
                          value={
                            field.value ? dayjs(field.value).toDate() : null
                          }
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <Textarea
                      label="Follow up comment"
                      placeholder="here..."
                      {...register("follow_up_reason")}
                    />
                  </>
                )}
                <Textarea
                  label="Chief Complaint"
                  placeholder="chief complaint..."
                  {...register("chief_complaint")}
                />
                <Textarea
                  label="HOPI"
                  placeholder="hopi..."
                  {...register("hopi")}
                />
                <Textarea
                  label="Initial Treatment"
                  placeholder="initial treatment..."
                  {...register("initial_treatment")}
                />
              </div>
            </SimpleGrid>
          </>
        )}
      </Modal>
    </form>
  );
};
