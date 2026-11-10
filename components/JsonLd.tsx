import { headers } from 'next/headers';

export default function JsonLd({ data }: { data: object }) {
  const nonce = headers().get('x-nonce') ?? undefined;
  return (
    <script
      nonce={nonce}
      suppressHydrationWarning
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
