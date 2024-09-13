import { z } from "zod";

export const motherCallLogSchema = z.object({
  phone: z.string().min(1, "Caller number is required!"),
  call_start_time: z.date({ required_error: "Call start time is requied!" }),
  call_end_time: z.date({ required_error: "Call end time is required!" }),
  diagnosis: z.string({ required_error: "Diagnosis is required!" }),
  call_type: z.string({ required_error: "Call type is required!" }),
  patient: z.string().optional(),
  initial_treatment: z.string().optional(),
  follow_up_date: z.date().optional(),
  follow_up_reason: z.string().optional(),
  hopi: z.string().optional(),
  chief_complaint: z.string().optional(),
});

export type MotherCallLogDto = z.infer<typeof motherCallLogSchema>;
