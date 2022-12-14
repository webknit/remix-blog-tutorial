import { prisma } from "~/db.server";

import type { Post } from "@prisma/client";
export type { Post };

// type Post = {
//   slug: string;
//   title: string;
// };

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function updatePost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return await prisma.post.update({
    where: {
      slug: post.slug,
    },
    data: post,
  });
}

export async function deletePost(post: { slug: string }) {
  return await prisma.post.delete({
    where: {
      slug: post.slug,
    },
  });
}
