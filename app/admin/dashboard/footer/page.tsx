'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

export default function FooterEditPage() {
  const [data, setData] = useState({
    id: '',
    copyright_text: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    facebook_url: '',
    instagram_url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      setIsLoading(true);
      const { data: footerData, error } = await supabase
        .from('footer')
        .select('*')
        .maybeSingle();

      if (error) throw error;

      if (footerData) {
        setData(footerData);
      }
    } catch (error) {
      console.error('Error fetching footer:', error);
      setMessage({ type: 'error', text: 'Ошибка загрузки данных' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      const { error } = await supabase
        .from('footer')
        .update({
          copyright_text: data.copyright_text,
          company_address: data.company_address,
          company_phone: data.company_phone,
          company_email: data.company_email,
          facebook_url: data.facebook_url,
          instagram_url: data.instagram_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Данные сохранены успешно' });
    } catch (error) {
      console.error('Error saving footer:', error);
      setMessage({ type: 'error', text: 'Ошибка сохранения данных' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <AdminLayout>Загрузка...</AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Редактировать футер</h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Текст авторского права
            </label>
            <textarea
              name="copyright_text"
              value={data.copyright_text}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Адрес компании
            </label>
            <input
              type="text"
              name="company_address"
              value={data.company_address}
              onChange={handleChange}
              className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Номер телефона
              </label>
              <input
                type="tel"
                name="company_phone"
                value={data.company_phone}
                onChange={handleChange}
                className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email компании
              </label>
              <input
                type="email"
                name="company_email"
                value={data.company_email}
                onChange={handleChange}
                className="w-full text-gray-900 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook_url"
                value={data.facebook_url}
                onChange={handleChange}
                className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                value={data.instagram_url}
                onChange={handleChange}
                className="w-full px-4 text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 text-gray-900 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
