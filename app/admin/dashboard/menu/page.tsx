'use client';

import { useEffect, useState, useRef } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus } from 'lucide-react';
import { Upload } from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  file_path: string;
  menu_type: string;
  display_order: number;
}

export default function MenuDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', menu_type: 'main' });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !newItem.title) {
      setMessage('Пожалуйста, введите название');
      return;
    }

    try {
      setUploadLoading(true);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;

      const { data, error } = await supabase.storage
        .from('menu-files')
        .upload(fileName, file);

      if (error) throw error;

      const filePath = `/menu-files/${data.path}`;
      const maxOrder = Math.max(0, ...items.map(item => item.display_order));

      const { error: insertError } = await supabase
        .from('menu_items')
        .insert([{
          title: newItem.title,
          file_path: filePath,
          menu_type: newItem.menu_type,
          display_order: maxOrder + 1,
        }]);

      if (insertError) throw insertError;

      setNewItem({ title: '', menu_type: 'main' });
      setIsAdding(false);
      fetchMenuItems();
      setMessage('Меню добавлено успешно!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setUploadLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string, oldFilePath: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadLoading(true);
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;

      const { data, error } = await supabase.storage
        .from('menu-files')
        .upload(fileName, file);

      if (error) throw error;

      const oldFileName = oldFilePath.split('/').pop();
      if (oldFileName) {
        await supabase.storage
          .from('menu-files')
          .remove([oldFileName]);
      }

      const newFilePath = `/menu-files/${data.path}`;
      const { error: updateError } = await supabase
        .from('menu_items')
        .update({ file_path: newFilePath })
        .eq('id', itemId);

      if (updateError) throw updateError;

      setEditingId(null);
      fetchMenuItems();
      setMessage('Файл успешно заменен!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    } finally {
      setUploadLoading(false);
      if (editFileInputRef.current) editFileInputRef.current.value = '';
    }
  };

  const handleDeleteItem = async (itemId: string, filePath: string) => {
    if (!confirm('Удалить меню?')) return;

    try {
      const fileName = filePath.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('menu-files')
          .remove([fileName]);
      }

      const { error } = await supabase.from('menu_items').delete().eq('id', itemId);
      if (error) throw error;
      fetchMenuItems();
      setMessage('Меню удалено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const getMenuTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      main: 'Основное',
      children: 'Детское',
      drinks: 'Напитки',
    };
    return labels[type] || type;
  };

  if (isLoading) return <AdminLayout><div className="text-center py-8">Загрузка...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление меню</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('добавлено') ? 'bg-green-100 text-green-700' : message.includes('Пожалуйста') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {isAdding ? (
          <div className="bg-white rounded-lg shadow p-6 mb-8 space-y-4 max-w-md">
            <h2 className="text-xl font-bold text-gray-900">Добавить новое меню</h2>
            <div>
              <label className="block text-gray-900 font-medium mb-2">Название</label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                placeholder="Например: Основное меню"
              />
            </div>
            <div>
              <label className="block text-gray-900 font-medium mb-2">Тип меню</label>
              <select
                value={newItem.menu_type}
                onChange={(e) => setNewItem({...newItem, menu_type: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
              >
                <option value="main">Основное</option>
                <option value="children">Детское</option>
                <option value="drinks">Напитки</option>
              </select>
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-gray-600">
                {uploadLoading ? 'Загрузка...' : 'Нажмите для загрузки файла'}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploadLoading}
              />
            </div>
            <button
              onClick={() => setIsAdding(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
            >
              Отмена
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mb-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Добавить меню
          </button>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-gray-900 font-medium">Название</th>
                <th className="px-6 py-4 text-left text-gray-900 font-medium">Тип</th>
                <th className="px-6 py-4 text-left text-gray-900 font-medium">Файл</th>
                <th className="px-6 py-4 text-right text-gray-900 font-medium">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-gray-600">{getMenuTypeLabel(item.menu_type)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => editFileInputRef.current?.click()}
                          className="border border-dashed border-gray-300 rounded px-3 py-1 text-sm cursor-pointer hover:border-gray-400 transition"
                        >
                          <span className="text-gray-600">
                            {uploadLoading ? 'Загрузка...' : 'Выбрать файл'}
                          </span>
                          <input
                            ref={editFileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleReplaceFile(e, item.id, item.file_path)}
                            className="hidden"
                            disabled={uploadLoading}
                          />
                        </div>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm transition"
                        >
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <a
                        href={item.file_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Открыть
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    {editingId !== item.id && (
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition"
                      >
                        Заменить
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteItem(item.id, item.file_path)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
