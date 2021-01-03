import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";
import { deleteTodo, getTodo } from "../service/todos.ts";

export default async (
  { params, response }: { params: RouteParams; response: Response },
) => {
  const todoId = params.id;

  if (!todoId) {
    response.status == 400;
    response.body = {
      message: "Invalid Data",
    };
    return;
  }

  const todo = await getTodo(todoId);

  if (!todo) {
    response.status = 404;
    response.body = {
      message: `Todo with ${todoId} is not found`,
    };
    return;
  }

  await deleteTodo(todoId);
  response.status = 201;
  response.body = {
    message: "Todo deleted",
  };
};
