import { NavItem } from "../types";

export const navItems: NavItem[] = [
  {
    href: "/",
    text: "Dashboard",
    activeIcon: "dashboardActive",
    inActiveIcon: "dashboardInActive",
  },
  {
    href: "/consultants",
    text: "Consultants",
    activeIcon: "consultantActive",
    inActiveIcon: "consultantInActive",
  },
  {
    href: "/diagnoses",
    text: "Diagnoses",
    activeIcon: "diagnosisActive",
    inActiveIcon: "diagnosisInActive",
    type: "child",
  },
  {
    href: "/users",
    text: "Users",
    activeIcon: "usersActive",
    inActiveIcon: "usersInActive",
  },
];

export const childNavItems: NavItem[] = [
  {
    href: "/patients",
    text: "Registered Patients(Child)",
    activeIcon: "childPatientActive",
    inActiveIcon: "childPatientInActive",
    type: "child",
  },
  {
    href: "/call_logs",
    text: "ChildCallLog",
    activeIcon: "callLogActive",
    inActiveIcon: "callLogInActive",
    type: "child",
  },
  {
    href: "/follow-ups",
    text: "Follow Up(Child)",
    activeIcon: "followUpActive",
    inActiveIcon: "followUpInActive",
    type: "child",
  },
  {
    href: "/child_sales",
    text: "ChildSales",
    activeIcon: "saleActive",
    inActiveIcon: "saleInActive",
    type: "child",
  },
];

export const motherNavItems: NavItem[] = [
  {
    href: "/mothers/patients",
    text: "Registered Patients(Mother)",
    activeIcon: "motherPatientActive",
    inActiveIcon: "motherPatientInActive",
    type: "mother",
  },
  {
    href: "/mother_call_logs",
    text: "MotherCallLog",
    activeIcon: "callLogActive",
    inActiveIcon: "callLogInActive",
    type: "mother",
  },
  {
    href: "/mother/follow-ups",
    text: "Follow Up(Mother)",
    activeIcon: "followUpActive",
    inActiveIcon: "followUpInActive",
    type: "mother",
  },
  {
    href: "/mother_sales",
    text: "ParentSales",
    activeIcon: "saleActive",
    inActiveIcon: "saleInActive",
    type: "mother",
  },
];

export const appManagement: NavItem[] = [
  {
    href: "/app_users",
    text: "App Registered Patients",
    activeIcon: "childPatientActive",
    inActiveIcon: "childPatientInActive",
  },
];