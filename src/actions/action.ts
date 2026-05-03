"use server";
import { z } from "zod";
const profileSchema = z
  .string()
  .min(2, { message: "First name must be at least 2 characters" });

export const createProfileAction = async (
  preState: any,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  console.log("rawData", rawData);

  const validated = rawData;

  return { message: "Create Profile successfully" };
};
