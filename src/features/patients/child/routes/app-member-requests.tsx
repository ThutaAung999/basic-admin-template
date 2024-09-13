import { Pagination } from "@/components/ui";
import { AppMemberRequest } from "..";
import { getPackageSubscription, useGetPackageSubscription } from "..";
import { useBaseFilter } from "@/hooks";
import { toast } from "@/libs/mantine-toast";
import { PatientSubscription } from "../../types";
import { PatientListTabRightSection } from "../..";
import { formatDate } from "@/features/utils";

export const AppMemberRequestsRoute = () => {
  const { onPaginate, getAllSearchParams } = useBaseFilter();
  const {
    limit = 10,
    search,
    start,
    end,
    page = 1,
    member_type,
  } = getAllSearchParams();
  const requestMembersResult = useGetPackageSubscription({
    limit,
    search,
    patient_type: "child",
    status: "pending",
    skip: (page - 1) * limit,
    start,
    end,
    member_type,
  });
  return (
    <div>
      <AppMemberRequest
        data={requestMembersResult.data?.data || []}
        isLoading={requestMembersResult.isLoading}
      />
      {requestMembersResult.data ? (
        <div className="my-5 border border-separate">
          <Pagination
            value={parseInt(page)}
            total={Math.ceil(requestMembersResult.data.count / limit)}
            onChange={onPaginate}
          />
        </div>
      ) : null}
    </div>
  );
};

export const AppMemberRequestsRightPanel = () => {
  const { getAllSearchParams } = useBaseFilter();
  const { start, end, search, member_type } = getAllSearchParams();
  const getData = async () => {
    try {
      const { data } = await getPackageSubscription({
        member_type,
        search,
        start,
        end,
        patient_type: "child",
        status: "pending",
        limit: 0,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ message: error.message });
      }
    }
  };
  const format = (item: PatientSubscription) => {
    return {
      Req_Date_Time: `${item.purchase_date}`,
      Name: item.patient?.name,
      CareTaker: `${item?.patient.caretaker}${item?.patient?.contact_numbers ?? ""}`,
      Month: `${item?.plan?.duration}${item?.plan?.price ?? ""}${item?.plan?.title}`,
      Member: ` ${item?.patient.last_purchased_date ? "ReNew" : "New Member"}`,
      PurchaseDate: `${formatDate(item?.patient?.last_purchased_date)}`,
      ExpiredDate: `${formatDate(item?.patient?.expiration_date)}`,
      CallStatus: item?.call_status ? item?.call_status : "-",
      Remark: item?.remark ? item?.remark : "-",
      App_Version: item?.patient?.app_user?.app_version,
    };
  };
  return (
    <PatientListTabRightSection
      exportProps={{
        getData,
        format,
        filename: "mother_app_member_requests_export.csv",
      }}
      showAddNewPatientButton={false}
    />
  );
};
