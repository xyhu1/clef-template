import { Env } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    try {
      const result = await env.AI.run("typesafe/jev", {
        state: "Help! My payouts have been failing for 3 days.",
        questions: {
          is_urgent: {
            type: "noul",
            instructions: "Does this convey urgency?",
            criteria: {
              true: "Explicitly time-sensitive",
              false: "No urgency expressed",
            },
          },
          department: {
            type: "choice",
            instructions: "Which team should handle this?",
            criteria: {
              billing: "Payments, invoicing, refunds",
              technical: "Bugs, outages, integrations",
              sales: "Pricing, upgrades, new accounts",
            },
          },
          frustration: {
            type: "score",
            instructions: "How frustrated is the customer?",
            criteria: [
              "Calm",
              "Frustrated",
              "Very angry",
            ],
          },
        },
      });

      return Response.json(result);
    } catch (error) {
      return Response.json(
        { error: String(error) },
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
