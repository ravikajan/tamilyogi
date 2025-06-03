import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'TamilYogiVip';
    const subtitle = searchParams.get('subtitle') || 'Premium Entertainment Platform';
    const type = searchParams.get('type') || 'website';
    const rating = searchParams.get('rating') || '';
    const year = searchParams.get('year') || '';
    const genre = searchParams.get('genre') || '';

    // Define rich color schemes based on type
    const getTheme = (type: string) => {
      switch (type) {
        case 'movie':
          return { 
            bg: '#0A0A0A', 
            primary: '#FF2D2D', 
            secondary: '#FF6B6B',
            accent: '#FFD700',
            text: '#FFFFFF',
            subtext: '#E5E5E5',
            gradient: 'linear-gradient(135deg, #FF2D2D 0%, #FF6B6B 50%, #FFD700 100%)',
            icon: '🎬'
          };
        case 'series':
        case 'web-series':
          return { 
            bg: '#0D1117', 
            primary: '#7C3AED', 
            secondary: '#A855F7',
            accent: '#06D6A0',
            text: '#FFFFFF',
            subtext: '#C9D1D9',
            gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #06D6A0 100%)',
            icon: '📺'
          };
        case 'genre':
          return { 
            bg: '#1A1B23', 
            primary: '#F59E0B', 
            secondary: '#FBBF24',
            accent: '#EF4444',
            text: '#FFFFFF',
            subtext: '#D1D5DB',
            gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #EF4444 100%)',
            icon: '🎭'
          };
        case 'search':
          return { 
            bg: '#111827', 
            primary: '#10B981', 
            secondary: '#34D399',
            accent: '#06B6D4',
            text: '#FFFFFF',
            subtext: '#E5E7EB',
            gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #06B6D4 100%)',
            icon: '🔍'
          };
        default:
          return { 
            bg: '#000000', 
            primary: '#DC2626', 
            secondary: '#EF4444',
            accent: '#F59E0B',
            text: '#FFFFFF',
            subtext: '#F3F4F6',
            gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #F59E0B 100%)',
            icon: '🎪'
          };
      }
    };

    const theme = getTheme(type);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            backgroundColor: theme.bg,
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern Circles */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.primary}40 0%, transparent 70%)`,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.secondary}30 0%, transparent 70%)`,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '80%',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.accent}20 0%, transparent 70%)`,
              opacity: 0.5,
            }}
          />

          {/* Top Gradient Bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 8,
              background: theme.gradient,
            }}
          />

          {/* Main Content Container */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              position: 'relative',
            }}
          >
            {/* Logo/Brand Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 50,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '24px',
                  background: theme.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 24,
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: `0 20px 40px ${theme.primary}60`,
                }}
              >
                {theme.icon}
              </div>
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: theme.text,
                  textShadow: `0 4px 8px ${theme.primary}80`,
                  letterSpacing: '-1px',
                }}
              >
                StreamFlix
              </div>
            </div>

            {/* Main Title with Rich Styling */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                maxWidth: '90%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: title.length > 50 ? 42 : title.length > 30 ? 48 : 56,
                  fontWeight: 900,
                  color: theme.text,
                  lineHeight: 1.1,
                  marginBottom: 24,
                  textShadow: `0 4px 8px ${theme.bg}, 0 0 30px ${theme.primary}60`,
                  textAlign: 'center',
                  maxWidth: '100%',
                }}
              >
                {title}
              </div>

              {/* Metadata Row */}
              {(rating || year || genre) && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: 20,
                    flexWrap: 'wrap',
                  }}
                >
                  {rating && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: theme.accent,
                        color: theme.bg,
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      ⭐ {rating}
                    </div>
                  )}
                  {year && (
                    <div
                      style={{
                        backgroundColor: theme.primary,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {year}
                    </div>
                  )}
                  {genre && (
                    <div
                      style={{
                        backgroundColor: theme.secondary,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {genre}
                    </div>
                  )}
                </div>
              )}

              {/* Subtitle */}
              <div
                style={{
                  fontSize: 28,
                  color: theme.subtext,
                  textAlign: 'center',
                  marginBottom: 40,
                  fontWeight: 500,
                  opacity: 0.9,
                  lineHeight: 1.3,
                }}
              >
                {subtitle}
              </div>

              {/* Type Badge with Enhanced Design */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    background: theme.gradient,
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    fontSize: 20,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    boxShadow: `0 8px 25px ${theme.primary}50`,
                  }}
                >
                  {type === 'movie' ? '🎬 Movie' : 
                   type === 'series' || type === 'web-series' ? '📺 Series' :
                   type === 'genre' ? '🎭 Genre' : 
                   type === 'search' ? '🔍 Search Results' : 
                   '🎪 Streaming Platform'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 12,
              background: theme.gradient,
            }}
          />

          {/* Corner Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              width: 60,
              height: 60,
              borderLeft: `4px solid ${theme.primary}`,
              borderTop: `4px solid ${theme.primary}`,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 40,
              width: 60,
              height: 60,
              borderRight: `4px solid ${theme.secondary}`,
              borderTop: `4px solid ${theme.secondary}`,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 52,
              left: 40,
              width: 60,
              height: 60,
              borderLeft: `4px solid ${theme.accent}`,
              borderBottom: `4px solid ${theme.accent}`,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 52,
              right: 40,
              width: 60,
              height: 60,
              borderRight: `4px solid ${theme.primary}`,
              borderBottom: `4px solid ${theme.primary}`,
              opacity: 0.6,
            }}
          />

          {/* Floating Particles Effect */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '15%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: theme.accent,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '60%',
              right: '20%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: theme.secondary,
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '80%',
              left: '70%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: theme.primary,
              opacity: 0.7,
            }}
          />

          {/* Additional Decorative Grid Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, ${theme.primary}15 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, ${theme.secondary}10 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              opacity: 0.3,
            }}
          />

          {/* Subtle Overlay for Depth */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 30% 20%, ${theme.primary}08 0%, transparent 50%), 
                radial-gradient(circle at 70% 80%, ${theme.secondary}06 0%, transparent 50%), 
                radial-gradient(circle at 90% 30%, ${theme.accent}04 0%, transparent 50%)
              `,
              opacity: 0.8,
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
    console.log(`OG Image Error: ${e.message}`);
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}