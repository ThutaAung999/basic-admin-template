import magnifier from "@/assets/icons/magnifier.svg?react";
import calendar from "@/assets/icons/calendar.svg?react";
import csvExport from "@/assets/icons/export.svg?react";

import dashboardActive from "@/assets/icons/dashboard-active.svg?react";
import dashboardInActive from "@/assets/icons/dashboard-inactive.svg?react";
import consultantActive from "@/assets/icons/consultant-active.svg?react";
import consultantInActive from "@/assets/icons/consultant-inactive.svg?react";
import diagnosisActive from "@/assets/icons/call-diagnosis-active.svg?react";
import diagnosisInActive from "@/assets/icons/call-diagnosis-inactive.svg?react";
import usersActive from "@/assets/icons/user-active.svg?react";
import usersInActive from "@/assets/icons/user-inactive.svg?react";

import childPatientActive from "@/assets/icons/child-active.svg?react";
import childPatientInActive from "@/assets/icons/child-inactive.svg?react";
import motherPatientActive from "@/assets/icons/mother-active.svg?react";
import motherPatientInActive from "@/assets/icons/mother-inactive.svg?react";

import followUpActive from "@/assets/icons/follow-up-active.svg?react";
import followUpInActive from "@/assets/icons/follow-up-inactive.svg?react";

import callLogActive from "@/assets/icons/call-log-active.svg?react";
import callLogInActive from "@/assets/icons/call-log-inactive.svg?react";

import saleActive from "@/assets/icons/sale-active.svg?react";
import saleInActive from "@/assets/icons/sale-inactive.svg?react";

import { ComponentProps, ReactElement, forwardRef } from "react";

const icons = {
  magnifier,
  calendar,
  export: csvExport,
  dashboardActive,
  dashboardInActive,
  consultantActive,
  consultantInActive,
  diagnosisActive,
  diagnosisInActive,
  usersActive,
  usersInActive,
  childPatientActive,
  childPatientInActive,
  motherPatientActive,
  motherPatientInActive,
  followUpActive,
  followUpInActive,
  callLogActive,
  callLogInActive,
  saleActive,
  saleInActive,
};

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
} & ComponentProps<"svg">;

export const Icon = forwardRef<SVGSVGElement, Props>(
  ({ name, ...props }, ref) => {
    const Component = icons[name];

    return (<Component fill="blue" {...props} ref={ref} />) as ReactElement;
  },
);
