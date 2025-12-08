'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus } from 'lucide-react';

interface GalleryImage {
  id: string;
  image_path: string;
  title: string;
  span_cols: number;
  span_rows: number;
  display_order: number;
}

export default function GalleryDashboard() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<GalleryImage>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    title: '',
    span_cols: 1,
    span_rows: 1,
  });

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
    if (!newImage.title) {
      setMessage('Пожалуйста, введите название');
      return;
    }

    try {
      const maxOrder = Math.max(0, ...images.map(img => img.display_order));
      const { error } = await supabase
        .from('gallery_images')
        .insert([{
          image_path: imagePath,
          title: newImage.title,
          span_cols: newImage.span_cols || 1,
          span_rows: newImage.span_rows || 1,
          display_order: maxOrder + 1,
        }]);

      if (error) throw error;
      setNewImage({ title: '', span_cols: 1, span_rows: 1 });
      setIsAddingNew(false);
      fetchGallery();
      setMessage('Изображение добавлено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImageId(image.id);
    setEditForm({...image});
  };

  const handleSaveEdit = async () => {
    if (!editingImageId || !editForm) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          title: editForm.title,
          span_cols: editForm.span_cols,
          span_rows: editForm.span_rows,
        })
        .eq('id', editingImageId);

      if (error) throw error;
      setEditingImageId(null);
      fetchGallery();
      setMessage('Изображение обновлено!');
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
            <div>
              <label className="block text-gray-900 font-medium mb-2">Название</label>
              <input
                type="text"
                value={newImage.title || ''}
                onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 font-medium mb-2">Ширина (cols)</label>
                <input
                  type="number"
                  min="1"
                  max="2"
                  value={newImage.span_cols || 1}
                  onChange={(e) => setNewImage({...newImage, span_cols: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-medium mb-2">Высота (rows)</label>
                <input
                  type="number"
                  min="1"
                  max="2"
                  value={newImage.span_rows || 1}
                  onChange={(e) => setNewImage({...newImage, span_rows: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
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
              {editingImageId === image.id ? (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Название</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-900 font-medium mb-2">Ширина</label>
                      <input
                        type="number"
                        min="1"
                        max="2"
                        value={editForm.span_cols || 1}
                        onChange={(e) => setEditForm({...editForm, span_cols: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-900 font-medium mb-2">Высота</label>
                      <input
                        type="number"
                        min="1"
                        max="2"
                        value={editForm.span_rows || 1}
                        onChange={(e) => setEditForm({...editForm, span_rows: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setEditingImageId(null)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img src={image.image_path} alt={image.title} className="w-full h-32 object-cover" />
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-gray-900">{image.title}</h3>
                    <p className="text-sm text-gray-600">
                      {image.span_cols}x{image.span_rows} сетка
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditImage(image)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm transition"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm transition"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
