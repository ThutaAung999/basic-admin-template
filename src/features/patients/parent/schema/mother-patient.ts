import { z } from "zod";

export const motherPatientSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  dob: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  contact_numbers: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val.join(", ") : val)),
  gravida: z.string().optional(),
  parity: z.string().optional(),
  remark: z.string().optional(),
  caretaker: z.string().min(1, "Caretaker name is required!"),
  caretaker_contact_number: z
    .string()
    .min(1, "Caretaker contact number is required!"),
  anthropometry_date_for_weight: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
    .optional(),
  weight: z
    .object({
      value: z
        .union([z.string(), z.number()])
        .transform((val) => (typeof val === "number" ? val.toString() : val))
        .optional(),
      unit: z.string().optional(),
    })
    .optional(),
  anthropometry_date_for_height: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
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
  allergy: z.string().optional(),
  diagnosis: z.string().optional(),
  has_delivered_baby: z.string().optional(),
  consultant: z.string().optional(),
  address: z
    .object({
      sr: z.string().min(1, "Address(state) is required!"),
      township: z.string().min(1, "Address(township) is required!"),
    })
    .required(),
  contraception_history: z.string().optional(),
  menstrual_description: z.string().optional(),
  medical_history: z.string().optional(),
  drugs: z.string().optional(),
  family_personal_condition: z.string().optional(),
  pregnancy_description: z.string().optional(),
  lmp_date: z
    .union([z.string(), z.date()])
    .transform((val) => new Date(val))
    .optional(),
});

export type MotherDto = z.infer<typeof motherPatientSchema>;
export type MotherFormInput = z.input<typeof motherPatientSchema>;

export const editMotherSchema = motherPatientSchema.partial();
export type EditMotherDto = z.infer<typeof editMotherSchema>;
