import { AbsoluteCenter, Icon, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { useGetPosts } from "./useGetPosts";
import { Post, PostsGrid } from "./PostsGrid";
import { LuFrown } from "react-icons/lu";
import { PostDetails, PostDetailsView } from "./PostDetails";
import { EmptyState } from "../components/ui/empty-state";
import { Skeleton } from "../components/ui/skeleton";
import { useDebounceState } from "../components/hooks/useDebounceState";
import { ActionBar } from "./ActionBar";

export function PostsView() {
  const [selectedPost, setSelectedPost] = useState<PostDetails | undefined>();
  const [searchValue, debouncedSearchValue, setSearchValue] = useDebounceState("");
  const { data: posts, isPending, isError } = useGetPosts();

  if (isError && !posts) {
    return <ErrorMessage />;
  }

  const onPostClick = (post: Post) => {
    setSelectedPost(post);
  };

  // searching through lots of posts should ideally be done on backend.
  // This below is a blocking code which can lead to a laggy ux.
  // If I had time I would think of something to make the filtering asynchronous with Promises/SetTimeout :)
  const filteredPosts = debouncedSearchValue
    ? posts?.filter((post) => post.title.includes(debouncedSearchValue) || post.content.includes(searchValue))
    : posts;

  return (
    <>
      <ActionBar searchValue={searchValue} setSearchValue={setSearchValue} />
      {filteredPosts?.length ? (
        <PostsGrid posts={filteredPosts} onPostClick={onPostClick} />
      ) : isPending ? (
        <LoadingIndicator />
      ) : (
        <EmptyState size="lg" title="Found 0 posts" description="Try adjusting your search." />
      )}
      {!!selectedPost && <PostDetailsView post={selectedPost} onClose={() => setSelectedPost(undefined)} />}
    </>
  );
}

const ErrorMessage = () => {
  return (
    <AbsoluteCenter axis="both">
      <Icon mr="2">
        <LuFrown />
      </Icon>
      Ooops, something went wrong. Try reloading the page.
    </AbsoluteCenter>
  );
};

const LoadingIndicator = () => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap="5">
      {[...Array(12)].map(() => (
        <Skeleton h="200px" />
      ))}
    </SimpleGrid>
  );
};
