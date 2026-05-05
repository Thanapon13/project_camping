import { z } from "zod";

export const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  userName: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
});

export const validateWithZod = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map(error => error.message);
    console.log("errors:", errors);

    throw new Error(errors.join(", "));
  }

  return result.data;
};
