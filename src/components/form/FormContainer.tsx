"use client";

import { actionFunction } from "@/utils/types";
import { useActionState, useEffect, useRef } from "react";
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
  silent = false,
}: {
  className?: string;
  action: actionFunction;
  children: React.ReactNode;
  onSuccess?: () => void;
  silent?: boolean;
}) => {
  const [state, formAction] = useActionState(action, initialState);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!state.message) return;

    if (state.code === 0) {
      // ✅ ถ้าไม่ silent ถึงจะแสดง Swal
      if (!silent) {
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
      }

      onSuccessRef.current?.();
    }

    if (state.code === 402) {
      toast.error(state.message, { duration: 5000, position: "top-center" });
    }
  }, [state, silent]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
};

export default FormContainer;
