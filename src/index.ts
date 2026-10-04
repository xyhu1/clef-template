import { Env } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      const result = await env.AI.run(
        "@cf/meta/llama-3.1-8b-instruct-fp8",
        {
          messages: [
            {
              role: "user",
              content: "Say hello in one sentence.",
            },
          ],
        },
      );

      return Response.json(result);
    } catch (error) {
      return Response.json(
        { error: String(error) },
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
