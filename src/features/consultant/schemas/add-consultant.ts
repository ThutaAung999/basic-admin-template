import { z } from "zod";

export const addConsultantSchema = z.object({
  name: z.string().min(1, "Consultant name is required"),
});

export type AddConsultantDto = z.infer<typeof addConsultantSchema>;
