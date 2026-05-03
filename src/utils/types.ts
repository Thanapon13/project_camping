export type actionFunction = (
  prevSate: any,
  formData: any,
) => Promise<{ message: string }>;