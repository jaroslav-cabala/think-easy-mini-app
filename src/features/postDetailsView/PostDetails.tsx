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
import { PostResponse } from "../postsView/useGetPosts";

export type PostDetails = Pick<PostResponse, "title" | "content" | "authorId" | "createdAt">;

type PostDetailsViewProps = {
  post: PostDetails;
  onClose: () => void;
};

export function PostDetailsView({ post, onClose }: PostDetailsViewProps) {
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
