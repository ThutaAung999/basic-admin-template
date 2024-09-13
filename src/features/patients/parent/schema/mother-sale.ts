import { z } from "zod";

export const motherSaleSchema = z.object({
  // need to add after adding api
  patient: z.string().optional(),
  // hn: z.number().min(1),child
  purchase_date: z.date({ required_error: "Purchased date is required!" }),
  customer_type: z.string().min(1, "Customer type is required!"),
  package_plan: z.string().min(1, "Package plan is required!"),
  amount: z
    .string()
    .min(1, "Purchased amount is required!")
    .transform((val) => val && +val),
  duration: z
    .string()
    .min(1, "Duration is required!")
    .transform((val) => val && +val),
  payment_provider: z.string().min(1, "Payment method is required!"),
  remark: z.string().optional(),
});

export type MotherSaleDto = z.infer<typeof motherSaleSchema>;
