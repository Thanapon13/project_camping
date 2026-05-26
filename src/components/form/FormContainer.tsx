"use client";

import { useActionState } from "react";
import { actionFunction } from "@/utils/types";
import { useFormNotification } from "@/hooks/useformnotification";

const initialState = {
  message: "",
  code: undefined as number | undefined,
};

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
  className?: string;
  onSuccess?: () => void;
  onClick?: (e: React.MouseEvent) => void;
};

const FormContainer = ({
  action,
  children,
  className,
  onSuccess,
  onClick,
}: FormContainerProps) => {
  const [state, formAction] = useActionState(action, initialState);

  useFormNotification(state, { onSuccess });

  return (
    <form action={formAction} className={className} onClick={onClick}>
      {children}
    </form>
  );
};

export default FormContainer;
