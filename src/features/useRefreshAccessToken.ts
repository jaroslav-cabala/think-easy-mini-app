import { useMutation } from "@tanstack/react-query";
import { refreshAccessTokenEndpoint } from "../config";
import { MutationOptionsWithoutKeyAndFn } from "../utilTypes";
import { RefreshAccessTokenResponse } from "../apiTypes";
import { useAuthenticationContext } from "./authentication/AuthenticationProvider";
import { AuthenticationError } from "./authentication/AuthenticationError";

type RefreshTokenInput = {
  accessToken: string;
  refreshToken: string;
};

const refreshToken = async ({
  accessToken,
  refreshToken,
}: RefreshTokenInput): Promise<RefreshAccessTokenResponse> => {
  const response = await fetch(refreshAccessTokenEndpoint, {
    method: "POST",
    body: JSON.stringify({ token: refreshToken }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthenticationError("Unauthorized.");
    }
    throw new Error("Failed to refresh the access token!");
  }

  return response.json();
};

export const useRefreshToken = (
  mutationOptions?: MutationOptionsWithoutKeyAndFn<Awaited<ReturnType<typeof refreshToken>>, Error, unknown>
) => {
  const { user } = useAuthenticationContext();

  return useMutation({
    mutationFn: () =>
      refreshToken({ accessToken: user?.accessToken as string, refreshToken: user?.refreshToken as string }),
    ...mutationOptions,
  });
};
