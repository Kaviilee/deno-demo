import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { createTodo } from "../service/todos.ts";

export default async (
  { request, response }: { request: Request; response: Response },
) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Invalid data",
    };
    return;
  }
  // fix Property 'title' does not exist on type 'Promise<any> | Promise<string> | Promise<URLSearchParams> | FormDataReader | Promise<Uint8Array> | undefined'.  https://github.com/oakserver/oak/issues/239
  const { value } = request.body({ type: "json" });
  const { userId, title, status = false } = await value;

  if (!userId || !title) {
    response.status = 422;
    response.body = {
      message: "userId and title are required",
    };
    return;
  }

  const todoId = await createTodo({ userId, title, status });

  response.body = {
    message: `Todo created: ${todoId}`,
  };
};
