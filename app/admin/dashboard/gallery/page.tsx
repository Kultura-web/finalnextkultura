'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_path: string;
  display_order: number;
}

export default function GalleryDashboard() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<GalleryImage>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
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

  const handleAddImage = async (imagePath: string) => {
    try {
      const maxOrder = Math.max(0, ...images.map(img => img.display_order));
      const { error } = await supabase
        .from('gallery_images')
        .insert([{
          image_path: imagePath,
          display_order: maxOrder + 1,
        }]);

      if (error) throw error;
      setIsAddingNew(false);
      fetchGallery();
      setMessage('Изображение добавлено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };


  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Удалить изображение из галереи?')) return;

    try {
      const { error } = await supabase.from('gallery_images').delete().eq('id', imageId);
      if (error) throw error;
      fetchGallery();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление галереей</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('добавлено') || message.includes('обновлено') ? 'bg-green-100 text-green-700' : message.includes('Пожалуйста') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {isAddingNew ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Добавить новое изображение</h2>
            <ImageUpload
              onImageUpload={(path) => handleAddImage(path)}
            />
            <button
              onClick={() => setIsAddingNew(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
            >
              Отмена
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="mb-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Добавить изображение
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(image => (
            <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={image.image_path} alt="Gallery" className="w-full h-32 object-cover" />
              <div className="p-4">
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm transition"
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
