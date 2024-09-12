import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

/* export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
 */

export const formatDate = (
  dateString: string,
  timeZone: string = dayjs.tz.guess(),
): string => {
  return dayjs(dateString).tz(timeZone).format("MMM DD, YYYY");
};

export const formatDateTime = (
  dateString: string,
  timeZone: string = dayjs.tz.guess(),
): string => {
  return dayjs(dateString).tz(timeZone).format("MMM DD, YYYY h:mm A");
};

export const calculateAge = (dob: string | Date): string => {
  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years !== 0)
    return `${years} yr${years !== 1 ? "s" : ""}, ${months} mo${months !== 1 ? "s" : ""}`;

  return `${months} month${months !== 1 ? "s" : ""}`;
};
