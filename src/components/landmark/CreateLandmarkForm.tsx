"use client";

import { categories } from "@/utils/category";
import { provinces } from "@/utils/provinces";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import SelectField from "../form/SelectField";
import TextAreaInput from "../form/TextAreaInput";
import ImageInput from "../form/ImageInput";
import MapLandmarkClient from "../map/MapLandmarkClient";
import { createLandmarkAction, editLandmarkAction } from "@/actions/action";
import { SubmitButton } from "../buttons/Buttons";
import { useState } from "react";
import { LandmarkCardProps } from "@/utils/types";

interface CreateLandmarkFormProps {
  onSuccess?: () => void;
  value?: LandmarkCardProps;
}

const defaultFormData = {
  name: "",
  description: "",
  category: "",
  province: "",
  price: "",
  lat: "",
  lng: "",
};

const CreateLandmarkForm = ({ onSuccess, value }: CreateLandmarkFormProps) => {
  const [formData, setFormData] = useState({
    name: value?.name ?? "",
    description: value?.description ?? "",
    category: value?.category ?? "",
    province: value?.province ?? "",
    price: value?.price?.toString() ?? "",
    lat: value?.lat?.toString() ?? "",
    lng: value?.lng?.toString() ?? "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { name, description, price, lat, lng } = formData;

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

    if (!value?.id) {
      return createLandmarkAction(prevState, formDataPayload);
    } else {
      formDataPayload.set("id", value.id);
      return editLandmarkAction(prevState, formDataPayload);
    }
  };

  const isEdit = !!value;

  return (
    <FormContainer action={handleFormAction} onSuccess={onSuccess}>
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
          defaultValue={formData.category}
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
          defaultValue={formData.province}
          onValueChange={handleSelectChange("province")}
        />
      </div>

      <ImageInput file={imageFile} onChange={setImageFile} />

      <MapLandmarkClient
        location={{
          lat: parseFloat(lat) || 14,
          lng: parseFloat(lng) || 101,
        }}
      />

      <SubmitButton
        text={isEdit ? "Update Landmark" : "Create Landmark"}
        size="sm"
        className="mt-10"
      />
    </FormContainer>
  );
};

export default CreateLandmarkForm;
