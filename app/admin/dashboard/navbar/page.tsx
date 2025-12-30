'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';

interface Navbar {
  id: string;
  hotel_name: string;
  hotel_phone: string;
  restaurant_phone: string;
  logo_url: string;
}

export default function NavbarDashboard() {
  const [navbar, setNavbar] = useState<Navbar | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editForm, setEditForm] = useState<Partial<Navbar>>({});

  useEffect(() => {
    fetchNavbar();
  }, []);

  const fetchNavbar = async () => {
    try {
      const { data, error } = await supabase
        .from('navbar')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setNavbar(data);
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
      if (navbar) {
        const { error } = await supabase
          .from('navbar')
          .update({
            hotel_name: editForm.hotel_name,
            hotel_phone: editForm.hotel_phone,
            restaurant_phone: editForm.restaurant_phone,
            logo_url: editForm.logo_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', navbar.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('navbar')
          .insert([{
            hotel_name: editForm.hotel_name,
            hotel_phone: editForm.hotel_phone,
            restaurant_phone: editForm.restaurant_phone,
            logo_url: editForm.logo_url,
          }]);

        if (error) throw error;
      }

      setMessage('Навигация сохранена!');
      fetchNavbar();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление навигацией</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('сохранена') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-900 font-medium mb-2">Название отеля</label>
              <input
                type="text"
                value={editForm.hotel_name || ''}
                onChange={(e) => setEditForm({...editForm, hotel_name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="ОТЕЛЬ КУЛЬТУРА"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Телефон отеля</label>
              <input
                type="text"
                value={editForm.hotel_phone || ''}
                onChange={(e) => setEditForm({...editForm, hotel_phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="+375 33 342-88-88"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Телефон ресторана</label>
              <input
                type="text"
                value={editForm.restaurant_phone || ''}
                onChange={(e) => setEditForm({...editForm, restaurant_phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="+375 33 388-54-54"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">URL логотипа</label>
              <input
                type="text"
                value={editForm.logo_url || ''}
                onChange={(e) => setEditForm({...editForm, logo_url: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="/logo-no-bg.png"
              />
              <p className="text-sm text-gray-500 mt-1">Путь к файлу логотипа в папке public</p>
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
