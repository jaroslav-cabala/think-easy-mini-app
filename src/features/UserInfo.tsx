import { HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { useAuthenticationContext, User } from "./authentication/AuthenticationProvider";
import { Avatar } from "../components/ui/avatar";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../components/ui/menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuRefreshCw, LuLogOut } from "react-icons/lu";

export function UserInfo({ user }: { user: User }) {
  const { logout } = useAuthenticationContext();

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
          <MenuItem value="refresh-access-token" cursor="pointer">
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
