// Custom interface for image generation request
export interface GenerateImageRequest {
    prompt: string;
    size: 'small' | 'medium' | 'large';
    quality?: 'standard' | 'hd';
    style?: 'vivid' | 'natural';
  }
  