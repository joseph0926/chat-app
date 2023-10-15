import { useEffect } from "react";
import { createProfile } from "@/lib/services/auth";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NewUserPage = () => {
  const router = useNavigate();

  const { user } = useUser();
  if (!user) {
    router("/sign-in");
  }

  const { mutate, isPending, data } = useMutation({
    mutationFn: () =>
      createProfile({
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
      }),
    retry: 2,
    onSuccess: (data) => {
      if (data) {
        router("/");
      }
    },
    onError: (error) => {
      console.log(error);
      // toast등 추가
      router("/");
    },
  });

  useEffect(() => {
    if (user) {
      mutate();
    }
  }, [user]);

  return <div />;
};

export default NewUserPage;
