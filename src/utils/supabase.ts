// @noImplicitAny: false

// ---cut---
import { createClient } from "@supabase/supabase-js";

const bucketName = "landmark-bucket";
const url = process.env.SUPABASE_URL as string;
const key = process.env.SUPABASE_KEY as string;

// Create Supabase client
const supabase = createClient(url, key);

// Upload file using standard upload
export async function uploadFile(image: File) {
  const timeStamp = Date.now();
  const newName = `${timeStamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(newName, image, { cacheControl: "3600" });

  // const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')

  if (!data) throw new Error("Image upload failed!!!");

  return supabase.storage.from(bucketName).getPublicUrl(newName).data.publicUrl;
}
