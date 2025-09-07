import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userPictures } from '@/lib/db/schema';
import { uploadToS3, downloadImageFromUrl } from '@/lib/aws';

// Save picture API route
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { imageUrl, prompt, size } = body;

    if (!imageUrl || !prompt || !size) {
      return NextResponse.json(
        { error: 'Image URL, prompt, and size are required' },
        { status: 400 }
      );
    }

    // Download the image from OpenAI URL
    const imageBuffer = await downloadImageFromUrl(imageUrl);
    
    // Generate unique key for S3
    const timestamp = Date.now();
    const key = `${userId}/${timestamp}-${prompt.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    // Upload to S3
    const uploadResult = await uploadToS3({
      buffer: imageBuffer,
      key,
      contentType: 'image/png'
    });

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: uploadResult.error },
        { status: 500 }
      );
    }

    // Save to database
    const [savedPicture] = await db.insert(userPictures).values({
      clerkUserId: userId,
      search: prompt,
      size: size,
      url: uploadResult.url!
    }).returning();

    return NextResponse.json({
      success: true,
      message: 'Picture saved successfully',
      picture: savedPicture
    });
  } 
  catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}