# Deno Demo

> 项目采用的框架是 `oak`，应该是对应了 Node.js 的 `Koa`，如果之前使用过 Koa 的话，使用 `oak` 这个框架应该会很熟悉。

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
从以上的代码来看，整个流程跟 Node.js 使用 Koa 来开发几乎一样。

## 配置文件 configs.ts

```ts
const env = Deno.env.toObject();

export const HOST = env.HOST || "127.0.0.1";
export const PORT = env.PORT || 3000;
export const DB = env.DB || "./db/todos.json";

```