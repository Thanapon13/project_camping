"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // 🟢 ดึงกลับมาใช้แทน textarea ปกติ
import { SubmitButton } from "../buttons/Buttons";
import FormContainer from "../form/FormContainer";

interface EditCommentFormProps {
  commentId: string;
  initialComment: string;
  onSave: (prevState: any, formData: FormData) => Promise<any>;
  onCancel: () => void;
}

const EditCommentForm = ({
  commentId,
  initialComment,
  onSave,
  onCancel,
}: EditCommentFormProps) => {
  return (
    <FormContainer action={onSave} onSuccess={onCancel}>
      <input type="hidden" name="commentId" value={commentId} />

      <div className="mt-2 w-full space-y-3">
        <Textarea
          name="comment"
          defaultValue={initialComment}
          className="min-h-[80px] w-full resize-none rounded-xl border-muted-foreground/20 p-3 focus-visible:ring-1 focus-visible:ring-primary"
          placeholder="Edit your comment..."
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>

          <SubmitButton
            text="Save Changes"
            pendingText="Saving..."
            size="sm"
            className="rounded-lg text-xs px-4"
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default EditCommentForm;
