"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { updateProfileAction } from "@/actions/profile";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/buttons/Buttons";

type Profile = {
  firstName: string;
  lastName: string;
  userName: string;
};

const EditProfileDialog = ({ profile }: { profile: Profile }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="w-4 h-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription className="sr-only">
            Edit your profile information
          </DialogDescription>
        </DialogHeader>

        <FormContainer
          action={updateProfileAction}
          onSuccess={() => setOpen(false)}
          className="space-y-4 pt-2"
        >
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              key={profile.firstName}
              id="firstName"
              name="firstName"
              defaultValue={profile.firstName}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              key={profile.lastName}
              id="lastName"
              name="lastName"
              defaultValue={profile.lastName}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="userName">Username</Label>
            <Input
              key={profile.userName}
              id="userName"
              name="userName"
              defaultValue={profile.userName}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <SubmitButton text="Save" size="sm" pendingText="Saving..." />
          </div>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
