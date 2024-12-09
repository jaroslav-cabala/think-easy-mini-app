import { PostResponse } from "../apiTypes";
import { formatDateTimeString } from "../../utils";
import { Button, Flex, Text } from "@chakra-ui/react";

type PostDetailsFooter = Pick<PostResponse, "authorId" | "createdAt">;

// TODO implement ability to view posts of a specific user
export function PostDetailsFooter({ authorId, createdAt }: PostDetailsFooter) {
  return (
    <Flex justify="space-between" align="center" w="full">
      <Text fontSize="small">{formatDateTimeString(createdAt)}</Text>
      <Button size="xs" variant="ghost">
        Author
      </Button>
    </Flex>
  );
}
