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
} catch (e) {
  console.log(e);
}
