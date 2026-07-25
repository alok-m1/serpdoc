import { getPageImageUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { appName } from '@/lib/shared';

export const revalidate = false;

function OgImage({ title, description }: { title: string; description?: string }) {
  return (
    <div style={container}>
      <div style={header}>
        <div style={logoRow}>
          <svg width="36" height="36" viewBox="0 0 108 104" fill="none">
            <ellipse cx="53.8631" cy="52.0965" rx="53.7187" ry="51.5418" fill="#8460E5" />
            <path d="M23.3592 35.5175L53.9653 18.2572L84.368 35.5175V48.5603L53.9653 31.0267L34.0632 42.5466L38.4995 45.241V56.9952L23.3592 48.5603V35.5175Z" fill="white" />
            <path d="M84.3674 68.6766L53.7612 85.9369L23.3585 68.6766L23.3585 55.6338L53.7612 73.1674L73.6634 61.6475L69.2271 58.9531L69.2271 47.1989L84.3674 55.6338L84.3674 68.6766Z" fill="white" />
            <path d="M44.6043 48.1942L54.1055 41.9985L63.2447 48.1942H44.6043Z" fill="white" />
            <path d="M46.2331 59.8055V49.8405H61.5707V59.8055H56.1867V53.9565H51.8433V59.8055H46.2331Z" fill="white" />
          </svg>
          <span style={logoText}>{appName}</span>
        </div>
        <div style={pill}>
          <span style={pillText}>DOCUMENTATION</span>
        </div>
      </div>
      <div style={body}>
        <div style={eyebrow}>SERP API</div>
        <div style={titleStyle}>{title}</div>
        {description && <div style={descStyle}>{description}</div>}
      </div>
      <div style={footer}>
        <div style={footerLeft}>
          <div style={accentLine} />
          <span style={domainText}>serphouse.com</span>
        </div>
        <div style={dotsRow}>
          <div style={{ ...dot, background: '#e0e0e0' }} />
          <div style={{ ...dot, background: '#888' }} />
          <div style={{ ...dot, background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </div>
  );
}

const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: '#000',
  fontFamily: 'Inter, sans-serif',
  position: 'relative',
  overflow: 'hidden',
  padding: '0 56px',
};

const header: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  paddingTop: '48px',
};

const logoRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const logoText: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 700,
  color: '#f0f0f0',
  letterSpacing: '-0.5px',
};

const pill: React.CSSProperties = {
  display: 'flex',
  padding: '8px 20px',
  borderRadius: '999px',
  background: 'rgba(59,130,246,0.1)',
  border: '1px solid rgba(59,130,246,0.25)',
};

const pillText: React.CSSProperties = {
  fontSize: '16px',
  color: '#60a5fa',
  fontWeight: 600,
  letterSpacing: '1px',
};

const body: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 1,
  padding: '0',
};

const eyebrow: React.CSSProperties = {
  fontSize: '28px',
  color: '#60a5fa',
  fontWeight: 500,
  marginBottom: '12px',
  letterSpacing: '2px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '72px',
  fontWeight: 800,
  color: '#ffffff',
  lineHeight: 1.15,
  letterSpacing: '-1.5px',
  maxWidth: '900px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const descStyle: React.CSSProperties = {
  fontSize: '32px',
  color: 'rgba(240,240,240,0.7)',
  fontWeight: 400,
  marginTop: '16px',
  lineHeight: 1.3,
  maxWidth: '800px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const footer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '40px',
};

const footerLeft: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const accentLine: React.CSSProperties = {
  width: '40px',
  height: '4px',
  borderRadius: '2px',
  background: '#eab308',
};

const domainText: React.CSSProperties = {
  fontSize: '18px',
  color: 'rgba(234,179,8,0.8)',
  fontWeight: 500,
};

const dotsRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const dot: React.CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
};

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  return new ImageResponse(
    <OgImage title={page.data.title} description={page.data.description} />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
