import { useQuery } from "@tanstack/react-query";
import { postsEndpoint } from "../config";
import { QueryOptionsWithoutKeyAndFn } from "../utilTypes";
import { PostResponse } from "../apiTypes";

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
