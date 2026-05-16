"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageInputProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

const ImageInput = ({ file, onChange }: ImageInputProps) => {
  const name = "image";
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // สร้าง Object URL สำหรับ Preview เมื่อมีไฟล์เข้ามา
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);

    // ล้างหน่วยความจำเมื่อ Component Unmount หรือไฟล์เปลี่ยน
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    onChange(selectedFile); // ส่งไฟล์กลับไปให้ตัวแม่เก็บ
  };

  const handleRemove = () => {
    onChange(null); // ล้างไฟล์ที่ตัวแม่
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

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

      {preview ? (
        <div className="relative mt-2 w-full max-w-xs">
          <Image
            src={preview}
            alt="preview"
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-48"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={name}
          className="mt-2 flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-muted-foreground/40 rounded-md cursor-pointer hover:border-primary transition"
        >
          <span className="text-sm text-muted-foreground">
            Click to select an image
          </span>
          <span className="text-xs text-muted-foreground/60 mt-1">
            PNG, JPG, WEBP
          </span>
        </label>
      )}
    </div>
  );
};

export default ImageInput;
