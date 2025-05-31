// app/api/image-proxy/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const imageUrl = new URL(decodeURIComponent(url));
    if (!['http:', 'https:'].includes(imageUrl.protocol)) {
      return new Response(JSON.stringify({ error: 'Invalid protocol' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Optional: Block specific domains
    const blockedDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
    if (blockedDomains.some(domain => imageUrl.hostname.includes(domain))) {
      return new Response(JSON.stringify({ error: 'Domain not allowed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // HEAD request to check image
    const headResponse = await fetch(imageUrl.toString(), {
      method: 'HEAD',
      headers: { 'User-Agent': 'NextJS-Image-Proxy/1.0' }
    });
    // Some CDNs (like Unsplash) do not support HEAD requests, so fallback to GET if HEAD fails
    let finalHeadResponse = headResponse;
    if (!headResponse.ok && headResponse.status === 404) {
      // Try GET as fallback
      const getResponse = await fetch(imageUrl.toString(), {
        method: 'GET',
        headers: { 'User-Agent': 'NextJS-Image-Proxy/1.0' }
      });
      finalHeadResponse = getResponse;
    }
    if (!finalHeadResponse.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch image: ${finalHeadResponse.status}` }), {
        status: finalHeadResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const contentType = finalHeadResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Not an image' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const contentLength = finalHeadResponse.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'Image too large. Maximum size: 10MB' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch the actual image
    const imageResponse = await fetch(imageUrl.toString(), {
      headers: { 'User-Agent': 'NextJS-Image-Proxy/1.0' }
    });
    if (!imageResponse.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch image data: ${imageResponse.status}` }), {
        status: imageResponse.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const arrayBuffer = await imageResponse.arrayBuffer();
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'X-Image-Proxy': 'true',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'Request timeout' }), {
        status: 408,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
