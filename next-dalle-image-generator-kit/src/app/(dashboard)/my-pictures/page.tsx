"use client";

import { useState, useEffect } from "react";
import { Loader, Download, Trash2, ImageIcon, Calendar, Palette } from "lucide-react";
import type { UserPicture } from "@/types/user-picture";

export default function MyPicturesPage() {
  // const { user } = useUser();
  const [pictures, setPictures] = useState<UserPicture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const response = await fetch('/api/pictures');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch pictures');
      }

      setPictures(data.pictures || []);
    } 
    catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (pictureId: string, pictureUrl: string) => {
    if (!confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      return;
    }

    setDeletingId(pictureId);
    setError(null);

    try {
      const response = await fetch('/api/pictures/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pictureId,
          pictureUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete picture');
      }

      // Remove the deleted picture from the state
      setPictures(pictures.filter(picture => picture.id !== pictureId));
    } 
    catch (err: any) {
      setError(err.message);
    } 
    finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get size label function
  const getSizeLabel = (size: string) => {
    switch (size) {
      case 'small': return '1024×1024 (Square)';
      case 'medium': return '1024×1792 (Portrait)';
      case 'large': return '1792×1024 (Landscape)';
      default: return size;
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <Loader className="animate-spin text-blue-600" size={48} />
          </div>
        </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <Palette className="mr-3 text-purple-600" />
              My Picture Gallery
            </h1>
            <p className="text-gray-600">
              Your collection of AI-generated masterpieces
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {pictures.length === 0 ? (
            <div className="bg-white rounded-lg shadow-xl p-12 text-center">
              <ImageIcon className="mx-auto text-gray-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Pictures Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't generated any pictures yet. Start creating some amazing AI art!
              </p>
              <a
                href="/generate"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                Generate Your First Image
              </a>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <p className="text-gray-600 text-center">
                  <span className="font-semibold text-blue-600">{pictures.length}</span> images in your gallery
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pictures.map((picture) => (
                  <div
                    key={picture.id}
                    className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition duration-200"
                  >
                    <div className="aspect-square relative">
                      <img
                        src={picture.url}
                        alt={picture.search}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        "{picture.search}"
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(picture.createdAt)}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <ImageIcon size={14} className="mr-1" />
                        {getSizeLabel(picture.size)}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDownload(picture.url, picture.search)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-md transition duration-200 flex items-center justify-center text-sm"
                        >
                          <Download size={16} className="mr-1" />
                          Download
                        </button>
                        
                        <button
                          onClick={() => handleDelete(picture.id, picture.url)}
                          disabled={deletingId === picture.id}
                          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-md transition duration-200 flex items-center justify-center"
                        >
                          {deletingId === picture.id ? (
                            <Loader className="animate-spin" size={16} />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
    </main>
  );
}