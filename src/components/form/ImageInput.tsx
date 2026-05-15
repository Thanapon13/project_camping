"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const ImageInput = () => {
  const name = "image";
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  console.log("preview", preview);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);

    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleRemove = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-4">
      <Label className="capitalize">{name}</Label>

      {/* Hidden file input */}
      <Input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        required={!preview}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        /* Preview area */
        <div className="relative mt-2 w-full max-w-xs">
          <Image
            src={preview}
            alt="preview"
            width={300}
            height={200}
            className="rounded-md object-cover w-full h-48"
          />
          {/* Remove button */}
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
        /* Click-to-upload area */
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
