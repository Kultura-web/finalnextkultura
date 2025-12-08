'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/supabase';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (path: string) => void;
  bucket?: string;
  preview?: string;
}

export default function ImageUpload({ onImageUpload, bucket = 'cms-images', preview }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError('');
      const path = await uploadImage(file, bucket);
      onImageUpload(path);
    } catch (err) {
      setError('Ошибка загрузки изображения');
      console.error(err);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {preview && (
        <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition"
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-600">
          {isLoading ? 'Загрузка...' : 'Нажмите для загрузки изображения'}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
