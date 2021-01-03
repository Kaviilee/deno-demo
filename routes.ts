import { Router } from "https://deno.land/x/oak/mod.ts";

import getTodos from "./controllers/getTodos.ts";
import createTodo from "./controllers/createTodo.ts";
import updateTodo from "./controllers/updateTodo.ts";
import deleteTodo from "./controllers/deleteTodo.ts";

const router = new Router();

router
  .get("/todos", getTodos)
  .post("/todos", createTodo)
  .put("/todos/:id", updateTodo)
  .delete("/todos/:id", deleteTodo);

export default router;
