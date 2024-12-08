import { useQuery } from "@tanstack/react-query";
import { postsEndpoint } from "../../config";
import { QueryOptionsWithoutKeyAndFn } from "../../types";

export type PostResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  title: string;
  content: string;
  authorId: string;
};

const fetchPosts = async (): Promise<PostResponse[]> => {
  const response = await fetch(postsEndpoint);

  if (!response.ok) {
    throw new Error("Failed to fetch posts!");
  }

  return response.json();
};

export const useGetPosts = (queryOptions?: QueryOptionsWithoutKeyAndFn<PostResponse[]>) =>
  useQuery<PostResponse[]>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    ...queryOptions,
  });
