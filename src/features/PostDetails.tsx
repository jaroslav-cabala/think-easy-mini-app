import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../components/ui/dialog";
import { PostResponse } from "../apiTypes";
import { PostDetailsFooter } from "./PostDetailsFooter";

export type PostDetails = Pick<PostResponse, "title" | "content" | "authorId" | "createdAt">;

type PostDetailsViewProps = {
  post: PostDetails;
  onClose: () => void;
};

export function PostDetailsView({ post, onClose }: PostDetailsViewProps) {
  return (
    <DialogRoot placement="center" scrollBehavior="inside" defaultOpen onExitComplete={() => onClose()}>
      <DialogContent maxW="var(--chakra-sizes-4xl)">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{post.content}</DialogBody>
        <DialogFooter>
          <PostDetailsFooter authorId={post.authorId} createdAt={post.createdAt} />
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
