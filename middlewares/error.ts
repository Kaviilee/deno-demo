import { Response } from "https://deno.land/x/oak/mod.ts";

type Continuation = () => Promise<void>;

export default async (
  { response }: { response: Response },
  next: Continuation,
) => {
  try {
    await next();
  } catch (err) {
    response.status = 500;
    response.body = { message: err.message };
  }
};
