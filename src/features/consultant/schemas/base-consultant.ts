import { z } from "zod";

export const baseConsultantSchema = z.object({
  name: z.string().min(1, "Consultant name is required"),
});

export type BaseConsultantDto = z.infer<typeof baseConsultantSchema>;
