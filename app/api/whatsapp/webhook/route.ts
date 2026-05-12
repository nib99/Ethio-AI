import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get('hub.mode');
  const token = req.nextUrl.searchParams.get('hub.verify_token');
  const challenge = req.nextUrl.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

// POST handler remains the same as before (with better error handling)
export async function POST(req: NextRequest) {
  // ... (same logic as previous version with try/catch)
  try {
    // existing POST logic
    return Response.json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return Response.json({ status: 'error' }, { status: 500 });
  }
}
