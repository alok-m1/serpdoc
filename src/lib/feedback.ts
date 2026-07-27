export async function submitFeedback(feedback: {
  url: string;
  opinion: string;
  message: string;
}) {
  await fetch(
    `https://docs.google.com/forms/d/e/${process.env.GOOGLE_FORM_ID}/formResponse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        [`entry.${process.env.GOOGLE_FORM_ENTRY_URL}`]: feedback.url,
        [`entry.${process.env.GOOGLE_FORM_ENTRY_OPINION}`]: feedback.opinion,
        [`entry.${process.env.GOOGLE_FORM_ENTRY_MESSAGE}`]: feedback.message,
      }),
    },
  );
}
