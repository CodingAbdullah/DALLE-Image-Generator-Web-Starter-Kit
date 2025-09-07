import OpenAI from 'openai';
import { GenerateImageRequest } from '@/types/GenerateImageRequest';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate image function using OpenAI and DALL·E 3
export async function generateImage({ prompt, size, quality = 'standard', style = 'vivid' }: GenerateImageRequest) {
  try {
    // DALL·E 3 size options
    const imageSize = size === 'small' ? '1024x1024' : (size === 'medium' ? '1024x1792' : '1792x1024');
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: imageSize as '1024x1024' | '1024x1792' | '1792x1024',
      quality: quality,
      style: style,
    });

    if (!response.data?.[0]?.url) {
      throw new Error('No image URL returned from OpenAI');
    }

    return {
      success: true,
      imageUrl: response.data[0].url,
      revisedPrompt: response.data[0].revised_prompt
    };
  } 
  catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to generate image',
    };
  }
}