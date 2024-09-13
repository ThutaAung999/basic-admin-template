import { z } from "zod";

export const callLogSchema = z.object({
  phone: z.string().min(1, "Caller number is required!"),
  call_start_time: z.date({ required_error: "Call start time is requied!" }),
  call_end_time: z.date({ required_error: "Call end time is required!" }),
  diagnosis: z.string({ required_error: "Diagnosis is required!" }),
  call_type: z.string({ required_error: "Call type is required!" }),
  patient: z.string().optional(),
  initial_treatment: z.string().optional(),
  is_follow_up_needed: z.boolean().optional(),
  follow_up_date: z.date().optional(),
  follow_up_comment: z.string().optional(), //child
  hopi: z.string().optional(),
  chief_complaint: z.string().optional(),
  is_medicine_required: z.boolean().optional().default(false),
});

export type CallLogDto = z.infer<typeof callLogSchema>;
