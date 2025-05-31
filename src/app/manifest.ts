import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StreamFlix',
    short_name: 'StreamFlix',
    description: 'Ultimate Movie Streaming App',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#111111',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48 64x64 96x96 128x128 256x256',
        type: 'image/x-icon',
      },
      {
        src: '/images/placeholder.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/placeholder.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
