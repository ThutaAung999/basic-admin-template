import { Pagination } from "@/components";
import { MotherRegisteredPatientTable } from "..";
import { getMotherPatientsList, useGetMotherPatientList } from "..";
import { useBaseFilter } from "@/hooks";
import { MotherPatientListTabRightSection } from "../..";
import { toast } from "@/libs/mantine-toast";
import { Patient } from "../..";
import { calculateAge, formatDate } from "@/features/utils";

export const MotherRegisteredUsersRoute = () => {
  const { getAllSearchParams, onPaginate } = useBaseFilter();
  const {
    limit = 10,
    search,
    start,
    end,
    page = 1,
    last_customer_type = undefined,
    filter_type,
  } = getAllSearchParams();
  const { data, isLoading } = useGetMotherPatientList({
    limit,
    search,
    last_customer_type,
    skip: (page - 1) * limit,
    start,
    end,
    filter_type,
  });
  return (
    <div>
      <MotherRegisteredPatientTable
        data={data?.data || []}
        isLoading={isLoading}
      />
      {data ? (
        <div className="my-5 border border-separate">
          <Pagination
            value={parseInt(page)}
            total={Math.ceil(data?.count / limit)}
            onChange={onPaginate}
          />
        </div>
      ) : null}
    </div>
  );
};

export const MotherRegisteredUsersRouteRightPanel = () => {
  const { getAllSearchParams } = useBaseFilter();
  const { start, end, search } = getAllSearchParams();
  const getData = async () => {
    try {
      const { data } = await getMotherPatientsList({
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
      Diagnosis: item?.diagnosis ? item?.diagnosis : "-",
      CareTaker: `${item?.caretaker}${item?.contact_numbers ?? ""}`,
      //CareTaker: `${item?.app_user?.name}\n${item?.app_user?.phone_number ?? ""}`,
      Membership: item.membership_status ? item.membership_status : "-",
      CreatedDate: `${formatDate(item.createdAt)}`,
      PurchaseDate: `${formatDate(item.last_purchased_date)}`,
      ExpireddDate: `${formatDate(item.expiration_date)}`,
      AppUser: `${item?.app_user?.name ? item?.app_user?.name : "Someone"}${item?.app_user?.phone_number}`,
      Version: item?.app_user?.app_version ? item?.app_user?.app_version : "-",
    };
  };
  return (
    <MotherPatientListTabRightSection
      exportProps={{
        getData,
        format,
        filename: "mother_registered_users_export.csv",
      }}
    />
  );
};
