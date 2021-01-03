import { fetchTodo, persistTodo } from "./db.ts";
import { Todo } from "../models/todo.ts";
import { createId } from "../service/utils.ts";

type TodoData = Pick<Todo, "userId" | "title" | "status">;

// 获取 Todo 列表
export const getTodos = async (): Promise<Todo[]> => {
  const todos = await fetchTodo();

  return todos.sort((a, b) => a.title.localeCompare(b.title));
};

// 获取 todo 详情
export const getTodo = async (todoId: string): Promise<Todo | undefined> => {
  const todos = await fetchTodo();

  return todos.find((todo) => todo.id === todoId);
};

// 新建 todo
export const createTodo = async (todoData: TodoData): Promise<string> => {
  const todos = await fetchTodo();

  const newTodo: Todo = {
    ...todoData,
    id: createId(),
  };

  await persistTodo([...todos, newTodo]);

  return newTodo.id;
};

// 更新 todo
export const updateTodo = async (
  todoId: string,
  todoData: TodoData,
): Promise<void> => {
  const todo = await getTodo(todoId);

  if (!todo) {
    throw new Error("Todo is not found");
  }

  const updateTodo = {
    ...todo,
    ...todoData,
  };

  const todos = await fetchTodo();
  const filterTodos = todos.filter((todo) => todo.id !== todoId);

  persistTodo([...filterTodos, updateTodo]);
};

// 删除 todo
export const deleteTodo = async (todoId: string): Promise<void> => {
  const todos = await getTodos();

  const filterTodos = todos.filter((todo) => todo.id !== todoId);

  persistTodo([...filterTodos]);
};
