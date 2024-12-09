import { Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { MdPostAdd } from "react-icons/md";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Field } from "../components/ui/field";
import { useCreatePost } from "./useCreatePost";
import { useAuthenticationContext } from "./authentication/AuthenticationProvider";
import { toast } from "react-toastify";
import { AuthenticationError } from "./authentication/AuthenticationError";

type CreatePostFormInputs = {
  title: string;
  content: string;
};

export function CreatePost() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuthenticationContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<CreatePostFormInputs>();

  const createPostMutation = useCreatePost({
    onSuccess: onCreatePostSuccess,
    onError: onCreatePostFailed,
  });

  function onCreatePostSuccess() {
    setOpen(false);
    reset();
    toast.success("Post created!");
  }

  function onCreatePostFailed(error: Error) {
    if (error instanceof AuthenticationError) {
      toast.error("Failed to create a post. Try to refresh the access token.");
    } else {
      toast.error("Failed to create a post for unknown reason.");
    }
  }

  const onSubmit: SubmitHandler<CreatePostFormInputs> = (inputs) => {
    createPostMutation.mutate(inputs);
  };

  return (
    <DialogRoot
      placement="center"
      scrollBehavior="outside"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      closeOnEscape={!createPostMutation.isPending}
      closeOnInteractOutside={!createPostMutation.isPending}
      onExitComplete={() => clearErrors()}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          colorPalette="green"
          variant="subtle"
          scrollBehavior="inside"
          disabled={!isAuthenticated || !user}
        >
          <MdPostAdd />
          Create a post
        </Button>
      </DialogTrigger>
      <DialogContent maxW="var(--chakra-sizes-3xl)">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create a post</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap="5" align="flex-start">
              <Field label="Title" invalid={!!errors.title} errorText={errors.title?.message}>
                <Input
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
              </Field>
              <Field label="Content" invalid={!!errors.content} errorText={errors.content?.message}>
                <Textarea minH="300px" {...register("content", { required: "Content is required" })} />
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Flex gap="5">
              <Button
                type="submit"
                colorPalette="green"
                variant="subtle"
                loading={createPostMutation.isPending}
              >
                Create
              </Button>
              <DialogActionTrigger asChild>
                <Button colorPalette="red" variant="subtle" disabled={createPostMutation.isPending}>
                  Cancel
                </Button>
              </DialogActionTrigger>
            </Flex>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
