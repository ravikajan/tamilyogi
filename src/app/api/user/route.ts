import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Mock external API call with user data
  const mockApiResponse = {
    user: session.user || null,
    additionalData: {
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: true
      },
      lastLogin: new Date().toISOString()
    }
  };
  return NextResponse.json(mockApiResponse);
}
