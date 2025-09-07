import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userPictures } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { deleteFromS3 } from '@/lib/aws';

// Deleting picture API route
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { pictureId, pictureUrl } = body;

    if (!pictureId || !pictureUrl) {
      return NextResponse.json(
        { error: 'Picture ID and URL are required' },
        { status: 400 }
      );
    }

    // Get the picture to verify ownership
    const picture = await db.query.userPictures.findFirst({
      where: and(
        eq(userPictures.id, pictureId),
        eq(userPictures.clerkUserId, userId)
      )
    });

    if (!picture) {
      return NextResponse.json(
        { error: 'Picture not found or unauthorized' },
        { status: 404 }
      );
    }

    // Extract S3 key from URL
    const urlParts = pictureUrl.split('/');
    const key = urlParts.slice(-2).join('/'); // Get userId/filename part

    // Delete from S3
    const deleteResult = await deleteFromS3(key);
    
    if (!deleteResult.success) {
      console.error('Failed to delete from S3:', deleteResult.error);
      // Continue with database deletion even if S3 deletion fails
    }

    // Delete from database
    await db.delete(userPictures)
      .where(and(
        eq(userPictures.id, pictureId),
        eq(userPictures.clerkUserId, userId)
      ));

    return NextResponse.json({
      success: true,
      message: 'Picture deleted successfully'
    });
  } 
  catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}