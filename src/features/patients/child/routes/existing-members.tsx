import { Pagination } from "@/components";
import { ExistingMemberList } from "..";
import { getChildPatientsList, useGetChildPatientList } from "..";
import { useBaseFilter } from "@/hooks";
import { PatientListTabRightSection } from "../..";
import { toast } from "@/libs/mantine-toast";
import { Patient } from "../../types";
import { calculateAge, formatDate, formatDateTime } from "@/features/utils";

export const ExistingMembersRoute = () => {
  const { getAllSearchParams, onPaginate } = useBaseFilter();
  const {
    limit = 10,
    search,
    start,
    end,
    page = 1,
    last_customer_type = undefined,
  } = getAllSearchParams();
  const { data, isLoading } = useGetChildPatientList({
    limit,
    search,
    last_customer_type,
    patient_type: "subscriber",
    skip: (page - 1) * limit,
    start,
    end,
  });

  return (
    <div>
      <ExistingMemberList data={data?.data || []} isLoading={isLoading} />
      {data ? (
        <div className="my-5 border border-separate">
          <Pagination
            value={parseInt(page)}
            total={Math.ceil(data.count / limit)}
            onChange={onPaginate}
          />
        </div>
      ) : null}
    </div>
  );
};

export const ExistingMembersRightPanel = () => {
  const { getAllSearchParams } = useBaseFilter();
  const { start, end, search } = getAllSearchParams();
  const getData = async () => {
    try {
      const { data } = await getChildPatientsList({
        last_customer_type: undefined,
        search,
        start,
        end,
        limit: 0,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ message: error.message });
      }
    }
  };
  const format = (item: Patient) => {
    return {
      Name: item.name,
      Age: calculateAge(item.dob),
      Type: item.last_customer_type,
      Diagnosis: item?.past_diagnosis ? item?.past_diagnosis : "-",
      CareTaker: `${item?.caretaker}${item?.contact_numbers ?? ""}`,
      Membership: item.membership_status,
      CreatedDate: `${formatDateTime(item.createdAt)}`,
      PurchaseDate: `${formatDate(item.last_purchased_date)}`,
      ExpireddDate: `${formatDate(item.expiration_date)}`,
      AppUser: `${item?.app_user?.name ? item?.app_user?.name : "Someone"}${item?.app_user?.phone_number}`,
      Version: item?.app_user?.app_version ? item?.app_user?.app_version : "-",
    };
  };
  return (
    <PatientListTabRightSection
      exportProps={{ getData, format, filename: "registered_users_export.csv" }}
    />
  );
};
