import { Button, Flex, Input, SimpleGrid } from "@chakra-ui/react";
import { useDebounceState } from "../../components/hooks/useDebounceState";
import { useState } from "react";
import { useGetPosts } from "./useGetPosts";
import { Post, PostsGrid } from "./PostsGrid";
import { LuFrown, LuLogIn } from "react-icons/lu";
import { PostDetails, PostDetailsView } from "../postDetailsView/PostDetails";
import { EmptyState } from "../../components/ui/empty-state";
import { Skeleton } from "../../components/ui/skeleton";
import { MdPostAdd } from "react-icons/md";
import { CreatePost } from "../CreatePost";

export function PostsView() {
  const [searchValue, debouncedSearchValue, setSearchValue] = useDebounceState("");
  const [selectedPost, setSelectedPost] = useState<PostDetails | undefined>();
  const [createPostFormOpen, setCreatePostFormOpen] = useState<boolean>(false);
  const { data: posts, isPending, isError } = useGetPosts();

  const onPostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const onCreatePostClick = () => {
    setCreatePostFormOpen(true);
  };

  // const t0 = performance.now();
  const filteredPosts = debouncedSearchValue
    ? posts?.filter((post) => post.title.includes(debouncedSearchValue) || post.content.includes(searchValue))
    : posts;
  // const t1 = performance.now();
  // console.log(`filtering took ${t1 - t0} milliseconds. Filter by ${debouncedSearchValue}`);

  return (
    <>
      <Flex mb="20px" align="center" gap="5" wrap="wrap">
        <Input
          aria-label="search posts"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder="Search posts..."
          maxW="400px"
        />
        <Button colorPalette="green" variant="subtle" marginEnd="auto" onClick={onCreatePostClick}>
          <MdPostAdd />
          Create a post
        </Button>
        <Button colorPalette="red" variant="subtle">
          <LuLogIn />
          Login
        </Button>
      </Flex>
      {filteredPosts?.length ? (
        <PostsGrid posts={filteredPosts} onPostClick={onPostClick} />
      ) : isError ? (
        <ErrorMessage />
      ) : isPending ? (
        <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap="5">
          {[...Array(12)].map(() => (
            <Skeleton h="200px" />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState size="lg" title="Found 0 posts" description="Try adjusting your search." />
      )}
      {!!selectedPost && <PostDetailsView post={selectedPost} onClose={() => setSelectedPost(undefined)} />}
      {createPostFormOpen && <CreatePost onClose={() => setCreatePostFormOpen(false)} />}
    </>
  );
}

const ErrorMessage = () => {
  return (
    <div className="text-2xl center-items">
      <LuFrown className="mr-2" />
      Ooops, something went wrong. Try reloading the page.
    </div>
  );
};
