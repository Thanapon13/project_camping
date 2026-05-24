import { deleteLandmarkAction } from "@/actions/action";
import { SubmitButton } from "../buttons/Buttons";
import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";

const DeleteLandmarkForm = ({
  id,
  name,
  onClick,
}: {
  id: string;
  name: string;
  onClick: () => void;
}) => {
  const handleSubmitWithClose = async (prevState: any, formData: FormData) => {
    const result = await deleteLandmarkAction(prevState, formData);

    if (result && result.code === 200) {
      onClick();
    }

    return result;
  };

  return (
    <FormContainer action={handleSubmitWithClose}>
      <input type="hidden" name="id" value={id} />

      <div className="space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          คุณแน่ใจหรือไม่ว่าต้องการลบ{" "}
          <span className="font-semibold text-foreground">{name}</span>?
          การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" type="button" onClick={onClick}>
            Cancle
          </Button>

          <SubmitButton
            text="Confirm"
            size="sm"
            variant="destructive"
            pendingText="Deleting..."
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default DeleteLandmarkForm;
