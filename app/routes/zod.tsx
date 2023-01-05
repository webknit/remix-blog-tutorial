import { Form, useActionData } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { z } from "zod";
import { validateAction } from "~/utils";

const schema = z.object({
  title: z.string().min(3, "Name must be at least 3 characters long"),
  number: z.number().min(3, "must have name"),
});

type ActionInput = z.TypeOf<typeof schema>;

export async function action({ request }: ActionArgs) {
  const { formData, errors } = await validateAction<ActionInput>({
    request,
    schema,
  });

  return { formData, errors };
}

export default function Projects() {
  const data = useActionData();

  console.log(data);

  return (
    <Form method="post">
      <div>
        <input name="title" style={{ border: "1px solid red" }} />
        {data?.errors?.title && <p>{data.errors.title}</p>}
      </div>
      <div>
        <input name="number" style={{ border: "1px solid green" }} />
        {data?.errors?.number && <p>{data.errors.number}</p>}
      </div>
      <button type="submit">click</button>
    </Form>
  );
}
