import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { updateTodo } from "../service/todos.ts";
export default async (
  {
    params,
    request,
    response,
  }: { params: any; request: Request; response: Response },
) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = {
      message: "Invalid todo id",
    };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Invalid Data",
    };
    return;
  }

  const { value } = request.body({ type: "json" });
  const { userId, title, status } = await value;

  await updateTodo(todoId, { userId, title, status });

  response.status = 201;
  response.body = {
    message: "Todo updated",
  };
};
