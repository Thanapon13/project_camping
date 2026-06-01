"use client";

import { SubmitButton } from "../buttons/Buttons";
import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";

interface DeleteConfirmationFormProps {
  id: string;
  name?: string;
  description?: string;
  action: (prevState: any, formData: FormData) => Promise<any>;
  pathname?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DeleteConfirmationForm = ({
  id,
  name,
  description = "การกระทำนี้ไม่สามารถย้อนกลับได้",
  action,
  pathname,
  onSuccess,
  onCancel,
}: DeleteConfirmationFormProps) => {
  const handleSubmitWithClose = async (prevState: any, formData: FormData) => {
    const result = await action(prevState, formData);
    if (result && result.code === 200) {
      onSuccess();
    }
    return result;
  };

  return (
    <FormContainer action={handleSubmitWithClose}>
      <input type="hidden" name="id" value={id} />
      {pathname && <input type="hidden" name="pathname" value={pathname} />}

      <div className="space-y-4 py-2">
        <p className="text-sm text-muted-foreground leading-relaxed">
          คุณแน่ใจหรือไม่ว่าต้องการลบ
          {name && (
            <>
              {" "}
              <span className="font-semibold text-foreground">{name}</span>
            </>
          )}
          ? <br />
          <span className="text-xs text-destructive/80">{description}</span>
        </p>

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={onCancel}
            className="rounded-lg"
          >
            Cancel
          </Button>

          <SubmitButton
            text="Confirm"
            size="sm"
            variant="destructive"
            pendingText="Deleting..."
            className="rounded-lg px-4"
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default DeleteConfirmationForm;
