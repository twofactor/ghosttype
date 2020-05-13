import useSWR from "swr";
import NextLink from "next/link";

import { Button, Text, Avatar, Skeleton } from "@chakra-ui/core";
import fetch from "../../lib/fetch";

export default function SignInButton() {
  // const { data, error } = useSWR("/api/me", fetch);

  // if (!data) {
  //   return (
  //     <Skeleton>
  //       <Button variant="outline" size="sm">
  //         Sign In/Sign Up
  //       </Button>
  //     </Skeleton>
  //   );
  // } else if (!data.nickname) {
  return (
    <a href="/api/login">
      <Button variant="outline" size="sm">
        <Text fontSize="sm">Sign In/Sign Up</Text>
      </Button>
    </a>
  );
  // } else {
  //   return (
  //     <NextLink href="/admin">
  //       <Button pl="6px" pr="6px" variant="outline" size="sm">
  //         <Avatar size="xs" mr="8px" name={data.name} src={data.picture} />
  //         <Text fontSize="sm">{data.nickname}</Text>
  //       </Button>
  //     </NextLink>
  //   );
}
