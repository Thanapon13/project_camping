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

const validateImage = () => {
  const maxFileSize = 1024 * 1024;
  const validTypes = ["image/jpeg", "image/png", "image/webp"];

  return z
    .instanceof(File)
    .refine(file => file.size > 0, "Please select an image")
    .refine(file => file.size <= maxFileSize, "File size must be less than 1MB")
    .refine(
      file => validTypes.includes(file.type),
      "File must be JPEG, PNG, or WEBP",
    );
};

export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),

  category: z.string().min(1, { message: "Category is required" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description must be less than 1000 characters" }),

  price: z.coerce
    .number({ message: "Price must be a number" })
    .int()
    .gt(0, { message: "Price must be greater than 0" })
    .max(1000000, { message: "Price must be less than 1,000,000" }),

  province: z.string().min(1, { message: "Province is required" }),

  lat: z.coerce
    .number({ message: "Latitude must be a number" })
    .min(-90, { message: "Invalid latitude" })
    .max(90, { message: "Invalid latitude" }),

  lng: z.coerce
    .number({ message: "Longitude must be a number" })
    .min(-180, { message: "Invalid longitude" })
    .max(180, { message: "Invalid longitude" }),
});

export const validateComment = z.object({
  landmarkId: z.string().min(1, "Landmark ID is required"),
  userId: z.string().min(1, "Please login to comment"),
  rating: z.coerce
    .number()
    .min(1, "Please give a rating before posting")
    .max(5, "Rating must be between 1-5"),
  comment: z
    .string()
    .min(1, "Please enter your comment")
    .max(500, "Comment is too long (max 500 characters)"),
});

export const validateWithZod = <T>(schema: z.ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.issues.forEach(issue => {
      const path = issue.path[0] as string;
      if (!fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    });

    const errorInstance = new Error("Validation Failed");
    (errorInstance as any).errors = fieldErrors;
    throw errorInstance;
  }

  return result.data;
};
