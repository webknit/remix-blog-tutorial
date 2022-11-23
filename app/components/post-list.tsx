import { Link } from "@remix-run/react";

type Post = {
  title: string;
  slug: string;
};

type Props = {
  posts: Post[];
};

export function PostList({ posts }: Props) {
  return (
    <nav className="col-span-4 md:col-span-1">
      <h1>Posts {posts.length}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
