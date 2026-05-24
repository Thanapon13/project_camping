import { createProfileAction } from "@/actions/action";
import { SubmitButton } from "@/components/buttons/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateProfile = async () => {
  const user = await currentUser();

  // if (user?.privateMetadata.hasProfile) redirect("/");/

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">new user</h1>

      <div className="border p-8 rounded-md">
        <FormContainer action={createProfileAction}>
          <div>
            <FormInput
              name="firstName"
              type="text"
              label="First Name"
              placeholder="First Name"
            />

            <FormInput
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Last Name"
            />

            <FormInput
              name="userName"
              type="text"
              label="User Name"
              placeholder="User Name"
            />
          </div>

          <SubmitButton
            text="Create Profile"
            size="sm"
            className="mt-10"
            pendingText="Please wait..."
          />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateProfile;
