'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_path: string;
  alt_text: string;
  display_order: number;
}

export default function RestaurantGalleryDashboard() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newImage, setNewImage] = useState({ image_path: '', alt_text: '' });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurant_gallery_images')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImage.image_path || !newImage.alt_text) {
      setMessage('Загрузите изображение и добавьте описание');
      return;
    }

    try {
      const maxOrder = Math.max(0, ...images.map(img => img.display_order));
      const { error } = await supabase
        .from('restaurant_gallery_images')
        .insert([{
          ...newImage,
          display_order: maxOrder + 1
        }]);

      if (error) throw error;
      setNewImage({ image_path: '', alt_text: '' });
      setIsAdding(false);
      fetchImages();
      setMessage('Изображение добавлено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Удалить изображение?')) return;

    try {
      const { error } = await supabase
        .from('restaurant_gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchImages();
      setMessage('Изображение удалено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ресторан: Галерея</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('добавлено') || message.includes('удалено') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {isAdding ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Добавить изображение</h2>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Изображение</label>
              <ImageUpload
                onImageUpload={(path) => setNewImage({...newImage, image_path: path})}
                preview={newImage.image_path}
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Описание (Alt текст)</label>
              <input
                type="text"
                value={newImage.alt_text}
                onChange={(e) => setNewImage({...newImage, alt_text: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="Например: Английский завтрак с глазуньей"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddImage}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
              >
                Добавить
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mb-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Добавить изображение
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video bg-gray-100">
                <img
                  src={image.image_path}
                  alt={image.alt_text}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-4">{image.alt_text}</p>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
