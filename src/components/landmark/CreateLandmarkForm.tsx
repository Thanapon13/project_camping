"use client";

import { categories } from "@/utils/category";
import { provinces } from "@/utils/provinces";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import SelectField from "../form/SelectField";
import TextAreaInput from "../form/TextAreaInput";
import ImageInput from "../form/ImageInput";
import MapLandmarkClient from "../map/MapLandmarkClient";
import { SubmitButton } from "../buttons/Buttons";
import { useState } from "react";
import { LandmarkCardProps } from "@/utils/types";
import FieldError from "../error/FieldError";
import { createLandmarkAction, editLandmarkAction } from "@/actions/landmark";

interface CreateLandmarkFormProps {
  onSuccess?: () => void;
  value?: LandmarkCardProps;
}

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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { name, description, price, lat, lng } = formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // ถ้าผู้ใช้เริ่มพิมพ์แก้ ให้เคลียร์ Error ของช่องนั้นทิ้งทันที
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormAction = async (
    prevState: any,
    formDataPayload: FormData,
  ) => {
    setErrors({});

    if (imageFile) {
      formDataPayload.set("image", imageFile);
    }

    let result;

    if (!value?.id) {
      result = await createLandmarkAction(prevState, formDataPayload);
    } else {
      formDataPayload.set("id", value.id);
      result = await editLandmarkAction(prevState, formDataPayload);
    }

    if (result && result.errors) {
      setErrors(result.errors);
    }

    return result;
  };

  const isEdit = !!value;

  return (
    <FormContainer action={handleFormAction} onSuccess={onSuccess}>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div>
          <FormInput
            name="name"
            value={name}
            type="text"
            label="Landmark Name"
            placeholder="Landmark Name"
            onChange={handleChange}
          />
          <FieldError message={errors.name} />
        </div>

        <div>
          <SelectField
            name="category"
            data={categories}
            defaultValue={formData.category}
            onValueChange={handleSelectChange("category")}
          />
          <FieldError message={errors.category} />
        </div>
      </div>

      <div className="mt-4">
        <TextAreaInput
          name="description"
          value={description}
          onChange={handleChange}
        />
        <FieldError message={errors.description} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <FormInput
            name="price"
            value={price}
            type="number"
            label="Price"
            placeholder="Price"
            onChange={handleChange}
          />
          <FieldError message={errors.price} />
        </div>

        <div>
          <SelectField
            name="province"
            data={provinces}
            defaultValue={formData.province}
            onValueChange={handleSelectChange("province")}
          />
          <FieldError message={errors.province} />
        </div>
      </div>

      <ImageInput
        file={imageFile}
        onChange={setImageFile}
        error={errors.image}
        existingImage={value?.image}
      />

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
        pendingText={isEdit ? "Updating..." : "Creating..."}
      />
    </FormContainer>
  );
};

export default CreateLandmarkForm;
