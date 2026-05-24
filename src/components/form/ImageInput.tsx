"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import FieldError from "../error/FieldError";

interface ImageInputProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  existingImage?: string;
}

const ImageInput = ({
  file,
  onChange,
  error,
  existingImage,
}: ImageInputProps) => {
  const name = "image";
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    onChange(selectedFile);
  };

  const displayImage = preview || existingImage || null;
  const isExisting = !preview && !!existingImage;

  return (
    <div className="mt-4">
      <Label className="capitalize">{name}</Label>

      <Input
        ref={inputRef}
        id={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {displayImage ? (
        <div className="relative mt-2 w-full max-w-xs">
          <Image
            src={displayImage}
            alt="preview"
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-48"
          />
          {/* ถ้าเป็นรูปเดิม ให้กดเปลี่ยนได้อย่างเดียว ลบไม่ได้ */}
          {isExisting ? (
            <label
              htmlFor={name}
              className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs px-2 py-1 rounded cursor-pointer transition"
            >
              Change
            </label>
          ) : (
            // รูปใหม่ที่เลือก ลบได้ (จะ fallback กลับไปรูปเดิม)
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <label
          htmlFor={name}
          className={`mt-2 flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-md cursor-pointer transition ${
            error
              ? "border-destructive hover:border-destructive/80"
              : "border-muted-foreground/40 hover:border-primary"
          }`}
        >
          <span className="text-sm text-muted-foreground">
            Click to select an image
          </span>
          <span className="text-xs text-muted-foreground/60 mt-1">
            PNG, JPG, WEBP
          </span>
          <FieldError message={error} />
        </label>
      )}
    </div>
  );
};

export default ImageInput;
