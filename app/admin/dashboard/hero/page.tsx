'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';

interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  background_image_path: string;
  button_text: string;
}

export default function HeroDashboard() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    button_text: '',
    background_image_path: '',
  });

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_section')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setHero(data);
        setFormData({
          title: data.title,
          subtitle: data.subtitle,
          button_text: data.button_text,
          background_image_path: data.background_image_path,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!hero) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('hero_section')
        .update(formData)
        .eq('id', hero.id);

      if (error) throw error;
      setMessage('Изменения сохранены успешно!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Редактирование героного раздела</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Подзаголовок</label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-20"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Текст кнопки</label>
            <input
              type="text"
              value={formData.button_text}
              onChange={(e) => setFormData({...formData, button_text: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Фоновое изображение</label>
            <ImageUpload
              preview={formData.background_image_path}
              onImageUpload={(path) => setFormData({...formData, background_image_path: path})}
            />
            {formData.background_image_path && (
              <p className="text-sm text-gray-600 mt-2">Путь: {formData.background_image_path}</p>
            )}
          </div>

          {message && (
            <div className={`p-4 rounded ${message.includes('успешно') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
