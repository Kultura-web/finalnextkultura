'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus } from 'lucide-react';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
}

export default function RestaurantAboutDashboard() {
  const [content, setContent] = useState({
    id: '',
    title: '',
    paragraph_1: '',
    paragraph_2: '',
    image_path: ''
  });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [newFeature, setNewFeature] = useState({ icon: 'ChefHat', title: '', description: '' });

  useEffect(() => {
    fetchContent();
    fetchFeatures();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurant_about')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      if (data) setContent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurant_about_features')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setFeatures(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('restaurant_about')
        .update(content)
        .eq('id', content.id);

      if (error) throw error;
      setMessage('Сохранено успешно!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddFeature = async () => {
    if (!newFeature.title || !newFeature.description) {
      setMessage('Заполните все поля');
      return;
    }

    try {
      const maxOrder = Math.max(0, ...features.map(f => f.display_order));
      const { error } = await supabase
        .from('restaurant_about_features')
        .insert([{
          ...newFeature,
          display_order: maxOrder + 1
        }]);

      if (error) throw error;
      setNewFeature({ icon: 'ChefHat', title: '', description: '' });
      setIsAddingFeature(false);
      fetchFeatures();
      setMessage('Особенность добавлена!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleDeleteFeature = async (id: string) => {
    if (!confirm('Удалить особенность?')) return;

    try {
      const { error } = await supabase
        .from('restaurant_about_features')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchFeatures();
      setMessage('Особенность удалена!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ресторан: О нас</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('добавлена') || message.includes('удалена') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900">Основная информация</h2>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Заголовок</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Первый абзац</label>
            <textarea
              rows={4}
              value={content.paragraph_1}
              onChange={(e) => setContent({ ...content, paragraph_1: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Второй абзац</label>
            <textarea
              rows={4}
              value={content.paragraph_2}
              onChange={(e) => setContent({ ...content, paragraph_2: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-gray-900 font-medium mb-2">Изображение</label>
            <ImageUpload
              onImageUpload={(path) => setContent({ ...content, image_path: path })}
              preview={content.image_path}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Особенности</h2>

          {isAddingFeature ? (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Добавить особенность</h3>

              <div>
                <label className="block text-gray-900 font-medium mb-2">Иконка</label>
                <select
                  value={newFeature.icon}
                  onChange={(e) => setNewFeature({...newFeature, icon: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                >
                  <option value="ChefHat">Шапка повара</option>
                  <option value="Wine">Вино</option>
                  <option value="UtensilsCrossed">Приборы</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2">Заголовок</label>
                <input
                  type="text"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2">Описание</label>
                <textarea
                  rows={3}
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddFeature}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
                >
                  Добавить
                </button>
                <button
                  onClick={() => setIsAddingFeature(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingFeature(true)}
              className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Добавить особенность
            </button>
          )}

          <div className="space-y-4">
            {features.map(feature => (
              <div key={feature.id} className="flex items-start justify-between border border-gray-200 rounded-lg p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded">{feature.icon}</span>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteFeature(feature.id)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
