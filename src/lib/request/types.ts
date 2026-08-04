export type Fmt = "curl" | "js" | "py" | "php" | "go";

export type ParamValue = string | number | boolean;

export type Params = Record<string, ParamValue>;

export type ParamEntry = [string, ParamValue];

export type PayloadKind = "search" | "params" | "type" | "none";

export type SdkCall = {
  node: string;
  php: string;
  payload: PayloadKind;
};

export const SDK_CALLS: Record<string, SdkCall> = {
  "/google-web": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-image": {
    node: "google.image",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-news": {
    node: "google.news",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-shop": {
    node: "google.shopping",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-videos-api": {
    node: "google.video",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-short-videos-api": {
    node: "google.short_video",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-local-api": {
    node: "google.local",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-jobs-api": {
    node: "google.jobs",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-forums-api": {
    node: "google.forums",
    php: "serpApi->live",
    payload: "search",
  },
  "/google-autocomplete-api": {
    node: "google.autocomplete",
    php: "serpApi->live",
    payload: "search",
  },
  "/bing-web": { node: "bing.search", php: "serpApi->live", payload: "search" },
  "/bing-image": {
    node: "bing.image",
    php: "serpApi->live",
    payload: "search",
  },
  "/bing-news": { node: "bing.news", php: "serpApi->live", payload: "search" },
  "/yahoo-web": {
    node: "yahoo.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/yahoo-image": {
    node: "yahoo.image",
    php: "serpApi->live",
    payload: "search",
  },
  "/yahoo-news": {
    node: "yahoo.news",
    php: "serpApi->live",
    payload: "search",
  },
  "/web-search-lite": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/serp/live": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/serp/google_advanced": {
    node: "google.search",
    php: "serpApi->live",
    payload: "search",
  },
  "/account/info": {
    node: "extra.account_info",
    php: "account->fetch",
    payload: "none",
  },
  "/domain/list": {
    node: "extra.domain_list",
    php: "domains->list",
    payload: "none",
  },
  "/language/list/google": {
    node: "extra.language_list",
    php: "languages->list",
    payload: "type",
  },
  "/location/search": {
    node: "extra.location_search",
    php: "location->search",
    payload: "params",
  },
};

export type BatchItem = Record<string, ParamValue>;

export const pathFrom = (endpoint: string): string =>
  endpoint.replace(/^https?:\/\/[^/]+/, "");

export const sdkCallFor = (endpoint: string): SdkCall | undefined =>
  SDK_CALLS[pathFrom(endpoint)];

export const engineFrom = (endpoint: string): string =>
  endpoint.split("/").pop() || "google";
