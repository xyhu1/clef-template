import { Env } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      const result = await env.AI.run(
        "@cf/cloudflare/clef",
        {
          state: `
The agent used the following skill:

"Search the company drive for the latest sales report."

The agent searched the company drive and retrieved
sales_report_2026.pdf.

The retrieved report was the correct latest report.
          `,
          questions: {
            skill_success: {
              type: "noul",
              instructions:
                "Did the skill successfully complete the task?",
            },
          },
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
