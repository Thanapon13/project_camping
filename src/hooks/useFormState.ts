"use client";

import { useContext } from "react";
import { FormContext } from "@/contexts/FormContext";

export default function useFormState() {
  return useContext(FormContext);
}