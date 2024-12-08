import { Card, Heading, SimpleGrid } from "@chakra-ui/react";

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
  return (
    <SimpleGrid columns={[1, 1, 2, 3, 3, 4]} gap="5">
      {posts.map((post) => (
        <Card.Root variant="subtle" size="sm" key={post.id} onClick={() => onPostClick(post)}>
          <Card.Header>
            <Heading>{post.title}</Heading>
          </Card.Header>
          <Card.Body>
            {post.authorId} __ {post.createdAt}
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
}
