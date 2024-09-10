import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
});

export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
