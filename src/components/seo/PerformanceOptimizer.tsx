import { Suspense } from 'react';

// Global gtag declaration for analytics
declare global {
  function gtag(...args: any[]): void;
}

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  preloadImages?: string[];
  preloadFonts?: string[];
  prefetchUrls?: string[];
}

export function PerformanceOptimizer({ 
  children, 
  preloadImages = [], 
  preloadFonts = [], 
  prefetchUrls = [] 
}: PerformanceOptimizerProps) {
  return (
    <>
      {/* Preload critical images */}
      {preloadImages.map((src, index) => (
        <link
          key={`preload-image-${index}`}
          rel="preload"
          as="image"
          href={src}
          fetchPriority="high"
        />
      ))}

      {/* Preload critical fonts */}
      {preloadFonts.map((href, index) => (
        <link
          key={`preload-font-${index}`}
          rel="preload"
          as="font"
          type="font/woff2"
          href={href}
          crossOrigin="anonymous"
        />
      ))}

      {/* Prefetch important pages */}
      {prefetchUrls.map((href, index) => (
        <link
          key={`prefetch-${index}`}
          rel="prefetch"
          href={href}
        />
      ))}

      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Preconnect to critical external origins */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {children}
    </>
  );
}

// Component for loading critical CSS inline
export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical CSS for above-the-fold content */
          .critical-hero {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .critical-text {
            color: white;
            font-family: system-ui, -apple-system, sans-serif;
            text-align: center;
          }
          
          .critical-loading {
            width: 40px;
            height: 40px;
            border: 3px solid #333;
            border-top: 3px solid #dc2626;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Prevent layout shifts */
          .card-skeleton {
            aspect-ratio: 2/3;
            background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `,
      }}
    />
  );
}

// Component for lazy loading images with intersection observer
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  priority = false 
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{
        contentVisibility: priority ? 'visible' : 'auto',
      }}
    />
  );
}

// Utility hook for measuring Core Web Vitals
export function useCoreWebVitals() {
  if (typeof window !== 'undefined') {
    // Only load web-vitals in production
    if (process.env.NODE_ENV === 'production') {
      import('web-vitals').then((webVitals) => {
        // Web Vitals v5 API
        if (webVitals.onCLS) {
          webVitals.onCLS((metric) => {
            console.log('CLS:', metric);
            // Send to analytics
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'CLS',
                value: Math.round(metric.value * 1000),
                non_interaction: true,
              });
            }
          });
        }
        
        if (webVitals.onINP) {
          webVitals.onINP((metric) => {
            console.log('INP:', metric);
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'INP',
                value: Math.round(metric.value),
                non_interaction: true,
              });
            }
          });
        }
        
        if (webVitals.onFCP) {
          webVitals.onFCP((metric) => {
            console.log('FCP:', metric);
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'FCP',
                value: Math.round(metric.value),
                non_interaction: true,
              });
            }
          });
        }
        
        if (webVitals.onLCP) {
          webVitals.onLCP((metric) => {
            console.log('LCP:', metric);
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'LCP',
                value: Math.round(metric.value),
                non_interaction: true,
              });
            }
          });
        }
        
        if (webVitals.onTTFB) {
          webVitals.onTTFB((metric) => {
            console.log('TTFB:', metric);
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'TTFB',
                value: Math.round(metric.value),
                non_interaction: true,
              });
            }
          });
        }
      }).catch((error) => {
        console.warn('Failed to load web-vitals:', error);
      });
    }
  }
}
