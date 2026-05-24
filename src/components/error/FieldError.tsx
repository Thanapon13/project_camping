const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-destructive mt-1 font-medium">{message}</p>
  ) : null;

export default FieldError;
