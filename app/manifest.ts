import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ucikro',
    short_name: 'Ucikro',
    description: 'Lerne Kroatisch mit Ucikro',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f5f5f7',
    theme_color: '#1c6fcf',
    icons: [
      { src: '/flag.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/flag.svg', sizes: '192x192', type: 'image/svg+xml' },
      { src: '/flag.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  };
}
