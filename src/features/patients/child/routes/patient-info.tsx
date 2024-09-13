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
  Tooltip,
} from "@mantine/core";
import { CiEdit } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineClipboard } from "react-icons/hi2";
import { CallLogForm } from "./add-call-log";
import { AddSaleForm } from "./add-sale";
import { useDisclosure } from "@mantine/hooks";
import { UploadPhoto } from "./add-emr";
import dayjs from "dayjs";
import { useGetChildCallLogsById, useGetPatientById } from "../api";
import { IoFemaleOutline } from "react-icons/io5";
import { IoIosMale } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetChildSalesById } from "../api/get-child-sale";
import { ReactNode, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ChildSaleDeleteModal } from "../components/child-sale-delete-modal";
import { FaInfoCircle } from "react-icons/fa";
import { CallRecord } from "@/features/calllogs";
import { CallLogModal } from "../../../calllogs/routes/call-log-modal";

interface TextProps extends MantineTextProps {
  header: string;
  data?: ReactNode;
  className?: string;
}

const InfoText = ({ header, data, className = "", ...props }: TextProps) => {
  return (
    <div>
      <Text
        size="xs"
        className={`text-gray-500 mb-1 text-nowrap ${className}`}
        {...props}
      >
        {header}
      </Text>
      <Text size="base" className="text-wrap">
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
  medicineRequired: "Medicine",
  chiefComplaint: "Chief Complaint",
  hopi: "HOPI",
  initialTreatement: "Initial Treatement",
  callDiagnosis: "Call Diagnosis",
  user: "User",
  action: "",
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
  action: "",
};

export const PatientInfo = () => {
  const { id } = useParams();
  const [saleId, setSaleId] = useState<string>("");
  const [callLog, setCallLog] = useState<CallRecord | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("basic-info");

  const { data: childData, isLoading: isGettingChildData } = useGetPatientById({
    id,
  });

  const { data: callLogs } = useGetChildCallLogsById({
    id,
  });

  const { data: sales } = useGetChildSalesById({
    id,
  });

  const [isOpen, { open, close }] = useDisclosure();
  const [isSaleOpen, { open: saleOpen, close: saleClose }] = useDisclosure();
  const [isDeleteSaleOpen, { open: deleteSaleOpen, close: deleteSaleClose }] =
    useDisclosure();
  const [
    isCallLogDetailOpen,
    { open: callLogDetailOpen, close: callLogDetailClose },
  ] = useDisclosure();

  const childDob = childData?.dob;

  const ageInYears = dayjs().diff(dayjs(childDob), "year");
  const ageInMonths = dayjs().diff(
    dayjs(childDob).add(ageInYears, "year"),
    "month",
  );

  return (
    <div>
      <Header title="Registered Patient Info(Child)" />
      {isGettingChildData && (
        <div className="flex">
          <Loader size="xl" className="mx-auto mt-10" />
        </div>
      )}
      {childData && (
        <div className="bg-white border rounded-md m-10">
          <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={"xl"} className="py-4">
            <div className="flex ms-10 items-center">
              <div className="me-8">
                <Text>{childData?.name}</Text>
                <Text className="text-gray-500 font-semibold text-xs">
                  {`HN: ${childData?.hn}`}
                </Text>
              </div>
              <div className="flex items-center">
                <Text className="me-2">
                  {childData?.gender === "female" ? (
                    <IoFemaleOutline />
                  ) : (
                    <IoIosMale />
                  )}
                </Text>
                <Text>{`${ageInYears === 0 ? "" : ` ${ageInYears} yr`}  ${ageInMonths} mo`}</Text>
              </div>
              <Text size="lg" className="ml-4">
                {childData?.last_customer_type}
              </Text>
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
                <Button className="bg-secondary-500 hover:bg-secondary-600">
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
                {/* should separate tabs.panels into another file  */}
                <Card
                  padding="lg"
                  radius="md"
                  withBorder
                  className="my-6 w-11/12 mx-auto"
                >
                  <SimpleGrid
                    cols={{ base: 3, sm: 4, md: 5 }}
                    verticalSpacing="xl"
                  >
                    <InfoText
                      header="Caretaker :"
                      data={childData?.caretaker}
                    />
                    <InfoText
                      header="Caretaker's Phone :"
                      data={childData?.contact_numbers}
                    />
                    <InfoText
                      header="Past Diagnosis :"
                      data={childData?.past_diagnosis}
                    />
                    <InfoText
                      header="Past History and Remark :"
                      data={childData?.past_history}
                    />
                    <InfoText
                      header="Consultant :"
                      data={childData?.consultant}
                    />
                    <InfoText
                      header="Anthropometry Date :"
                      data={
                        childData?.anthropometry_date_for_weight
                          ? dayjs(
                              childData?.anthropometry_date_for_weight,
                            ).format("MMM DD, YYYY")
                          : "-"
                      }
                    />
                    <InfoText
                      header="Weight :"
                      data={
                        childData?.weight
                          ? `${childData?.weight?.value} ${childData?.weight?.unit}`
                          : "-"
                      }
                    />
                    <InfoText
                      header="Anthropometry Date :"
                      data={
                        childData?.anthropometry_date_for_height
                          ? dayjs(
                              childData?.anthropometry_date_for_height,
                            ).format("MMM DD, YYYY")
                          : "-"
                      }
                    />
                    <InfoText
                      header="Height :"
                      data={
                        childData?.height
                          ? `${childData?.height?.value} ${childData?.height?.unit}`
                          : "-"
                      }
                    />
                    <InfoText
                      header="Membership Status :"
                      data={childData?.membership_status}
                    />
                    <InfoText
                      header="G6PD :"
                      data={childData?.g6pd === true ? "Yes" : "No"}
                    />
                    <InfoText
                      header="Allergies :"
                      data={
                        childData?.allergies?.length
                          ? childData.allergies.map(
                              (allergy: string, index: number) =>
                                allergy.trim().length === 0 ? (
                                  "-"
                                ) : (
                                  <li key={index}>{allergy}</li>
                                ),
                            )
                          : "-"
                      }
                    />
                    <InfoText
                      header="Address :"
                      data={`${childData?.address?.sr?.name} , ${childData?.address?.township?.name}`}
                    />
                  </SimpleGrid>
                </Card>
              </Tabs.Panel>

              <Tabs.Panel value="call-logs">
                <div className="my-6 shadow-md">
                  {callLogs && (
                    <>
                      <Table
                        noDataMessage="No data available"
                        data={callLogs?.data}
                        headerMapping={tableHeaders}
                        renderCells={(data) => ({
                          type: data?.call_type || "-",
                          start:
                            dayjs(data?.call_start_time).format(
                              "MMM DD, YYYY, hh:mm A",
                            ) || "-",
                          end:
                            dayjs(data?.call_end_time).format(
                              "MMM DD, YYYY, hh:mm A",
                            ) || "-",
                          callNo: data?.phone || "-",
                          medicineRequired:
                            data?.is_medicine_required === true
                              ? "Yes"
                              : data?.is_medicine_required === false
                                ? "NO"
                                : "-",
                          chiefComplaint: data?.chief_complaint || "-",
                          hopi: data?.hopi || "-",
                          initialTreatement: data?.initial_treatment || "-",
                          callDiagnosis: data?.diagnosis?.name || "-",
                          user: data?.user?.name || "-",
                          action: (
                            <Tooltip label="Detail">
                              <div
                                onClick={() => {
                                  callLogDetailOpen();
                                  setCallLog(data);
                                }}
                              >
                                <FaInfoCircle
                                  size={20}
                                  className=" text-primary-600"
                                />
                              </div>
                            </Tooltip>
                          ),
                        })}
                        keyExtract={"_id"}
                      />
                      <CallLogModal
                        opened={isCallLogDetailOpen}
                        onClose={callLogDetailClose}
                        selectedRow={callLog}
                      />
                    </>
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
                        careTaker: childData?.caretaker || "-",
                        // need to adjust type so don't get error
                        membership:
                          data?.is_extension === true
                            ? "Extension"
                            : data?.is_extension === false
                              ? "New Member"
                              : "-",
                        action: (
                          <Tooltip label="Remove">
                            <div
                              onClick={() => {
                                deleteSaleOpen();
                                setSaleId(data?._id);
                              }}
                            >
                              <MdDelete size={25} fill="red" />
                            </div>
                          </Tooltip>
                        ),
                      })}
                      keyExtract={"payment_provider"}
                    />
                  )}
                </div>
                <ChildSaleDeleteModal
                  id={saleId}
                  isOpen={isDeleteSaleOpen}
                  close={deleteSaleClose}
                />
              </Tabs.Panel>

              <Tabs.Panel value="emr-photos">
                <UploadPhoto images={childData?.imageUrls} />
              </Tabs.Panel>
            </Tabs>
            <Divider />
            <div className="grid justify-items-end mt-4 mr-10">
              <Link to="/patients">
                <Button className="mb-8">BACK</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <CallLogForm
        isOpen={isOpen}
        close={close}
        patient={childData}
        setActiveTab={setActiveTab}
      />
      <AddSaleForm isOpen={isSaleOpen} close={saleClose} patient={childData} />
    </div>
  );
};
