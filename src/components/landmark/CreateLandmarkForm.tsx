"use client";

import { categories } from "@/utils/category";
import { provinces } from "@/utils/provinces";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import SelectField from "../form/SelectField";
import TextAreaInput from "../form/TextAreaInput";
import ImageInput from "../form/ImageInput";
import MapLandmarkClient from "../map/MapLandmarkClient";
import { createLandmarkAction } from "@/actions/action";
import { SubmitButton } from "../form/Buttons";
import { useState } from "react";

const defaultFormData = {
  name: "",
  description: "",
  category: "",
  province: "",
  price: "",
  lat: "",
  lng: "",
};

const CreateLandmarkForm = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { name, category, description, price, province } = formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormAction = async (
    prevState: any,
    formDataPayload: FormData,
  ) => {
    if (imageFile) {
      formDataPayload.set("image", imageFile);
    }
    return createLandmarkAction(prevState, formDataPayload);
  };

  return (
    <FormContainer action={handleFormAction}>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <FormInput
          name="name"
          value={name}
          type="text"
          label="Landmark Name"
          placeholder="Landmark Name"
          onChange={handleChange}
        />

        <SelectField
          name="category"
          data={categories}
          onValueChange={handleSelectChange("category")}
        />
      </div>

      <TextAreaInput
        name="description"
        value={description}
        onChange={handleChange}
      />

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <FormInput
          name="price"
          value={price}
          type="number"
          label="Price"
          placeholder="Price"
          onChange={handleChange}
        />

        <SelectField
          name="province"
          data={provinces}
          onValueChange={handleSelectChange("province")}
        />
      </div>

      <ImageInput file={imageFile} onChange={setImageFile} />

      <MapLandmarkClient location={{ lat: 14, lng: 101 }} />

      <SubmitButton text="create Landmark" size="sm" className="mt-10" />
    </FormContainer>
  );
};

export default CreateLandmarkForm;
