import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  // Mock external API responses
  const mockExternalData = {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    ],
    products: [
      { id: 1, name: 'Product A', price: 29.99, category: 'electronics' },
      { id: 2, name: 'Product B', price: 49.99, category: 'clothing' },
    ],
    analytics: {
      totalUsers: 1250,
      activeUsers: 980,
      revenue: 15640.50,
      conversionRate: 3.2
    }
  };
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const data = mockExternalData[endpoint as keyof typeof mockExternalData] || { message: 'Endpoint not found' };
  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
    user: session.user?.email || null
  });
}
