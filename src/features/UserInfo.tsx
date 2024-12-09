import { HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { AuthenticationContext, User } from "./authentication/AuthenticationProvider";
import { Avatar } from "../components/ui/avatar";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../components/ui/menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuRefreshCw, LuLogOut } from "react-icons/lu";
import { useRefreshToken } from "./useRefreshAccessToken";
import { RefreshAccessTokenResponse } from "../apiTypes";
import { toast } from "react-toastify";

type UserInfoProps = {
  user: User;
  refreshAccessToken: AuthenticationContext["refreshAccessToken"];
  logout: AuthenticationContext["logout"];
};

export function UserInfo({ user, refreshAccessToken, logout }: UserInfoProps) {
  const refreshTokenMutation = useRefreshToken({
    onSuccess: onRefreshTokenSuccess,
    onError: onRefreshTokenFailed,
  });

  function onRefreshTokenSuccess(data: RefreshAccessTokenResponse) {
    refreshAccessToken(data.access_token);
    toast.success("Access token refreshed!");
  }

  function onRefreshTokenFailed() {
    toast.error("Failed to refresh the access token.");
  }

  return (
    <HStack key={user.id} gap="3">
      <Avatar name={`${user.firstname} ${user.lastname}`} size="lg" />
      <Stack gap="0">
        <Text fontWeight="medium">
          {user.firstname} {user.lastname}
        </Text>
        <Text color="fg.muted" textStyle="sm">
          {user.email}
        </Text>
      </Stack>
      <MenuRoot>
        <MenuTrigger pr="0">
          <IconButton aria-label="user options" variant="ghost">
            <BsThreeDotsVertical />
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem
            value="refresh-access-token"
            cursor="pointer"
            onClick={() => refreshTokenMutation.mutate({})}
          >
            <LuRefreshCw />
            Refresh access token
          </MenuItem>
          <MenuItem value="logout" color="red" cursor="pointer" onClick={() => logout()}>
            <LuLogOut />
            <Text>Log out</Text>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </HStack>
  );
}
