const jsonResponse = {
  "status": "success",
  "msg": "Completed",
  "results": {
    "search_metadata": {
      "id": 259338920,
      "status": "success",
      "created_at": "2026-08-03T06:52:55.000000Z",
      "processed_at": "2026-08-03 06:52:55"
    },
    "search_parameters": {
      "domain": "google.com",
      "lang": "en",
      "country": "IN",
      "location": "Mumbai,Maharashtra,India",
      "q": "scraping guides",
      "device": "desktop",
      "url": "https://www.google.com/search?q=scraping+guides&uule=w+CAIQICIYTXVtYmFpLE1haGFyYXNodHJhLEluZGlh&hl=en&gl=IN&ie=UTF-8&udm=7",
      "page": "1",
      "num": 10,
      "ie": "UTF-8",
      "udm": "7"
    },
    "results": {
      "search_information": [
        {
          "total_results": "45,70,000",
          "time_taken_displayed": "0.34"
        }
      ],
      "videos": [
        {
          "position": 1,
          "title": "Learn Web Scraping with Python: A Beginner's Guide",
          "link": "https://www.youtube.com/watch?v=b8q98xvyIqg",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "data:image/jpeg;base64,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",
          "date": "20 Dec 2024",
          "snippet": "Are you curious about web scraping and how to extract data from websites? In this beginner-friendly tutorial, Codecademy community member&nbsp;...",
          "duration": "1:13:01",
          "extensions": [
            "YouTube",
            "Codecademy",
            "20 Dec 2024"
          ],
          "key_moments": [
            {
              "title": "Resources",
              "time": "01:15",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=75"
            },
            {
              "title": "Inspect Element",
              "time": "09:18",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=558"
            },
            {
              "title": "Find the Url of the Image",
              "time": "19:57",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=1197"
            },
            {
              "title": "Downloading the Comic",
              "time": "27:00",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=1620"
            },
            {
              "title": "How To Target a Page",
              "time": "35:39",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=2139"
            },
            {
              "title": "Css Selector",
              "time": "42:02",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=2522"
            },
            {
              "title": "Legal and Ethical Implications",
              "time": "01:01:50",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=3710"
            },
            {
              "title": "How Do You Ensure You'Re Not Going To Crash Crash a Website or Get Captured",
              "time": "01:05:10",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=3910"
            },
            {
              "title": "Why Did I Use Http",
              "time": "01:06:54",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=4014"
            },
            {
              "title": "Should We Usually Do Web Scraping or Should the Client Deliver Us Access to the Data",
              "time": "01:10:22",
              "link": "https://www.youtube.com/watch?v=b8q98xvyIqg&t=4222"
            }
          ]
        },
        {
          "position": 2,
          "title": "Ultimate Guide To Web Scraping - Node.js & Python ...",
          "link": "https://www.youtube.com/watch?v=XMu46BRPLqA",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "data:image/jpeg;base64,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",
          "date": "13 Aug 2024",
          "snippet": "In this guide you will learn all about web scraping. We will go through some slides and then scrape a website using Node.js and the&nbsp;...",
          "duration": "50:13",
          "extensions": [
            "YouTube",
            "Traversy Media",
            "13 Aug 2024"
          ],
          "key_moments": [
            {
              "title": "Intro",
              "time": "00:00",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=0"
            },
            {
              "title": "What Is Web Scraping?",
              "time": "02:01",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=121"
            },
            {
              "title": "Legal &amp; Ethical Considerations",
              "time": "02:58",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=178"
            },
            {
              "title": "History Of Web Scraping",
              "time": "03:42",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=222"
            },
            {
              "title": "Why Use Web Scraping?",
              "time": "04:41",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=281"
            },
            {
              "title": "How Do Scrapers Work?",
              "time": "05:53",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=353"
            },
            {
              "title": "Tools &amp; Libraries",
              "time": "06:57",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=417"
            },
            {
              "title": "Basic Steps",
              "time": "08:32",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=512"
            },
            {
              "title": "Additional Steps",
              "time": "10:28",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=628"
            },
            {
              "title": "What Are We Scraping?",
              "time": "12:15",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=735"
            },
            {
              "title": "Node",
              "time": "15:03",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=903"
            },
            {
              "title": "Python Web Scraper",
              "time": "33:44",
              "link": "https://www.youtube.com/watch?v=XMu46BRPLqA&t=2024"
            }
          ]
        },
        {
          "position": 3,
          "title": "Learn Web Scraping in 5 Minutes (NO PRIOR KNOWLEDGE)",
          "link": "https://www.youtube.com/watch?v=hHQlcnubuFI",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "data:image/png;base64,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",
          "date": "5 Mar 2026",
          "snippet": "... scraping web scraping tutorial python web scraping web scraping python programming beautifulsoup beautifulsoup4 #programming #coding #",
          "duration": "4:53",
          "extensions": [
            "YouTube",
            "CodeHead",
            "5 Mar 2026"
          ],
          "key_moments": null
        },
        {
          "position": 4,
          "title": "Web Scraping 101: How To Scrape 99% of Sites",
          "link": "https://www.youtube.com/watch?v=WYp0dmZOHXM",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "data:image/jpeg;base64,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",
          "date": "19 Nov 2024",
          "snippet": "Don&#39;t miss out on Smartproxy&#39;s powerful tools for web scraping. Use my links to access: - Residential proxies free trial:&nbsp;...",
          "duration": "18:58",
          "extensions": [
            "YouTube",
            "Dorian Develops",
            "19 Nov 2024"
          ],
          "key_moments": null
        },
        {
          "position": 5,
          "title": "Web Scraping with JavaScript: Complete Guide 2026",
          "link": "https://daily.dev/posts/web-scraping-with-javascript-complete-guide-2026-3ev7u1lzh",
          "displayed_link": "daily.dev › posts › web-scraping-with-javascript-comple... ",
          "thumbnail": "data:image/jpeg;base64,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",
          "date": "20 Apr 2026",
          "snippet": "A beginner-friendly guide to building a JavaScript web scraper using Node.js, Axios, and Cheerio. Covers fetching static HTML,&nbsp;...",
          "duration": "9:01",
          "extensions": [
            "daily.dev",
            "Oxylabs",
            "20 Apr 2026"
          ],
          "key_moments": null
        },
        {
          "position": 6,
          "title": "Mastering Web Scraping Techniques for REAL Data Extraction",
          "link": "https://www.youtube.com/watch?v=41Um8a40XrA",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "data:image/jpeg;base64,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",
          "date": "24 Oct 2024",
          "snippet": "Mastering Web Scraping is essential for those who want to scrape data from the internet. Real estate data, e-commerce and stock prices are&nbsp;...",
          "duration": "36:07",
          "extensions": [
            "YouTube",
            "Thomas Janssen",
            "24 Oct 2024"
          ],
          "key_moments": [
            {
              "title": "Intro",
              "time": "00:00",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=0"
            },
            {
              "title": "Basics of web scraping with Python",
              "time": "01:19",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=79"
            },
            {
              "title": "Spoofing headers",
              "time": "10:54",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=654"
            },
            {
              "title": "Using a proxy server",
              "time": "13:49",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=829"
            },
            {
              "title": "Rotating proxy servers",
              "time": "15:52",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=952"
            },
            {
              "title": "How to use Bright Data residential proxy",
              "time": "19:33",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=1173"
            },
            {
              "title": "Scraping with a headful browser and Selenium",
              "time": "21:18",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=1278"
            },
            {
              "title": "How to use Selenium for websites with lazy loading",
              "time": "23:33",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=1413"
            },
            {
              "title": "How to use Selenium for websites with \"more",
              "time": "26:05",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=1565"
            },
            {
              "title": "Scraping data with a Web Scraping API - Bright Data",
              "time": "29:20",
              "link": "https://www.youtube.com/watch?v=41Um8a40XrA&t=1760"
            }
          ]
        },
        {
          "position": 7,
          "title": "Scrape Any Website in 5 Minutes! Web Scraping Tutorial",
          "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "data:image/jpeg;base64,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",
          "date": "11 Apr 2024",
          "snippet": "In this tutorial, I will demonstrate how to efficiently scrape any website in just 5 minutes, using the Bright Data Web Unlocker tool.",
          "duration": "21:39",
          "extensions": [
            "YouTube",
            "Kunal Kushwaha",
            "11 Apr 2024"
          ],
          "key_moments": [
            {
              "title": "Introduction",
              "time": "00:00",
              "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo&t=0"
            },
            {
              "title": "Challenges with data scraping",
              "time": "01:56",
              "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo&t=116"
            },
            {
              "title": "Introduction to Bright Data",
              "time": "04:13",
              "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo&t=253"
            },
            {
              "title": "Demo",
              "time": "06:51",
              "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo&t=411"
            },
            {
              "title": "Python code",
              "time": "15:49",
              "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo&t=949"
            },
            {
              "title": "Closing remarks",
              "time": "19:37",
              "link": "https://www.youtube.com/watch?v=5U4OVXDw1Zo&t=1177"
            }
          ]
        },
        {
          "position": 8,
          "title": "Scraping Data from a Real Website | Web Scraping in Python",
          "link": "https://www.youtube.com/watch?v=8dTpNajxaH0",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlzbpMNMrTqqj22y6djlpbgE148MPIQezZgOGKgbQr5V5bcaHtllKpewu0026s",
          "date": "11 Jul 2023",
          "snippet": "Comments &middot; Find and Find_All | Web Scraping in Python &middot; Web Scraping 101: How To Scrape 99% of Sites &middot; Python for Neuroscience #1: Why Python and&nbsp;...",
          "duration": "25:23",
          "extensions": [
            "YouTube",
            "Alex The Analyst",
            "11 Jul 2023"
          ],
          "key_moments": null
        },
        {
          "position": 9,
          "title": "Ultimate Web Scraping tutorial",
          "link": "https://www.youtube.com/watch?v=1227R6KY8Ts",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEp7PphhEkKVw9orPBZaQ3EybwI8Dujz2ayPr14YTujVPJ73TkA5jeCgu0026s",
          "date": "8 Nov 2024",
          "snippet": "Checkout DataImpulse: https://dataimpulse.com/?utm_source=Youtube&amp;utm_medium=Video&amp;utm_campaign=CodeWithHarry In this video,&nbsp;...",
          "duration": "41:31",
          "extensions": [
            "YouTube",
            "CodeWithHarry",
            "8 Nov 2024"
          ],
          "key_moments": [
            {
              "title": "Introduction",
              "time": "00:00",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=0"
            },
            {
              "title": "Collecting HTML",
              "time": "02:14",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=134"
            },
            {
              "title": "Using BeautifulSoup",
              "time": "15:19",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=919"
            },
            {
              "title": "When to Use BeautifulSoup",
              "time": "20:42",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=1242"
            },
            {
              "title": "Requests HTML",
              "time": "21:45",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=1305"
            },
            {
              "title": "Selenium",
              "time": "28:13",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=1693"
            },
            {
              "title": "Scrapy",
              "time": "36:49",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=2209"
            },
            {
              "title": "More Libraries",
              "time": "40:33",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=2433"
            },
            {
              "title": "Conclusion",
              "time": "41:11",
              "link": "https://www.youtube.com/watch?v=1227R6KY8Ts&t=2471"
            }
          ]
        },
        {
          "position": 10,
          "title": "Beginners Guide To Web Scraping with Python - All You Need ...",
          "link": "https://www.youtube.com/watch?v=QhD015WUMxE",
          "displayed_link": "www.youtube.com › watch ",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfoRNPrSshIZgDUQC6cbuDpX9qS5Txnq0a7fWgrGo1Xn3m9f26dDhkmgu0026s",
          "date": "27 Nov 2021",
          "snippet": "The web is full of data. Lots and lots of data. Data prime for scraping. But manually going to a website and copying and pasting the data&nbsp;...",
          "duration": "7:36",
          "extensions": [
            "YouTube",
            "Tinkernut",
            "27 Nov 2021"
          ],
          "key_moments": [
            {
              "title": "Introduction",
              "time": "00:00",
              "link": "https://www.youtube.com/watch?v=QhD015WUMxE&t=0"
            },
            {
              "title": "Setup",
              "time": "00:42",
              "link": "https://www.youtube.com/watch?v=QhD015WUMxE&t=42"
            },
            {
              "title": "Background",
              "time": "01:16",
              "link": "https://www.youtube.com/watch?v=QhD015WUMxE&t=76"
            },
            {
              "title": "Legality Concerns",
              "time": "02:23",
              "link": "https://www.youtube.com/watch?v=QhD015WUMxE&t=143"
            },
            {
              "title": "Writing The Code",
              "time": "02:51",
              "link": "https://www.youtube.com/watch?v=QhD015WUMxE&t=171"
            },
            {
              "title": "Conclusion",
              "time": "06:47",
              "link": "https://www.youtube.com/watch?v=QhD015WUMxE&t=407"
            }
          ]
        }
      ]
    }
  }
} as const;

export const googleVideosHtmlResponse = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Google Videos API — Example Response</title>
  <style>

:root {
  --bg: #f6f7fb;
  --card: #ffffff;
  --ink: #0f172a;
  --muted: #64748b;
  --accent: #4f46e5;
  --accent-soft: #eef2ff;
  --line: #e2e8f0;
  --chip: #f1f5f9;
  --shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.06);
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: linear-gradient(120deg, #312e81 0%, #4f46e5 55%, #7c3aed 100%);
  color: #fff;
}
.brand { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: 0.02em; }
.brand .dot { width: 9px; height: 9px; border-radius: 99px; background: #c7d2fe; box-shadow: 0 0 0 4px rgba(199, 210, 254, 0.25); }
.brand .sep { color: rgba(255,255,255,0.55); font-weight: 400; }
.badge {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em;
  padding: 5px 12px; border-radius: 99px;
  background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.28);
}
.wrap { max-width: 860px; margin: 0 auto; padding: 32px 24px 56px; }
.hero { padding: 8px 4px 20px; }
.hero h1 { margin: 0 0 8px; font-size: 30px; font-weight: 800; letter-spacing: -0.02em; }
.meta { margin: 0; color: var(--muted); font-size: 14px; }
.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 22px 24px;
  margin: 0 0 18px;
}
.eyebrow {
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em;
  color: var(--accent); font-weight: 700; margin-bottom: 4px;
}
.card h2 { margin: 0 0 14px; font-size: 19px; font-weight: 700; letter-spacing: -0.01em; }
.video {
  display: flex; align-items: flex-start; gap: 14px;
  text-decoration: none; color: inherit;
  padding: 14px 12px; border-radius: 12px;
  border: 1px solid transparent;
}
.video:hover { background: var(--accent-soft); border-color: #c7d2fe; }
.thumb {
  flex: none; width: 120px; height: 68px; border-radius: 10px;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
  border: 1px solid var(--line);
}
.thumb svg { width: 26px; height: 26px; fill: var(--accent); }
.video-title { font-size: 15px; font-weight: 650; color: #4338ca; margin: 0 0 3px; }
.video-title:hover { text-decoration: underline; }
.video-meta { font-size: 12.5px; color: var(--muted); }
.video-duration {
  display: inline-block; font-size: 11px; font-weight: 700; margin-top: 6px;
  padding: 2px 7px; border-radius: 6px;
  background: #0f172a; color: #fff;
}
.snippet { margin: 6px 0 0; font-size: 13.5px; color: #334155; }
.foot { text-align: center; color: var(--muted); font-size: 12.5px; padding: 0 24px 40px; }
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0b1120; --card: #111a2e; --ink: #e2e8f0; --muted: #94a3b8;
    --accent: #818cf8; --accent-soft: #1e293b; --line: #1e293b; --chip: #1a2440;
  }
  .video-title { color: #a5b4fc; }
  .snippet { color: #cbd5e1; }
  .video-duration { background: #e2e8f0; color: #0f172a; }
  .thumb { background: #1e293b; }
  .topbar { background: linear-gradient(120deg, #1e1b4b 0%, #312e81 55%, #4c1d95 100%); }
  .card, .video, .thumb { box-shadow: none; }
}

  </style>
</head>
<body>
  <header class="topbar">
    <div class="brand"><span class="dot"></span> SERPHouse <span class="sep">/</span> Google Videos API</div>
    <div class="badge">example response</div>
  </header>
  <main class="wrap">
    <section class="hero">
      <h1>scraping guides</h1>
      <p class="meta">About 45,70,000 results (0.34 s) &nbsp;·&nbsp; google.com &nbsp;·&nbsp; en &nbsp;·&nbsp; Mumbai,Maharashtra,India</p>
    </section>
    <section class="card">
      <div class="eyebrow">videos</div>
      <h2>Videos</h2>
      <a class="video" href="https://www.youtube.com/watch?v=b8q98xvyIqg">
        <div class="thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="video-title">Learn Web Scraping with Python: A Beginner's Guide</div>
          <div class="video-meta">Codecademy &middot; 20 Dec 2024 &middot; YouTube</div>
          <div class="video-duration">1:13:01</div>
          <p class="snippet">Are you curious about web scraping and how to extract data from websites? In this beginner-friendly tutorial, Codecademy community member ...</p>
        </div>
      </a>
      <a class="video" href="https://www.youtube.com/watch?v=XMu46BRPLqA">
        <div class="thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="video-title">Ultimate Guide To Web Scraping - Node.js &amp; Python ...</div>
          <div class="video-meta">Traversy Media &middot; 13 Aug 2024 &middot; YouTube</div>
          <div class="video-duration">50:13</div>
          <p class="snippet">In this guide you will learn all about web scraping. We will go through some slides and then scrape a website using Node.js and the ...</p>
        </div>
      </a>
      <a class="video" href="https://www.youtube.com/watch?v=hHQlcnubuFI">
        <div class="thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="video-title">Learn Web Scraping in 5 Minutes (NO PRIOR KNOWLEDGE)</div>
          <div class="video-meta">CodeHead &middot; 5 Mar 2026 &middot; YouTube</div>
          <div class="video-duration">4:53</div>
          <p class="snippet">... scraping web scraping tutorial python web scraping web scraping python programming beautifulsoup beautifulsoup4 #programming #coding #</p>
        </div>
      </a>
      <a class="video" href="https://www.youtube.com/watch?v=WYp0dmZOHXM">
        <div class="thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="video-title">Web Scraping 101: How To Scrape 99% of Sites</div>
          <div class="video-meta">Dorian Develops &middot; 19 Nov 2024 &middot; YouTube</div>
          <div class="video-duration">18:58</div>
          <p class="snippet">Don't miss out on Smartproxy's powerful tools for web scraping. Use my links to access: - Residential proxies free trial: ...</p>
        </div>
      </a>
      <a class="video" href="https://www.youtube.com/watch?v=41Um8a40XrA">
        <div class="thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="video-title">Mastering Web Scraping Techniques for REAL Data Extraction</div>
          <div class="video-meta">Thomas Janssen &middot; 24 Oct 2024 &middot; YouTube</div>
          <div class="video-duration">36:07</div>
          <p class="snippet">Mastering Web Scraping is essential for those who want to scrape data from the internet. Real estate data, e-commerce and stock prices are ...</p>
        </div>
      </a>
      <a class="video" href="https://www.youtube.com/watch?v=5U4OVXDw1Zo">
        <div class="thumb">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div class="video-title">Scrape Any Website in 5 Minutes! Web Scraping Tutorial</div>
          <div class="video-meta">Kunal Kushwaha &middot; 11 Apr 2024 &middot; YouTube</div>
          <div class="video-duration">21:39</div>
          <p class="snippet">In this tutorial, I will demonstrate how to efficiently scrape any website in just 5 minutes, using the Bright Data Web Unlocker tool.</p>
        </div>
      </a>
    </section>
  </main>
  <footer class="foot">
    Generated from the SERPHouse Google Videos API &middot; 2026-08-03T06:52:55.000000Z
  </footer>
</body>
</html>
`;
export const googleVideosJsonResponse = jsonResponse as Record<string, unknown>;
export const googleVideosMarkdownResponse = "scraping guides - Google Search Skip to main content[Accessibility\nhelp](https://support.google.com/websearch/answer/181196?hl=en-IN)\n\n[AI\nMode](/search?q=scraping+guides&sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=50&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2nq-aQnTz_mBV-EZYISbLc-S3LQBbMYAGT8xXTqdTxRg035UMv2Z78Np7XNhc7R_0KCh9LxfjUSwmg3tpdaLWALYLOKC8nDa6s1oeAE2ylFMWVlqpsU8dQTtQ651_ea4k4NljM7kuJdz4-FE_KQ2pm_c0EVF5A&aep=1&ntc=1&cs=0&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ2J8OegQICRAD)\n\n[All](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&q=scraping+guides&source=lnms&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2nq-aQnTz_mBV-EZYISbLc-S3LQBbMYAGT8xXTqdTxRg035UMv2Z78Np7XNhc7R_0KCh9LxfjUSwmg3tpdaLWALYLOKC8nDa6s1oeAE2ylFMWVlqpsU8dQTtQ651_ea4k4NljM7kuJdz4-FE_KQ2pm_c0EVF5A&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ0pQJegQIChAB)\n\n[Images](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2nq-aQnTz_mBV-EZYISbLc-S3LQBbMYAGT8xXTqdTxRg035UMv2Z78Np7XNhc7R_0KCh9LxfjUSwmg3tpdaLWALYLOKC8nDa6s1oeAE2ylFMWVlqpsU8dQTtQ651_ea4k4NljM7kuJdz4-FE_KQ2pm_c0EVF5A&q=scraping+guides&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQtKgLegQICxAB)\n\nVideos\n\n[Shopping](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=28&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2nq-aQnTz_mBV-EZYISbLc-S3LQBbMYAGT8xXTqdTxRg035UMv2Z78Np7XNhc7R_0KCh9LxfjUSwmg3tpdaLWALYLOKC8nDa6s1oeAE2ylFMWVlqpsU8dQTtQ651_ea4k4NljM7kuJdz4-FE_KQ2pm_c0EVF5A&q=scraping+guides&ved=1t:220175&ictx=111)\n\n[News](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&q=scraping+guides&tbm=nws&source=lnms&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2nq-aQnTz_mBV-EZYISbLc-S3LQBbMYAGT8xXTqdTxRg035UMv2Z78Np7XNhc7R_0KCh9LxfjUSwmg3tpdaLWALYLOKC8nDa6s1oeAE2ylFMWVlqpsU8dQTtQ651_ea4k4NljM7kuJdz4-FE_KQ2pm_c0EVF5A&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ0pQJegQIDxAB)\n\n[Forums](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=18&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832VstEKsVDqPorK0Gahnm2nq-aQnTz_mBV-EZYISbLc-S3LQBbMYAGT8xXTqdTxRg035UMv2Z78Np7XNhc7R_0KCh9LxfjUSwmg3tpdaLWALYLOKC8nDa6s1oeAE2ylFMWVlqpsU8dQTtQ651_ea4k4NljM7kuJdz4-FE_KQ2pm_c0EVF5A&q=scraping+guides&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQs6gLegQIDhAB)\n\nMore\n\n# Search Results\n\n[### Learn Web Scraping with Python: A Beginner's Guide www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=b8q98xvyIqg)www.youtube.com › watch\n\n1:13:01\n\nAre you curious about web **scraping** and how to extract data from websites? In this beginner-friendly tutorial,\nCodecademy community member ...\n\nYouTube · Codecademy · 20 Dec 2024\n\n10 key moments10 key moments in this video\n\n[### Ultimate Guide To Web Scraping - Node.js &amp; Python ... www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=XMu46BRPLqA)www.youtube.com › watch\n\n50:13\n\nIn this **guide** you will learn all about web **scraping**. We will go through some slides and then **scrape** a\nwebsite using Node.js and the ...\n\nYouTube · Traversy Media · 13 Aug 2024\n\n12 key moments12 key moments in this video\n\n[### Learn Web Scraping in 5 Minutes (NO PRIOR KNOWLEDGE) www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=hHQlcnubuFI)www.youtube.com › watch\n\n4:53\n\n... **scraping** web **scraping** tutorial python web **scraping** web **scraping** python programming beautifulsoup\nbeautifulsoup4 #programming #coding #\n\nYouTube · CodeHead · 5 Mar 2026\n\n[### Web Scraping 101: How To Scrape 99% of Sites www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=WYp0dmZOHXM)www.youtube.com › watch\n\n18:58\n\nDon't miss out on Smartproxy's powerful tools for web **scraping**. Use my links to access: - Residential proxies free\ntrial: ...\n\nYouTube · Dorian Develops · 19 Nov 2024\n\n[### Web Scraping with JavaScript: Complete Guide 2026 daily.dev › posts ›\nweb-scraping-with-javascript-comple...](https://daily.dev/posts/web-scraping-with-javascript-complete-guide-2026-3ev7u1lzh)daily.dev\n› posts › web-scraping-with-javascript-comple...\n\n[9:01](https://daily.dev/posts/web-scraping-with-javascript-complete-guide-2026-3ev7u1lzh)A beginner-friendly **guide**\nto building a JavaScript web **scraper** using Node.js, Axios, and Cheerio. Covers fetching static HTML, ...\n\ndaily.dev · Oxylabs · 20 Apr 2026\n\n[### Mastering Web Scraping Techniques for REAL Data Extraction www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=41Um8a40XrA)www.youtube.com › watch\n\n36:07\n\nMastering Web **Scraping** is essential for those who want to **scrape** data from the internet. Real estate data,\ne-commerce and stock prices are ...\n\nYouTube · Thomas Janssen · 24 Oct 2024\n\n10 key moments10 key moments in this video\n\n[### Scrape Any Website in 5 Minutes! Web Scraping Tutorial www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=5U4OVXDw1Zo)www.youtube.com › watch\n\n21:39\n\nIn this tutorial, I will demonstrate how to efficiently **scrape** any website in just 5 minutes, using the Bright Data\nWeb Unlocker tool.\n\nYouTube · Kunal Kushwaha · 11 Apr 2024\n\n6 key moments6 key moments in this video\n\n[### Scraping Data from a Real Website | Web Scraping in Python www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=8dTpNajxaH0)www.youtube.com › watch\n\n25:23\n\nComments · Find and Find_All | Web **Scraping** in Python · Web **Scraping** 101: How To **Scrape** 99% of Sites ·\nPython for Neuroscience #1: Why Python and ...\n\nYouTube · Alex The Analyst · 11 Jul 2023\n\n[### Ultimate Web Scraping tutorial www.youtube.com › watch](https://www.youtube.com/watch?v=1227R6KY8Ts)www.youtube.com\n› watch\n\n41:31\n\nCheckout DataImpulse: https://dataimpulse.com/?utm_source=Youtube&amp;utm_medium=Video&amp;utm_campaign=CodeWithHarry In\nthis video, ...\n\nYouTube · CodeWithHarry · 8 Nov 2024\n\n9 key moments9 key moments in this video\n\n[### Beginners Guide To Web Scraping with Python - All You Need ... www.youtube.com ›\nwatch](https://www.youtube.com/watch?v=QhD015WUMxE)www.youtube.com › watch\n\n7:36\n\nThe web is full of data. Lots and lots of data. Data prime for **scraping**. But manually going to a website and copying\nand pasting the data ...\n\nYouTube · Tinkernut · 27 Nov 2021\n\n6 key moments6 key moments in this video\n\nPeople also search for\n\n[scraping\n**video**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=Scraping+video&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAgcEAE)\n\n[**web** scraping\n**videos**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=Web+scraping+videos&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAgdEAE)\n\n[**how to use scrape\ndo**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=How+to+use+scrape+do&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAgfEAE)\n\n[**how to do**\nscraping](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=How+to+do+scraping&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAghEAE)\n\n[**how to use data\nscraper**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=How+to+use+data+scraper&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAgiEAE)\n\n[**deepseek\nscraper**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=DeepSeek+scraper&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAggEAE)\n\n[**web** scraping\n**freecodecamp**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=Web+scraping+freecodecamp&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAgbEAE)\n\n[**how to use easy\nscraper**](/search?sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&q=How+to+use+Easy+Scraper&sa=X&ved=2ahUKEwiAgPPj74OWAxXdhP0HHZg6NjkQ1QJ6BAgeEAE)\n\n# Page Navigation\n\n[--- More\nresults](/search?q=scraping+guides&sca_esv=e9a52b70d8558faf&hl=en&gl=IN&udm=7&ei=wDpwaoCgIt2J9u8PmPXYyQM&start=10&sa=N)---\n\nTry again\n\n# Footer links\n\nGoogle apps\n";
