import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { PostList } from "~/components/post-list";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() });
};

export default function Dynamic() {
  const { posts } = useLoaderData() as unknown as LoaderData;
  return (
    <div>
      <h1>dynamic {posts.length}</h1>
      <Outlet />
    </div>
  );
}
