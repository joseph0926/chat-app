import { CreateProfileProps } from "@/@types/auth";
import { customAxios } from "@/lib/customAxios";

export const createProfile = async ({ clerkId, email }: CreateProfileProps) => {
  try {
    const { data } = await customAxios.post("/create-profile", {
      clerkId,
      email,
    });

    return data;
  } catch (error: any) {
    return error.response.data ? error.response.data : error;
  }
};
