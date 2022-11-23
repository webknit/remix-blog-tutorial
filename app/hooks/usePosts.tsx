import { useMatches } from "@remix-run/react";

export function usePosts(): any {
  const [root] = useMatches();
  return root;
  // return root.data?.account?.data;
}
