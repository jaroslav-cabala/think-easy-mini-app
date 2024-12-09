import { Flex, Input, Box } from "@chakra-ui/react";
import { CreatePost } from "./CreatePost";
import { AuthenticationBar } from "./AuthenticationBar";

type ActionBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export function ActionBar({ searchValue, setSearchValue }: ActionBarProps) {
  return (
    <Flex mb="20px" align="center" flexWrap={{ base: "wrap", lg: "nowrap" }} gap="5">
      <Input
        order={{ base: 3, lg: 1 }}
        aria-label="search posts"
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
        placeholder="Search posts..."
        maxW={{ base: "full", lg: "500px" }}
        size="lg"
      />
      <Box marginEnd="auto" order={{ base: 1, lg: 2 }}>
        <CreatePost />
      </Box>
      <Box order={{ base: 2, lg: 3 }}>
        <AuthenticationBar />
      </Box>
    </Flex>
  );
}
