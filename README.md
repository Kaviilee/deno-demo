# Deno Demo

> 项目采用的框架是 `oak`，应该是对应了 Node.js 的 `Koa`，如果之前使用过 Koa 的话，使用 `oak` 这个框架应该会很熟悉。

因为笔者是用的 VSCode 在开发，所以在开始写 Deno 项目前我们先做好相关设置。

在 `.vscode/settings.json` 中写入设置

```json
{
  "deno.enable": true,
  "deno.import_intellisense_origins": {
    "https://deno.land": true
  },
  "deno.lint": true,
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "denoland.vscode-deno",
  },
}
```
使得编辑器在写 deno 时能够进行代码提示。

## 项目结构
```bash
└── deno-demo
    ├── configs.ts # 配置信息文件
    ├── db # 数据库目录
    ├── controllers # 控制器目录
    ├── app.ts # 入口文件
    ├── middlewares # 中间件目录
    ├── models # 模型定义目录
    ├── routes.ts # 路由文件
    └── services # 服务层程序目录
```

## 入口文件

**app.ts**

```ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { HOST, PORT } from "./configs.ts";
import router from "./routes.ts";
import notFound from "./controllers/notFound.ts";
import errorMiddleware from "./middlewares/error.ts";

const app = new Application();

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`Listening on ${PORT}...`);

try {
  await app.listen(`${HOST}:${PORT}`);
} catch(e) {
  console.log(e)
}
```
从以上的代码来看，整个流程跟 Node.js 使用 Koa 开发几乎一样。

## 配置文件

**configs.ts**
```ts
const env = Deno.env.toObject();

export const HOST = env.HOST || "127.0.0.1";
export const PORT = env.PORT || 3000;
export const DB = env.DB || "./db/todos.json";
```
在配置文件中配置 `HOST`、`PORT`、`DB` 等参数。

## 路由配置

**routes.ts**
```ts
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
```
路由文件也和使用 `Koa-router` 时的代码差不多。

## 定义模型（model）

定义模型在本项目中体现为定义了一个接口

**model/todo.ts**
```ts
export interface Todo {
  id: string;
  userId: number;
  title: string;
  status: boolean;
}

```

## 数据操作

**service/db.ts**
```ts
import { DB } from "../configs.ts";
import { Todo } from "../models/todo.ts";

// 获取 Todo 数据
export const fetchTodo = async (): Promise<Todo[]> => {
  const data = await Deno.readFile(DB);

  const decoder = new TextDecoder();
  const decodedData = decoder.decode(data);

  return JSON.parse(decodedData);
};

// 写入 Todo 数据
export const persistTodo = async (data: Todo[]): Promise<void> => {
  const encoder = new TextEncoder();
  await Deno.writeFile(DB, encoder.encode(JSON.stringify(data)));
};
```

## 数据的增删改查

详情见项目的 `controllers` 下的文件

## Not Found
当 api 不能匹配到对应的路由时，返回 `Not Found` 信息

```ts
import { Response } from "https://deno.land/x/oak/mod.ts";

export default ({ response }: { response: Response }) => {
  response.status = 404;
  response.body = { message: "Not Found" };
};

```

## 中间件 `Middlewares`
我们定义了一个中间件 `error.ts` 来处理读不到数据的错误

**moddlewares/error.ts**
```ts
import { Response } from "https://deno.land/x/oak/mod.ts";

export default async (
  { response }: { response: Response },
  next: () => Promise<void>,
) => {
  try {
    await next();
  } catch (err) {
    response.status = 500;
    response.body = { message: err.message };
  }
};

```

## 总结

在进行以上代码的写入后，我们就可以进行 **run** 整个项目了
注意 run 的时候要带上 `-A` 或 `--allow-all`，意思是给予全部权限给当前项目。
```bash
deno run -A ./app.ts

Check file:///D:/DenoDemo/app.ts
Listening on 3000...
```
ok！整个项目就跑起来啦。这次 deno 的初体验也就完成了。