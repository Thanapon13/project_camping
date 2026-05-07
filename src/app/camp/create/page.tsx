import { createLandmarkAction } from "@/actions/action";
import { SubmitButton } from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import TextAreaInput from "@/components/form/TextAreaInput";

const CreateCamp = async () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create Landmark
      </h1>

      <div className="border p-8 rounded-md">
        <FormContainer action={createLandmarkAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              type="text"
              label="Landmark Name"
              placeholder="Landmark Name"
            />

            <CategoryInput />
          </div>

          <TextAreaInput name="description" />

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              type="number"
              label="Price"
              placeholder="Price"
            />
          </div>

          <SubmitButton text="create Landmark" size="sm" className="mt-10" />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateCamp;
