import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userPictures } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// Fetch pictures API route
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all pictures for the user
    const pictures = await db.query.userPictures.findMany({
      where: eq(userPictures.clerkUserId, userId),
      orderBy: [desc(userPictures.createdAt)]
    });

    return NextResponse.json({
      success: true,
      pictures
    });
  } 
  catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}