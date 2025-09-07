"use client";

import { useState } from "react";
import { Loader, Download, Save, Sparkles } from "lucide-react";

// Generate image page component
export default function GeneratePage() {
  // const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('small');
  const [quality, setQuality] = useState<'standard' | 'hd'>('standard');
  const [style, setStyle] = useState<'vivid' | 'natural'>('vivid');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your image");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, size, quality, style }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.imageUrl);
    } 
    catch (err: any) {
      setError(err.message);
    } 
    finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedImage) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/pictures/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: generatedImage,
          prompt,
          size,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save image');
      }

      alert('Image saved successfully!');
    } 
    catch (err: any) {
      setError(err.message);
    } 
    finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `dalle-generated-${Date.now()}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <Sparkles className="mr-3 text-yellow-500" />
              Generate AI Art
            </h1>
            <p className="text-gray-600">
              Describe your imagination and watch DALL·E bring it to life!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* Prompt Input */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your image
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A serene landscape with mountains and a lake at sunset..."
                  className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={4}
                  maxLength={1000}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {prompt.length}/1000 characters
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Size (DALL·E 3)
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'small', label: 'Square (1024×1024)', price: 'Standard' },
                    { value: 'medium', label: 'Portrait (1024×1792)', price: 'Tall format' },
                    { value: 'large', label: 'Landscape (1792×1024)', price: 'Wide format' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer transition ${
                        size === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={size === option.value}
                        onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large')}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.price}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Quality
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'standard', label: 'Standard', price: 'Faster generation' },
                    { value: 'hd', label: 'HD Quality', price: 'Higher detail' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer transition ${
                        quality === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={quality === option.value}
                        onChange={(e) => setQuality(e.target.value as 'standard' | 'hd')}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.price}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Style
                </label>
                <div className="flex space-x-4">
                  {[
                    { value: 'vivid', label: 'Vivid', price: 'Bold and dramatic' },
                    { value: 'natural', label: 'Natural', price: 'More realistic' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer transition ${
                        style === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={style === option.value}
                        onChange={(e) => setStyle(e.target.value as 'vivid' | 'natural')}
                        className="sr-only"
                      />
                      <div className="text-sm font-medium text-gray-900">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.price}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2" size={20} />
                    Generate Image
                  </>
                )}
              </button>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Image</h2>
              <div className="text-center">
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                />
                <div className="mt-6 space-y-4">
                  <p className="text-gray-600 italic">"{prompt}"</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
                    >
                      <Download className="mr-2" size={18} />
                      Download
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center"
                    >
                      {isSaving ? (
                        <>
                          <Loader className="animate-spin mr-2" size={18} />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2" size={18} />
                          Save to Gallery
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </main>
  );
}