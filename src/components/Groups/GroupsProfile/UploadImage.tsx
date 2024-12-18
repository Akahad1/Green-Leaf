"use client";
import axios from "axios";
interface ImgBBResponse {
  success: any;
  data: {
    url: string | PromiseLike<string | null> | null;
    data: {
      url: string;
    };
    success: boolean;
  };
}
export const uploadImageToImgBB = async (
  file: File
): Promise<string | null> => {
  const API_KEY = "bc2a245f29847370d2b39d61e77e3d98"; // Replace with your ImageBB API key
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<ImgBBResponse>(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      formData
    );

    if (response.data.success) {
      return response.data.data.url; // URL of the uploaded image
    } else {
      console.error("Image upload failed", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
