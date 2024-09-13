import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export const getDueDate = ({
  due_date,
  lmp_date,
}: {
  due_date?: Date | null;
  lmp_date: Date;
}) => {
  if (!due_date) {
    if (lmp_date) {
      return dayjs(lmp_date).add(280, "day").utc().toISOString();
    }
    return null;
  }
  return due_date;
};
