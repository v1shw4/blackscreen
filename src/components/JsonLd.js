/**
 * JsonLd — injects a schema.org JSON-LD <script> tag server-side.
 * Usage: <JsonLd data={{ "@context": "https://schema.org", ... }} />
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
