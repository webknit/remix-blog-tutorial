import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function DynamicIndex() {
  const { posts } = useLoaderData() as unknown as LoaderData;
  console.log(posts);
  return (
    <main>
      <h1>dynamic/index.tsx {posts.length}</h1>
    </main>
  );
}
