import { Flex } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

type CreatePostProps = {
  onClose: () => void;
};

export function CreatePost({ onClose }: CreatePostProps) {
  return (
    <DialogRoot placement="center" scrollBehavior="inside" defaultOpen onExitComplete={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
        </DialogHeader>
        <DialogBody>form</DialogBody>
        <DialogFooter>
          <Flex gap="5">
            <Button colorPalette="green" variant="subtle" marginEnd="auto">
              Create
            </Button>
            <Button colorPalette="red" variant="subtle">
              Cancel
            </Button>
          </Flex>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
