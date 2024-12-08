import { useQuery } from "@tanstack/react-query";
import { loginEndoint } from "../../config";
import { QueryOptionsWithoutKeyAndFn } from "../../types";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
  };
};

const login = async ({ email, password }: Credentials): Promise<LoginResponse> => {
  const response = await fetch(loginEndoint, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login!");
  }

  return response.json();
};

type UseLoginProps = QueryOptionsWithoutKeyAndFn<LoginResponse> & Credentials;

export const useLogin = ({ email, password, ...queryOptions }: UseLoginProps) =>
  useQuery<LoginResponse>({
    queryKey: ["login", email],
    queryFn: () => login({ email, password }),
    ...queryOptions,
  });

type Credentials = {
  email: string;
  password: string;
};
