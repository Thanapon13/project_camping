export const renderError = (
  error: unknown,
  code: number,
): { message: string; code: number; errors?: Record<string, string> } => {
  if (error instanceof Error && "errors" in error) {
    return {
      message: "กรุณากรอกข้อมูลให้ถูกต้องตามเงื่อนไข",
      code: code,
      errors: (error as any).errors,
    };
  }

  return {
    message: error instanceof Error ? error.message : "An Error!!!",
    code: code,
  };
};
