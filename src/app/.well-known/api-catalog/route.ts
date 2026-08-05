// API catalog served as a Linkset (RFC 9264) per RFC 9727 so agents can
// discover the SERPHouse API portfolio from /.well-known/api-catalog.

const API_BASE = "https://api.serphouse.com";
const DOCS_BASE = "https://serphouse.com";

const apiCatalogProfile = "https://www.rfc-editor.org/info/rfc9727";

interface ApiEntry {
  name: string;
  method: "GET" | "POST";
  path: string;
  docs: string;
}

const apis: ApiEntry[] = [
  // Google
  { name: "Google Web Search API", method: "POST", path: "/google-web", docs: "/google-apis/google-search" },
  { name: "Google Lite Web Search API", method: "POST", path: "/web-search-lite", docs: "/google-apis/google-lite-web-search-api" },
  { name: "Google SERP (Top 100 Results) API", method: "POST", path: "/serp/google_advanced", docs: "/google-apis/google-serp-top-100-results" },
  { name: "Google Schedule SERP (Top 100) API", method: "POST", path: "/serp/google_advanced_scheduled", docs: "/google-apis/google-schedule-serp-top-100-results" },
  { name: "Google News API", method: "POST", path: "/google-news", docs: "/google-apis/google-news-api" },
  { name: "Google Image API", method: "POST", path: "/google-image", docs: "/google-apis/google-image-api" },
  { name: "Google Shopping API", method: "POST", path: "/google-shop", docs: "/google-apis/google-shopping-api" },
  { name: "Google Jobs API", method: "POST", path: "/google-jobs-api", docs: "/google-apis/google-jobs-api" },
  { name: "Google Local API", method: "POST", path: "/google-local-api", docs: "/google-apis/google-local-api" },
  { name: "Google Videos API", method: "POST", path: "/google-videos-api", docs: "/google-apis/google-videos-api" },
  { name: "Google Short Videos API", method: "POST", path: "/google-short-videos-api", docs: "/google-apis/google-short-videos-api" },
  { name: "Google Forums API", method: "POST", path: "/google-forums-api", docs: "/google-apis/google-forums-api" },
  { name: "Google Autocomplete API", method: "POST", path: "/google-autocomplete-api", docs: "/google-apis/google-autocomplete-api" },

  // Bing
  { name: "Bing Web Search API", method: "POST", path: "/bing-web", docs: "/bing-apis/bing-search-api" },
  { name: "Bing News API", method: "POST", path: "/bing-news", docs: "/bing-apis/bing-news-api" },
  { name: "Bing Image API", method: "POST", path: "/bing-image", docs: "/bing-apis/bing-image-api" },

  // Yahoo
  { name: "Yahoo Web Search API", method: "POST", path: "/yahoo-web", docs: "/yahoo-apis/yahoo-search-api" },
  { name: "Yahoo News API", method: "POST", path: "/yahoo-news", docs: "/yahoo-apis/yahoo-news-api" },
  { name: "Yahoo Image API", method: "POST", path: "/yahoo-image", docs: "/yahoo-apis/yahoo-image-api" },

  // Extra / platform
  { name: "Live SERP API (GET)", method: "GET", path: "/serp/live", docs: "/extra-apis/live-http-get" },
  { name: "Live SERP API (POST)", method: "POST", path: "/serp/live", docs: "/extra-apis/live-http-post" },
  { name: "Schedule SERP API", method: "POST", path: "/serp/schedule", docs: "/extra-apis/batch-serp" },
  { name: "Check SERP Status API", method: "GET", path: "/serp/check", docs: "/extra-apis/check-serp-status" },
  { name: "Get SERP Result API", method: "GET", path: "/serp/get", docs: "/extra-apis/get-serp-result" },
  { name: "Account Info API", method: "GET", path: "/account/info", docs: "/extra-apis/account-info" },
  { name: "Domains List API", method: "GET", path: "/domain/list", docs: "/extra-apis/domains-list" },
  { name: "Languages List API", method: "GET", path: "/language/list/{type}", docs: "/extra-apis/languages-list" },
  { name: "Locations List API", method: "GET", path: "/location/search", docs: "/extra-apis/locations-list" },
];

export const revalidate = false;

export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${DOCS_BASE}/.well-known/api-catalog`,
        "service-doc": [{ href: `${DOCS_BASE}/about-the-serp-api`, type: "text/html" }],
        describedby: [{ href: `${DOCS_BASE}/llms.txt`, type: "text/plain" }],
        item: apis.map((api) => ({
          href: `${API_BASE}${api.path}`,
          title: api.name,
          type: "application/json",
        })),
      },
      ...apis.map((api) => ({
        anchor: `${API_BASE}${api.path}`,
        "service-doc": [{ href: `${DOCS_BASE}${api.docs}`, type: "text/html" }],
      })),
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": `application/linkset+json; profile="${apiCatalogProfile}"`,
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
