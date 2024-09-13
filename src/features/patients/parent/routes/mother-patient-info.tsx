import { Button, Header, Table } from "@/components";
import {
  Badge,
  Card,
  Divider,
  SimpleGrid,
  Tabs,
  Text,
  TextProps as MantineTextProps,
  Loader,
} from "@mantine/core";
import { CiEdit } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineClipboard } from "react-icons/hi2";
import { MotherCallLogForm } from "./add-call-log";
import { MotherSaleForm } from "./add-sale";
import { useDisclosure } from "@mantine/hooks";
import { UploadMotherEmr } from "./add-emr";
import {
  useGetMotherCallLogsById,
  useGetMotherPatientById,
  useGetMotherSaleById,
} from "../api";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useState } from "react";
import { getDueDate } from "../utils/get-due-date";
import { calculateMbdDate } from "../utils";
interface TextProps extends MantineTextProps {
  header: string;
  data?: string | number;
  className?: string;
}

const InfoText = ({ header, data, className = "", ...props }: TextProps) => {
  return (
    <div>
      <Text size="xs" className={`text-gray-500 ${className}`} {...props}>
        {header}
      </Text>
      <Text className="text-wrap">
        {data !== undefined && data !== null && data !== "" ? data : "-"}
      </Text>
    </div>
  );
};

const tableHeaders = {
  type: "Type",
  start: "Start",
  end: "End",
  callNo: "Caller No",
  chiefComplaint: "Chief Complaint",
  hopi: "HOPI",
  initialTreatement: "Initial Treatement",
  callDiagnosis: "Call Diagnosis",
  followUp: "Follow Up",
  user: "User",
};

const saleTableHeaders = {
  type: "Type",
  purchasedDate: "Purchased Date",
  expiredDate: "Expiration Date",
  duration: "Duration(Days)",
  amount: "Amount",
  paymentMethod: "Payment Method",
  remark: "Remark",
  careTaker: "Care Taker",
  membership: "Membership",
};

export const MotherPatientInfo = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string | null>("basic-info");

  // more convenient if data type is same like list type so don't need to get patient id separately
  const { data: motherData, isLoading: isGettingMotherData } =
    useGetMotherPatientById({
      id,
    });

  const { data: callLogs } = useGetMotherCallLogsById({
    id,
  });

  // need to change the data type in api when sale merge
  const { data: sales } = useGetMotherSaleById({
    id,
  });

  const [isOpen, { open, close }] = useDisclosure();
  const [isSaleOpen, { open: saleOpen, close: saleClose }] = useDisclosure();

  const motherDob = motherData?.dob;

  const ageInYears = dayjs().diff(dayjs(motherDob), "year");
  const ageInMonths = dayjs().diff(
    dayjs(motherDob).add(ageInYears, "year"),
    "month",
  );

  const edd =
    motherData && motherData.lmp_date
      ? getDueDate({
          lmp_date: motherData.lmp_date,
          due_date: motherData?.due_date,
        })
      : null;

  return (
    <div>
      <Header title="Registered Patient Info(Mother)" />
      {isGettingMotherData && (
        <div className="flex">
          <Loader size="xl" className="mx-auto mt-10" />
        </div>
      )}
      {motherData && (
        <div className="bg-white border rounded-md m-10">
          <SimpleGrid cols={{ xs: 1, sm: 2 }} spacing={"xl"} className="py-4">
            <div className="flex justify-around items-center">
              <div className="ms-4">
                <Text>{motherData?.name}</Text>
                <Text className="text-gray-500 font-semibold text-xs">
                  {motherData?.patient_number}
                </Text>
              </div>
              <Text>{`${ageInYears === 0 ? "" : ` ${ageInYears} yr`}  ${ageInMonths} mo`}</Text>
              <Text>{motherData?.last_customer_type}</Text>
              <div>
                <Text className="text-gray-500 font-semibold text-xs">
                  Contact:
                </Text>
                <Text>
                  {motherData?.contact_numbers.map((ph: number | string) => ph)}
                </Text>
              </div>
            </div>
            <div className=" flex gap-x-2 justify-evenly md:justify-end md:mr-8">
              <Button onClick={() => open()}>
                <LuPhoneCall size={15} className="mr-2" />
                ADD CALL
              </Button>
              <Button onClick={() => saleOpen()}>
                <HiOutlineClipboard size={20} className="mr-1" />
                ADD SALE
              </Button>
              <Link to="edit">
                <Button className="bg-secondary-500 hover:bg-secondary-600 ">
                  <CiEdit size={20} className="mr-1" />
                  EDIT
                </Button>
              </Link>
            </div>
          </SimpleGrid>
          <Divider />
          <div>
            <Tabs
              defaultValue="basic-info"
              value={activeTab}
              onChange={setActiveTab}
              className="mx-8 py-4"
            >
              <Tabs.List>
                <Tabs.Tab value="basic-info" className="text-base md:px-8">
                  BASIC INFO
                </Tabs.Tab>
                <Tabs.Tab value="call-logs" className="text-base md:px-8">
                  CALL LOGS
                  <Badge className="absolute top-0 bg-error-300">
                    {callLogs?.count}
                  </Badge>
                </Tabs.Tab>
                <Tabs.Tab value="sales" className="text-base md:px-12">
                  SALES
                  <Badge className="absolute top-0 bg-error-300">
                    {sales?.count}
                  </Badge>
                </Tabs.Tab>
                <Tabs.Tab value="emr-photos" className="text-base md:px-8">
                  EMR PHOTOS
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="basic-info">
                <Card
                  padding="lg"
                  radius="md"
                  withBorder
                  className="my-6 w-11/12 mx-auto"
                >
                  <SimpleGrid cols={4} verticalSpacing="xl">
                    <InfoText
                      header="Caretaker :"
                      data={motherData?.caretaker}
                    />
                    <InfoText
                      header="Caretaker's Phone :"
                      data={motherData?.caretaker_contact_number}
                    />
                    <InfoText
                      header="Past Diagnosis :"
                      data={motherData?.diagnosis}
                    />
                    <InfoText
                      header="Consultant :"
                      data={motherData?.consultant}
                    />
                    <InfoText
                      header="Anthropometry Date :"
                      data={
                        motherData?.anthropometry_date_for_weight
                          ? dayjs(
                              motherData?.anthropometry_date_for_weight,
                            ).format("MMM DD, YYYY")
                          : "-"
                      }
                    />
                    <InfoText
                      header="Weight :"
                      data={
                        motherData?.weight
                          ? `${motherData?.weight?.value} ${motherData?.weight?.unit}`
                          : "-"
                      }
                    />
                    <InfoText
                      header="Anthropometry Date :"
                      data={
                        motherData?.anthropometry_date_for_height
                          ? dayjs(
                              motherData?.anthropometry_date_for_height,
                            ).format("MMM DD, YYYY")
                          : "-"
                      }
                    />
                    <InfoText
                      header="Height :"
                      data={
                        motherData?.height
                          ? `${motherData?.height?.value} ${motherData?.height?.unit}`
                          : "-"
                      }
                    />
                    <InfoText
                      header="Membership Status :"
                      data={motherData?.membership_status}
                    />
                    <InfoText
                      header="Gravida(Numbers of Pregnancy) :"
                      data={motherData?.gravida}
                    />
                    <InfoText
                      header="Parity(Numbers of children) :"
                      data={motherData?.parity}
                    />
                    <InfoText header="Allergy :" data={motherData?.allergy} />
                    <InfoText
                      header="Previous history of contraception :"
                      data={motherData?.contraception_history}
                    />
                    <InfoText
                      header="Menstrual, Obsteric, Gynaecological :"
                      data={motherData?.menstrual_description}
                    />
                    <InfoText
                      header="Medical and Surgical History :"
                      data={motherData?.medical_history}
                    />
                    <InfoText
                      header="Drug Historty :"
                      data={motherData?.drugs || ""}
                    />
                    <InfoText
                      header="Family and Personal Condition :"
                      data={motherData?.family_personal_condition}
                    />
                    <InfoText
                      header="History of present pregnancy :"
                      data={motherData?.pregnancy_description}
                    />
                    <InfoText
                      header="LMP Date :"
                      data={
                        motherData?.lmp_date
                          ? dayjs(motherData?.lmp_date).format("MMM DD , YYYY")
                          : "-"
                      }
                    />
                    <InfoText
                      header="EDD Date :"
                      data={edd ? dayjs(edd).format("MMM DD, YYYY") : "-"}
                    />
                    <InfoText
                      header="MBD Date :"
                      data={calculateMbdDate(motherData?.lmp_date)}
                    />
                    <InfoText
                      header="Address :"
                      data={`${motherData?.address?.sr?.name} , ${motherData?.address?.township?.name}`}
                    />
                    <InfoText header="Remark :" data={motherData?.remark} />
                    <InfoText
                      header="Has Delivered Baby :"
                      data={
                        motherData?.has_delivered_baby == undefined
                          ? "-"
                          : motherData?.has_delivered_baby
                            ? "Yes"
                            : "No"
                      }
                    />
                  </SimpleGrid>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="call-logs">
                <div className="my-6 shadow-md">
                  {callLogs && (
                    <Table
                      noDataMessage="No data available"
                      data={callLogs?.data}
                      headerMapping={tableHeaders}
                      renderCells={(data) => ({
                        type: data?.call_type || "-",
                        start:
                          dayjs(data?.call_start_time).format(
                            "MMM DD YYYY, hh:mm A",
                          ) || "-",
                        end:
                          dayjs(data?.call_end_time).format(
                            "MMM DD YYYY, hh:mm A",
                          ) || "-",
                        callNo: data?.phone || "-",
                        chiefComplaint: data?.chief_complaint || "-",
                        hopi: data?.hopi || "-",
                        initialTreatement: data?.initial_treatment || "-",
                        callDiagnosis: data?.diagnosis?.name || "-",
                        followUp: data?.follow_up ? <FaCheck /> : "-",
                        user: data?.user?.name || "-",
                      })}
                      keyExtract={"_id"}
                    />
                  )}
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="sales">
                <div className="my-6 shadow-md">
                  {sales && (
                    <Table
                      noDataMessage="No data available"
                      data={sales?.data}
                      headerMapping={saleTableHeaders}
                      // need to adjust data dto if sale merge
                      renderCells={(data) => ({
                        type: data?.customer_type || "-",
                        purchasedDate:
                          dayjs(data?.purchase_date).format("MMM DD YYYY") ||
                          "-",
                        expiredDate:
                          dayjs(data?.expiration_date).format("MMM DD YYYY") ||
                          "-",
                        duration: data?.duration || "-",
                        amount: data?.amount ? `MMK ${data?.amount} ` : "-",
                        paymentMethod:
                          data?.payment_provider.toUpperCase() || "-",
                        remark: data?.remark || "-",
                        careTaker: motherData?.caretaker || "-",
                        // need to adjust type so don't get error
                        membership:
                          data?.is_extension === true
                            ? "Extension"
                            : data?.is_extension === false
                              ? "New Member"
                              : "-",
                      })}
                      keyExtract={"payment_provider"}
                    />
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="emr-photos">
                <UploadMotherEmr images={motherData?.imageUrls} />
              </Tabs.Panel>
            </Tabs>
            <Divider />
            <div className="grid justify-items-end mt-4 mr-10">
              <Link to="/mothers/patients">
                <Button className="mb-8">BACK</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <MotherCallLogForm
        isOpen={isOpen}
        close={close}
        patient={motherData}
        setActiveTab={setActiveTab}
      />
      <MotherSaleForm
        isOpen={isSaleOpen}
        close={saleClose}
        patient={motherData}
      />
    </div>
  );
};
