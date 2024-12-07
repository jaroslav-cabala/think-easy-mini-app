import { Box, Input } from "@chakra-ui/react";
import { useDebounceState } from "../../components/hooks/useDebounceState";
import { useState } from "react";
import { useGetPosts } from "./useGetPosts";
import { Post, PostsGrid } from "./PostsGrid";
import { LuFrown } from "react-icons/lu";
import { PostDetails } from "../postDetails/PostDetails";

export function AllPosts() {
  const [searchValue, debouncedSearchValue, setSearchValue] = useDebounceState("");
  const [selectedPost, setSelectedPost] = useState<PostDetails | undefined>();

  const { data, isError } = useGetPosts();

  if (isError) {
    return <ErrorMessage />;
  }

  if (!data) {
    return null;
  }

  const posts: Array<Post> =
    data?.map((post) => ({
      id: post.id,
      authorId: post.authorId,
      content: post.content,
      title: post.title,
      createdAt: post.createdAt,
    })) ?? [];

  if (!posts.length) {
    return <NoResultsMessage />;
  }

  const onPostClick = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <>
      <Box mb="4">
        <Input
          aria-label="search posts"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          placeholder="Search posts..."
          className="h-12"
          autoFocus
        />
      </Box>
      <PostsGrid posts={posts} onPostClick={onPostClick} />
      {!!selectedPost && <PostDetails post={selectedPost} onClose={() => setSelectedPost(undefined)} />}
    </>
  );
}

const NoResultsMessage = () => {
  return <div className="text-2xl center-items">Found 0 movies.</div>;
};

const ErrorMessage = () => {
  return (
    <div className="text-2xl center-items">
      <LuFrown className="mr-2" />
      Ooops, something went wrong.
    </div>
  );
};
