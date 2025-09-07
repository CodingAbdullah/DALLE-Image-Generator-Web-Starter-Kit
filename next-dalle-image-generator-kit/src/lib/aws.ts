import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { UploadToS3Params } from '@/types/UploadToS3Params';

// Validate AWS configuration
if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error('AWS_ACCESS_KEY_ID environment variable is not set');
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_SECRET_ACCESS_KEY environment variable is not set');
}
if (!process.env.AWS_S3_REGION) {
  throw new Error('AWS_S3_REGION environment variable is not set');
}
if (!process.env.AWS_S3_BUCKET_NAME) {
  throw new Error('AWS_S3_BUCKET_NAME environment variable is not set');
}

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Upload to AWS S3 function
export async function uploadToS3({ buffer, key, contentType }: UploadToS3Params) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await s3Client.send(command);
    
    const publicUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;
    
    return {
      success: true,
      url: publicUrl
    };
  } 
  catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to upload to S3'
    };
  }
}

// Delete objects from the AWS S3 bucket
export async function deleteFromS3(key: string) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
    
    return {
      success: true
    };
  } 
  catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete from S3'
    };
  }
}

// Download images from a given URL
export async function downloadImageFromUrl(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}