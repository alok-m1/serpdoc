"use client";
import type { UseChatHelpers } from "@ai-sdk/react";
import type { ChatUIMessage } from "./types";

export const StorageKeyInput = "__ai_search_input";

export const brandGradient =
  "bg-linear-to-br from-fd-primary to-[oklch(0.62_0.15_215)]";

export const suggestions = [
  "How do I get an API key?",
  "How can i Contact Serphouse Team",
  "How much does it cost?",
  "how can i use with AI agents",
];

export function sendUserMessage(
  chat: UseChatHelpers<ChatUIMessage>,
  text: string,
) {
  void chat.sendMessage({
    role: "user",
    parts: [
      {
        type: "data-client",
        data: {
          location: location.href,
        },
      },
      {
        type: "text",
        text,
      },
    ],
  });
  localStorage.removeItem(StorageKeyInput);
}
