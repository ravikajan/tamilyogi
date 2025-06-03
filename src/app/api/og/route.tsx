import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'TamilYogiVip';
    const subtitle = searchParams.get('subtitle') || 'Watch Movies & Web Series Online';
    const type = searchParams.get('type') || 'website';

    // Define colors based on type
    const getColors = (type: string) => {
      switch (type) {
        case 'movie':
          return { bg: '#0F172A', primary: '#DC2626', secondary: '#991B1B' };
        case 'genre':
          return { bg: '#111827', primary: '#7C3AED', secondary: '#5B21B6' };
        case 'search':
          return { bg: '#1F2937', primary: '#059669', secondary: '#047857' };
        default:
          return { bg: '#000000', primary: '#DC2626', secondary: '#991B1B' };
      }
    };

    const colors = getColors(type);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.bg,
            backgroundImage: `linear-gradient(45deg, ${colors.bg} 0%, ${colors.secondary} 100%)`,
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          {/* Logo/Brand Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                fontSize: 40,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              TY
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              TamilYogiVip
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '80%',
            }}
          >
            <div
              style={{
                fontSize: title.length > 50 ? 36 : 48,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 20,
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: title.length > 100 ? 'nowrap' : 'normal',
              }}
            >
              {title}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: 24,
                color: '#D1D5DB',
                textAlign: 'center',
                marginBottom: 30,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </div>

            {/* Type Badge */}
            <div
              style={{
                backgroundColor: colors.primary,
                color: 'white',
                padding: '8px 24px',
                borderRadius: '25px',
                fontSize: 18,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {type === 'movie' ? 'Movie' : 
               type === 'genre' ? 'Genre' : 
               type === 'search' ? 'Search' : 
               'Streaming'}
            </div>
          </div>

          {/* Bottom decorative elements */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primary} 100%)`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
