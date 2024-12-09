import { Flex, Input, Stack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useLogin } from "./authentication/useLogin";
import { LuLogIn } from "react-icons/lu";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PasswordInput } from "../components/ui/password-input";
import { Field } from "../components/ui/field";
import { useAuthenticationContext } from "./authentication/AuthenticationProvider";
import { LoginResponse } from "../apiTypes";
import { Alert } from "../components/ui/alert";
import { AuthenticationError } from "./authentication/AuthenticationError";

type LoginFormInputs = {
  email: string;
  password: string;
};

export function Login() {
  const { login } = useAuthenticationContext();
  const [open, setOpen] = useState(false);
  const [loginFailedAlert, setLoginFailedAlert] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const loginMutation = useLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginFailed,
  });

  function onLoginSuccess(data: LoginResponse) {
    setOpen(false);
    login({
      id: data.user.id,
      email: data.user.email,
      firstname: data.user.firstname,
      lastname: data.user.lastname,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  }

  function onLoginFailed(error: Error) {
    if (error instanceof AuthenticationError) {
      setLoginFailedAlert("Login failed. Invalid password!");
    } else {
      setLoginFailedAlert("Login attempt failed for unknown reason. Try again.");
    }
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = (formInputs) => {
    loginMutation.mutate(formInputs);
  };

  return (
    <DialogRoot
      placement="center"
      scrollBehavior="inside"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      closeOnEscape={!loginMutation.isPending}
      closeOnInteractOutside={!loginMutation.isPending}
      onExitComplete={() => setLoginFailedAlert(undefined)}
    >
      <DialogTrigger asChild>
        <Button colorPalette="red" variant="subtle" size="lg">
          <LuLogIn />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap="4" align="flex-start">
              <Alert hidden={!loginFailedAlert} status="warning" title={loginFailedAlert} />
              <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm,
                      message: "Email must be a valid email.",
                    },
                  })}
                />
              </Field>
              <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
                <PasswordInput {...register("password", { required: "Password is required" })} />
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            <Flex gap="5">
              <Button type="submit" colorPalette="green" variant="subtle" loading={loginMutation.isPending}>
                Login
              </Button>
              <DialogActionTrigger asChild>
                <Button colorPalette="red" variant="subtle" disabled={loginMutation.isPending}>
                  Cancel
                </Button>
              </DialogActionTrigger>
            </Flex>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
