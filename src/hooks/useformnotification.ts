"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

type FormState = {
  message: string;
  code?: number | undefined;
};

type UseFormNotificationOptions = {
  onSuccess?: () => void;
};

/**
 * Handle form action response notifications.
 *
 * code === 0   → SweetAlert success popup → then call onSuccess()
 * code === 200 → Silent success           → call onSuccess() immediately
 * code === 402 → Toast error
 */
export const useFormNotification = (
  state: FormState,
  { onSuccess }: UseFormNotificationOptions = {},
) => {
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

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
      }).then(() => onSuccessRef.current?.());
      return;
    }

    if (state.code === 200) {
      onSuccessRef.current?.();
      return;
    }

    if (state.code === 402) {
      toast.error(state.message, { duration: 5000, position: "top-center" });
    }
  }, [state]);
};
