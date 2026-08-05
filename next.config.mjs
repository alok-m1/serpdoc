import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </about-the-serp-api>; rel="service-doc", </llms.txt>; rel="describedby"',
          },
        ],
      },
    ];
  },
};

export default withMDX(config);
