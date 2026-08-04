import { createOpenAI } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  tool,
  toUIMessageStream,
} from "ai";
import { z } from "zod";
import { source } from "@/lib/source";
import { Document, type DocumentData } from "flexsearch";
import type { ChatUIMessage, SearchTool } from "@/components/ai/AskAI";
import { checkRateLimit } from "@/lib/rate-limit";

const MAX_MESSAGES = 20;
const MAX_TEXT_LENGTH = 4000;

interface CustomDocument extends DocumentData {
  url: string;
  title: string;
  description: string;
  content: string;
}
const searchServer = createSearchServer();

async function createSearchServer() {
  const search = new Document<CustomDocument>({
    document: {
      id: "url",
      index: ["title", "description", "content"],
      store: true,
    },
  });

  const docs = await chunkedAll(
    source.getPages().map(async (page) => {
      if (!("getText" in page.data)) return null;

      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        content: await page.data.getText("processed"),
      } as CustomDocument;
    }),
  );

  for (const doc of docs) {
    if (doc) search.add(doc);
  }

  return search;
}

async function chunkedAll<O>(promises: Promise<O>[]): Promise<O[]> {
  const SIZE = 50;
  const out: O[] = [];
  for (let i = 0; i < promises.length; i += SIZE) {
    out.push(...(await Promise.all(promises.slice(i, i + SIZE))));
  }
  return out;
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/** System prompt, you can update it to provide more specific information */
const systemPrompt = [
  "You are SERPHouse AI, the official AI agent for the SERPHouse documentation site.",
  "Use the `search` tool to retrieve relevant docs context before answering when needed.",
  "The `search` tool returns raw JSON results from documentation. Use those results to ground your answer and cite sources as markdown links using the document `url` field when available.",
  "If you cannot find the answer in search results, say you do not know and suggest a better search query.",
  "Always format your response in Markdown. Use fenced code blocks with a language tag (e.g. ```json, ```bash, ```python) for any code, API requests, response bodies, or command examples so they render with syntax highlighting.",
  'Structure long answers with short headings and bullet lists. Put inline code, parameter names, and endpoint paths in backticks. Format external links as "link text" using Markdown link syntax.',
  "Keep responses short and to the point. Answer directly without excessive explanation, and avoid repeating information already present in the question.",
].join("\n");

export async function POST(req: Request, ctx: RouteContext<"/api/chat">) {
  const limit = checkRateLimit(req);
  if (!limit.ok) {
    return Response.json(
      { error: "Rate limit exceeded. Please slow down." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const reqJson = await req.json();

  const messages = (reqJson.messages ?? [])
    .slice(-MAX_MESSAGES)
    .map((message: ChatUIMessage) => ({
      ...message,
      parts: (message.parts ?? []).map((part) =>
        part.type === "text" && "text" in part
          ? { ...part, text: part.text.slice(0, MAX_TEXT_LENGTH) }
          : part,
      ),
    }));

  const result = streamText({
    model: openai.chat("gpt-5-nano"),
    stopWhen: stepCountIs(5),
    instructions: systemPrompt,
    tools: {
      search: searchTool,
    },
    messages: await convertToModelMessages<ChatUIMessage>(messages, {
      convertDataPart(part) {
        if (part.type === "data-client")
          return {
            type: "text",
            text: `[Client Context: ${JSON.stringify(part.data)}]`,
          };
      },
    }),
    toolChoice: "auto",
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}

const searchTool = tool({
  description: "Search the docs content and return raw JSON results.",
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().int().min(1).max(100).default(10),
  }),
  async execute({ query, limit }) {
    const search = await searchServer;
    return await search.searchAsync(query, {
      limit,
      merge: true,
      enrich: true,
    });
  },
}) satisfies SearchTool;
