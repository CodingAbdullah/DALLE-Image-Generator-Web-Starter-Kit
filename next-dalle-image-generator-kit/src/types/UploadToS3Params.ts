// Upload images to AWS S3
export interface UploadToS3Params {
    buffer: Buffer;
    key: string;
    contentType: string;
  }
  