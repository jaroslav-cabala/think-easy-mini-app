import { Box, Flex, Input, SimpleGrid } from "@chakra-ui/react";
import { useDebounceState } from "../components/hooks/useDebounceState";
import { useState } from "react";
import { useGetPosts } from "./useGetPosts";
import { Post, PostsGrid } from "./PostsGrid";
import { LuFrown } from "react-icons/lu";
import { PostDetails, PostDetailsView } from "./PostDetails";
import { EmptyState } from "../components/ui/empty-state";
import { Skeleton } from "../components/ui/skeleton";
import { CreatePost } from "./CreatePost";
import { AuthenticationBar } from "./AuthenticationBar";

export function PostsView() {
  const [searchValue, debouncedSearchValue, setSearchValue] = useDebounceState("");
  const [selectedPost, setSelectedPost] = useState<PostDetails | undefined>();
  const { data: posts, isPending, isError } = useGetPosts();

  const onPostClick = (post: Post) => {
    setSelectedPost(post);
  };

  // const t0 = performance.now();
  const filteredPosts = debouncedSearchValue
    ? posts?.filter((post) => post.title.includes(debouncedSearchValue) || post.content.includes(searchValue))
    : posts;
  // const t1 = performance.now();
  // console.log(`filtering took ${t1 - t0} milliseconds. Filter by ${debouncedSearchValue}`);

  return (
    <>
      <Flex mb="20px" align="center" flexWrap={{ base: "wrap", lg: "nowrap" }} gap="5">
        <Input
          order={{ base: 3, lg: 1 }}
          aria-label="search posts"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder="Search posts..."
          maxW={{ base: "full", lg: "500px" }}
          size="lg"
        />
        <Box marginEnd="auto" order={{ base: 1, lg: 2 }}>
          <CreatePost />
        </Box>
        <Box order={{ base: 2, lg: 3 }}>
          <AuthenticationBar />
        </Box>
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
