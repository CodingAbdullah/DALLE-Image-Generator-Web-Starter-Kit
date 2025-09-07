import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '@/lib/openai';

// Generating images API route
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, size, quality = 'standard', style = 'vivid' } = body;

    if (!prompt || !size) {
      return NextResponse.json(
        { error: 'Prompt and size are required' },
        { status: 400 }
      );
    }

    if (!['small', 'medium', 'large'].includes(size)) {
      return NextResponse.json(
        { error: 'Invalid size. Must be small, medium, or large' },
        { status: 400 }
      );
    }

    if (!['standard', 'hd'].includes(quality)) {
      return NextResponse.json(
        { error: 'Invalid quality. Must be standard or hd' },
        { status: 400 }
      );
    }

    if (!['vivid', 'natural'].includes(style)) {
      return NextResponse.json(
        { error: 'Invalid style. Must be vivid or natural' },
        { status: 400 }
      );
    }

    const result = await generateImage({ prompt, size, quality, style });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl,
      prompt: prompt,
      size: size
    });
  } 
  catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}