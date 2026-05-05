"use client";

import { createContext } from "react";

type FormState = {
  message: string;
};

export const initialState: FormState = { message: "" };

export const FormContext = createContext<FormState>(initialState);