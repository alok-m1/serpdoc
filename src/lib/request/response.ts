export function formatResponse(
  response: string | Record<string, unknown>,
  lang = "json",
) {
  if (lang !== "json") {
    return typeof response === "string"
      ? response
      : JSON.stringify(response, null, 2);
  }
  if (typeof response === "string") {
    try {
      return JSON.stringify(JSON.parse(response), null, 2);
    } catch {
      return response;
    }
  }
  return JSON.stringify(response, null, 2);
}
