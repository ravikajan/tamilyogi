import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TamilYogiVip',
    short_name: 'TamilYogiVip',
    description: 'Ultimate Movie Streaming App',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#111111',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
