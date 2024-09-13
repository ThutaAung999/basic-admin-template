import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, "Patient name is required!"),
  caretaker: z.string().min(1, "Caretaker name is required!"),
  consultant: z.string().optional(),
  use_nw_hn: z.boolean().optional(),
  gender: z.string({ required_error: "Gender is required!." }),
  dob: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  hn: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? val && +val : val))
    .optional(),
  past_diagnosis: z.string().optional(),
  past_history: z.string().optional(),
  contact_numbers: z
    .array(z.string().min(1, "Phone number is required!"))
    .min(1, " At least one contact number is required"),
  // .nonempty("At least one contact number is required!."),
  g6pd: z.boolean().optional(),
  weight: z
    .object({
      value: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === "number" ? val.toString() : val))
        .optional(),
      unit: z.string().optional(),
    })
    .optional(),
  height: z
    .object({
      value: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === "number" ? val.toString() : val))
        .optional(),
      unit: z.string().default("cm"),
    })
    .optional(),
  anthropometry_date_for_weight: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
    .optional(),
  anthropometry_date_for_height: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
    .optional(),
  allergies: z.array(z.string()).optional().default([]),
  address: z
    .object({
      sr: z.string().min(1, "Address(State) is required!"),
      township: z.string().min(1, "Address(Township) is required!"),
    })
    .required(),
});

export type ChildDto = z.infer<typeof patientSchema>;

export const editChildSchema = patientSchema.partial();
export type EditChildDto = z.infer<typeof editChildSchema>;
