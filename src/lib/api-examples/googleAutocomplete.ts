const jsonResponse = {
  "status": "success",
  "msg": "Completed",
  "results": {
    "search_metadata": {
      "id": 259261371,
      "status": "success",
      "created_at": "2026-08-03T05:16:23.000000Z",
      "processed_at": "2026-08-03 05:16:23"
    },
    "search_parameters": {
      "q": "coffee",
      "url": "https://www.google.com/complete/search?q=coffee&client=chrome&dpr=1&hl=en&gl=US",
      "client": "chrome",
      "lang": "en",
      "country": "US",
      "location": "Abernathy,Texas,United States"
    },
    "results": {
      "suggestions": [
        {
          "value": "coffee near me",
          "relevance": 1250,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+near+me"
        },
        {
          "value": "coffee shops near me",
          "relevance": 950,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+shops+near+me"
        },
        {
          "value": "coffee table",
          "relevance": 601,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+table"
        },
        {
          "value": "coffee shop",
          "relevance": 600,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+shop"
        },
        {
          "value": "coffee bean",
          "relevance": 560,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+bean"
        },
        {
          "value": "coffee maker",
          "relevance": 559,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+maker"
        },
        {
          "value": "coffee places near me",
          "relevance": 558,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+places+near+me"
        },
        {
          "value": "coffee grinder",
          "relevance": 557,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+grinder"
        },
        {
          "value": "coffee machine",
          "relevance": 556,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+machine"
        },
        {
          "value": "coffee cake recipe",
          "relevance": 555,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+cake+recipe"
        },
        {
          "value": "coffee bar",
          "relevance": 554,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+bar"
        },
        {
          "value": "coffee creamer",
          "relevance": 553,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+creamer"
        },
        {
          "value": "coffee cake",
          "relevance": 552,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+cake"
        },
        {
          "value": "coffee pot",
          "relevance": 551,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+pot"
        },
        {
          "value": "coffee meets bagel",
          "relevance": 550,
          "type": "QUERY",
          "link": "https://www.google.com/search?q=coffee+meets+bagel"
        }
      ],
      "verbatim_relevance": 1300
    }
  }
} as const;

export const googleAutocompleteJsonResponse = jsonResponse as Record<string, unknown>;
