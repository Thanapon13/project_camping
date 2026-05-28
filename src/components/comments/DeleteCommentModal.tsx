import DeleteConfirmationForm from "../form/DeleteConfirmationForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteCommentModalProps = {
  commentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: (prevState: any, formData: FormData) => Promise<any>;
};

const DeleteCommentModal = ({
  commentId,
  open,
  onOpenChange,
  action,
}: DeleteCommentModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete comment</DialogTitle>
      </DialogHeader>

      <DeleteConfirmationForm
        id={commentId}
        description="This comment will be permanently deleted, along with all replies."
        action={action}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </DialogContent>
  </Dialog>
);

export default DeleteCommentModal;
