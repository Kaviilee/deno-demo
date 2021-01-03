import { Application } from "https://deno.land/x/oak/mod.ts";
import { HOST, PORT } from "./configs.ts";
import router from "./routes.ts";
import notFound from "./controllers/notFound.ts";
import errorMiddleware from "./middlewares/error.ts";

const app = new Application();

// console.log(router)

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

console.log(`Listening on ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
