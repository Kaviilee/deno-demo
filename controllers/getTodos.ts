import { Response } from "https://deno.land/x/oak/mod.ts";
import { getTodos } from "../service/todos.ts";

export default async ({ response }: { response: Response }) => {
  response.body = await getTodos();
};
