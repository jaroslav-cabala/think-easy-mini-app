import { Card, Group, Text, HStack, SimpleGrid } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import { useState } from "react";
import { PostDetailsFooter } from "./PostDetailsFooter";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
};

export type PostsGridProps = {
  posts: Array<Post>;
  onPostClick: (post: Post) => void;
};

export function PostsGrid({ posts, onPostClick }: PostsGridProps) {
  const [page, setPage] = useState(1);

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const postsChunk = posts.slice(startRange, endRange);

  return (
    <>
      <PaginationRoot
        variant="subtle"
        page={page}
        count={posts.length}
        pageSize={pageSize}
        onPageChange={(e) => setPage(e.page)}
        size="lg"
        siblingCount={1}
        mb="5"
      >
        <HStack>
          <Group attached flexWrap="wrap">
            <Text fontWeight="medium" mr="4">
              {posts.length} posts
            </Text>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Group>
        </HStack>
      </PaginationRoot>
      <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap="5">
        {postsChunk.map((post) => (
          <Card.Root variant="subtle" key={post.id} onClick={() => onPostClick(post)}>
            <Card.Body>
              <Text lineClamp={4} fontWeight="semibold" fontSize="lg">
                {post.title}
              </Text>
            </Card.Body>
            <Card.Footer>
              <PostDetailsFooter authorId={post.authorId} createdAt={post.createdAt} />
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </>
  );
}

const pageSize = 12;
