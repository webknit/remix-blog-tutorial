import {
  ActionFunction,
  redirect,
  json,
  LoaderFunction,
} from "@remix-run/node";

import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "~/models/post.server";

import PostAdmin from "~/routes/posts/admin/index";

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));

  const formData = await request.formData();

  let { _action, ...values } = Object.fromEntries(formData);
  let { title, slug, markdown } = values;

  invariant(typeof slug === "string", "slug must be a string");

  if (_action == "delete") {
    await deletePost({ slug });
    return redirect("/posts/admin");
  }

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof markdown === "string", "markdown must be a string");
  invariant(typeof title === "string", "title must be a string");

  await updatePost({ title, slug, markdown });
  return redirect("/posts/admin");
};

import type { Post } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function SinglePost() {
  const errors = useActionData();
  const { post } = useLoaderData() as unknown as LoaderData;

  const transition = useTransition();
  const isCreating = Boolean(transition.submission);

  return isCreating ? (
    <>
      <h1>Something</h1>
    </>
  ) : (
    <>
      <Form method="post">
        <input value="delete" name="_action" readOnly hidden />
        <input value={post.slug} name="slug" readOnly hidden />
        <button>Delete</button>
      </Form>
      <Form method="post">
        <p>
          <label>
            Post Title:{" "}
            {errors?.title ? (
              <em className="text-red-600">{errors.title}</em>
            ) : null}
            <input
              type="text"
              name="title"
              className={inputClassName}
              defaultValue={post.title}
            />
          </label>
        </p>
        <p>
          <label>
            Post Slug:{" "}
            {errors?.slug ? (
              <em className="text-red-600">{errors.slug}</em>
            ) : null}
            <input
              type="text"
              name="slug"
              className={inputClassName}
              defaultValue={post.slug}
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">
            Markdown:{" "}
            {errors?.markdown ? (
              <em className="text-red-600">{errors.markdown}</em>
            ) : null}
          </label>
          <br />
          <textarea
            id="markdown"
            rows={20}
            name="markdown"
            className={`${inputClassName} font-mono`}
            defaultValue={post.markdown}
          />
        </p>
        <p className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            disabled={isCreating}
          >
            {isCreating ? "Update..." : "Update Post"}
          </button>
        </p>
      </Form>
    </>
  );
}
