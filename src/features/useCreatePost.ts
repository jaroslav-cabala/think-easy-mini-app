import { useMutation } from "@tanstack/react-query";
import { postsEndpoint } from "../config";
import { MutationOptionsWithoutKeyAndFn } from "../utilTypes";
import { PostResponse } from "../apiTypes";
import { useAuthenticationContext } from "./authentication/AuthenticationProvider";
import { AuthenticationError } from "./authentication/AuthenticationError";

type CreatePostInput = {
  title: string;
  content: string;
  accessToken: string;
};

const createPost = async ({ accessToken, title, content }: CreatePostInput): Promise<PostResponse> => {
  const response = await fetch(postsEndpoint, {
    method: "POST",
    body: JSON.stringify({ title, content }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthenticationError("Unauthorized.");
    }
    throw new Error("Failed to create a post!");
  }

  return response.json();
};

export const useCreatePost = (
  mutationOptions?: MutationOptionsWithoutKeyAndFn<
    Awaited<ReturnType<typeof createPost>>,
    Error,
    Omit<CreatePostInput, "accessToken">
  >
) => {
  const { user } = useAuthenticationContext();

  return useMutation({
    mutationFn: (input) => createPost({ ...input, accessToken: user?.accessToken as string }),
    ...mutationOptions,
  });
};
