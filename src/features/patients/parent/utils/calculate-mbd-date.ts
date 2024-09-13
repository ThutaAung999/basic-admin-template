import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
dayjs.extend(utc);
dayjs.extend(duration);
export const calculateMbdDate = (lmp_date: Date) => {
  const today = dayjs.utc();
  const lmpDate = dayjs.utc(lmp_date);

  const totalDays = today.diff(lmpDate, "days");
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  return `${weeks} weeks ${days !== 0 ? days + " days" : ""}`;
};
