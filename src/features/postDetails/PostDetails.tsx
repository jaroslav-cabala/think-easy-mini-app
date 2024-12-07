import { Text } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../components/ui/dialog";
import { PostResponse } from "../allPosts/useGetPosts";

export type PostDetails = Pick<PostResponse, "title" | "content" | "authorId" | "createdAt">;

type PostDetailsProps = {
  post: PostDetails;
  onClose: () => void;
};

export function PostDetails({ post, onClose }: PostDetailsProps) {
  return (
    <DialogRoot placement="center" scrollBehavior="inside" defaultOpen onExitComplete={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{post.content}</DialogBody>
        <DialogFooter>
          <Text>Created at: {post.createdAt}</Text>
          <Text>Author id: {post.authorId}</Text>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
