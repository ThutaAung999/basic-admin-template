//==================constants=============================
export const MOTHER_PATIENT_TYPES = [
    { label: "Show All Types", value: "All" },
    { label: "test", value: "TEST" },
    { label: "May May", value: "MAY_MAY" },
    { label: "TRIAL", value: "TRIAL" },
    { label: "test ct-1", value: "test ct - 1" },
    { label: "Phay Phay", value: "Phay_Phay" },
    { label: "OKKPAR", value: "OKKPAR" },
    { label: "mon", value: "mon" },
    { label: "PSI", value: "PSI" },
    { label: "testing", value: "testing" },
    { label: "NW", value: "NW" },
    { label: "DEF", value: "DEF" },
    { label: "PLUS", value: "PLUS" },
    
    
  ];
  
  export const CHILD_PATIENT_TYPES = [
    { label: "Show All Types", value: "All" },
    { label: "OPD", value: "OPD" },
    { label: "ERC", value: "ERC" },
    { label: "NW", value: "NW" },
    { label: "IPD", value: "IPD" },
    { label: "PLUS", value: "PLUS" },

  ];

  export const childTabItems = [
    { label: "DAILY FOLLOW UP", value: "SCHEDULED" },
    { label: "CALL LOG FOLLOW UP", value: "HANDOVER" },
    { label: "CS FOLLOW UP", value: "CS" },
  ];
  
  export const motherTabItems = [
    { label: "DAILY FOLLOW UP", value: "SCHEDULED" },
    { label: "CALL LOG FOLLOW UP", value: "HANDOVER" },
  ];
  
  
  export const status = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];
  

  export const tableHeaders = {
    patient: "Patient",
    type: "Type",
    careTaker: "Care Taker",
    membership: "Membership",
    purchasedDate: "Purchased Date",
    expirationDate: "Expiration Date",
    followUpDate: "Follow Up Date",
    reason: "Reason",
    status: "Status",
    user: "User",
    action: "",
  };
  


  //================= types ===================
  export type FollowUp = {
    _id: string;
    reason: string;
    meta_data: {
      patient_type: string;
    };
    status: string;
    follow_up_type: string;
    follow_up_date: string;
    patient: {
      name: string;
      caretaker: string;
      last_purchased_date: string;
      expiration_date: string;
      hn: number;
      patient_number: string;
      membership_status: string;
      id: string;
    };
    sale: {
      expiration_date: string;
    };
    user: {
      name: string;
    };
  };
  
  export type GetFollowUps = {
    skip?: number;
    limit?: number;
    search?: string;
    follow_up_type?: string;
    status?: string;
    start?: string;
    end?: string;
    patient_type?: string;
    sort?: string;
  };
  
  export type EditFollowUpStatus = {
    status: string;
  };
  
  export type Tab = {
    label: string;
    value: string;
  };
  

