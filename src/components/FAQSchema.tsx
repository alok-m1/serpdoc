export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Renders schema.org FAQPage JSON-LD so Google can surface the Q&As
 * as rich results. Keep `answer` concise (a direct sentence or two);
 * it should match what is visible on the page.
 */
export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
