import { DB } from "../configs.ts";
import { Todo } from "../models/todo.ts";

/**
 * 获取 Todo 数据
 * @returns Todo[]
 */
export const fetchTodo = async (): Promise<Todo[]> => {
  const data = await Deno.readFile(DB);

  const decoder = new TextDecoder();
  const decodedData = decoder.decode(data);

  return JSON.parse(decodedData);
};

/**
 * 写入数据
 * @param data Todo[] 需要写入数据库的数组
 */
export const persistTodo = async (data: Todo[]): Promise<void> => {
  const encoder = new TextEncoder();
  await Deno.writeFile(DB, encoder.encode(JSON.stringify(data)));
};
