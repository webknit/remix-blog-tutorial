import { Link, useMatches } from "@remix-run/react";
import { usePosts } from "~/hooks/usePosts";

export default function AdminIndex() {
  const matches = useMatches();

  const [root] = useMatches();

  const posts = matches.find((item) => item?.data?.posts)?.data?.posts;

  console.log(root);

  return (
    <div>
      <h1>Posts = {posts ? posts.length : 0}</h1>
      <p>
        <Link to="new" className="text-blue-600 underline">
          Create a New Post
        </Link>
      </p>
    </div>
  );
}
