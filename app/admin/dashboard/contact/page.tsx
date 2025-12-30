'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';

interface ContactInfo {
  id: string;
  title: string;
  subtitle: string;
  address_line1: string;
  address_line2: string;
  phone: string;
  instagram_handle: string;
  instagram_url: string;
  map_embed_url: string;
}

export default function ContactDashboard() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editForm, setEditForm] = useState<Partial<ContactInfo>>({});

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setContact(data);
        setEditForm(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      if (contact) {
        const { error } = await supabase
          .from('contact_info')
          .update({
            title: editForm.title,
            subtitle: editForm.subtitle,
            address_line1: editForm.address_line1,
            address_line2: editForm.address_line2,
            phone: editForm.phone,
            instagram_handle: editForm.instagram_handle,
            instagram_url: editForm.instagram_url,
            map_embed_url: editForm.map_embed_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', contact.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert([{
            title: editForm.title,
            subtitle: editForm.subtitle,
            address_line1: editForm.address_line1,
            address_line2: editForm.address_line2,
            phone: editForm.phone,
            instagram_handle: editForm.instagram_handle,
            instagram_url: editForm.instagram_url,
            map_embed_url: editForm.map_embed_url,
          }]);

        if (error) throw error;
      }

      setMessage('Контактная информация сохранена!');
      fetchContact();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление контактами</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('сохранена') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-900 font-medium mb-2">Заголовок секции</label>
              <input
                type="text"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="Где мы находимся"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Подзаголовок</label>
              <input
                type="text"
                value={editForm.subtitle || ''}
                onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="В самом сердце исторического Гродно, на улице Советская"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Адрес (строка 1)</label>
              <input
                type="text"
                value={editForm.address_line1 || ''}
                onChange={(e) => setEditForm({...editForm, address_line1: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="г. Гродно, ул. Советская, 3"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Адрес (строка 2)</label>
              <input
                type="text"
                value={editForm.address_line2 || ''}
                onChange={(e) => setEditForm({...editForm, address_line2: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="Беларусь"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Телефон</label>
              <input
                type="text"
                value={editForm.phone || ''}
                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="+375 33 342-88-88"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Instagram (никнейм)</label>
              <input
                type="text"
                value={editForm.instagram_handle || ''}
                onChange={(e) => setEditForm({...editForm, instagram_handle: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="@kultura.cafe.grodno"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Instagram (URL)</label>
              <input
                type="text"
                value={editForm.instagram_url || ''}
                onChange={(e) => setEditForm({...editForm, instagram_url: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="https://www.instagram.com/boutique_hotel_kultura"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">URL встраивания карты</label>
              <textarea
                value={editForm.map_embed_url || ''}
                onChange={(e) => setEditForm({...editForm, map_embed_url: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 h-24"
                placeholder="https://yandex.ru/map-widget/v1/?text=..."
              />
              <p className="text-sm text-gray-500 mt-1">URL для встраивания карты (Google Maps, Yandex Maps, и т.д.)</p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
