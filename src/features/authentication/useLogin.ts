import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../../apiTypes";
import { loginEndoint } from "../../config";
import { MutationOptionsWithoutKeyAndFn } from "../../utilTypes";
import { AuthenticationError } from "./AuthenticationError";

type Credentials = {
  email: string;
  password: string;
};

const login = async (credentials: Credentials): Promise<LoginResponse> => {
  const response = await fetch(loginEndoint, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // I think it would be better if the API returned 401 status code instead of 400
    // when authorization was unsuccessful because of invalid credentials.
    if (response.status === 400) {
      throw new AuthenticationError("Invalid password");
    }
    throw new Error("Login failed");
  }

  return response.json();
};

export const useLogin = (
  mutationOptions?: MutationOptionsWithoutKeyAndFn<Awaited<ReturnType<typeof login>>, Error, Credentials>
) => {
  return useMutation({
    mutationFn: login,
    ...mutationOptions,
  });
};
