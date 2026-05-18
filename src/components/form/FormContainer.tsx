"use client";

import { actionFunction } from "@/utils/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const initialState = {
  message: "",
  code: undefined as number | undefined,
};

const FormContainer = ({
  className,
  action,
  children,
  onSuccess,
}: {
  className?: string;
  action: actionFunction;
  children: React.ReactNode;
  onSuccess?: () => void;
}) => {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.code === 0) {
      Swal.fire({
        title: "สำเร็จ!",
        text: state.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        width: "600px",
        padding: "3em",
        timerProgressBar: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    }
    if (state.code === 402) {
      toast.error(state.message, { duration: 5000, position: "top-center" });
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
};

export default FormContainer;
