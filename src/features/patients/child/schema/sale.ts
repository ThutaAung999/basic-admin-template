import { z } from "zod";

export const saleSchema = z.object({
  // need to add after adding api
  patient: z.string().optional(),
  // hn: z.number().min(1),
  purchase_date: z.date({ required_error: "Purchased date is required!" }),
  customer_type: z.string().min(1, "Customer type is required!"),
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
  package_plan: z.string().min(1, "Package plan is required!"),
});

export type SaleDto = z.infer<typeof saleSchema>;
