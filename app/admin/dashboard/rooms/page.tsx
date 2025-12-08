'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';
import { Trash2, Plus } from 'lucide-react';

interface RoomImage {
  id: string;
  image_path: string;
  display_order: number;
}

interface Room {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  display_order: number;
  room_images?: RoomImage[];
}

export default function RoomsDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Room>>({});

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*, room_images(*)')
        .order('display_order');

      if (error) throw error;
      setRooms(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setEditForm({...room});
  };

  const handleSaveRoom = async () => {
    if (!editingRoomId || !editForm) return;

    try {
      const { error } = await supabase
        .from('rooms')
        .update({
          title: editForm.title,
          description: editForm.description,
          price: editForm.price,
          features: editForm.features,
        })
        .eq('id', editingRoomId);

      if (error) throw error;
      setMessage('Номер сохранен успешно!');
      setEditingRoomId(null);
      fetchRooms();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Вы уверены?')) return;

    try {
      const { error } = await supabase.from('rooms').delete().eq('id', roomId);
      if (error) throw error;
      fetchRooms();
      setMessage('Номер удален!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleAddImage = async (roomId: string, imagePath: string) => {
    try {
      const maxOrder = Math.max(0, ...(rooms.find(r => r.id === roomId)?.room_images?.map(img => img.display_order) || [0]));
      const { error } = await supabase
        .from('room_images')
        .insert([{
          room_id: roomId,
          image_path: imagePath,
          display_order: maxOrder + 1,
        }]);

      if (error) throw error;
      fetchRooms();
      setMessage('Изображение добавлено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Удалить изображение?')) return;

    try {
      const { error } = await supabase.from('room_images').delete().eq('id', imageId);
      if (error) throw error;
      fetchRooms();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление номерами</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('добавлено') || message.includes('удален') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="space-y-8">
          {rooms.map(room => (
            <div key={room.id} className="bg-white rounded-lg shadow p-6">
              {editingRoomId === room.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Название</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Описание</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Цена</label>
                    <input
                      type="text"
                      value={editForm.price || ''}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveRoom}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setEditingRoomId(null)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{room.title}</h2>
                      <p className="text-gray-600 mt-2">{room.description}</p>
                      <p className="text-xl font-bold text-gray-900 mt-2">{room.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Изображения</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {room.room_images?.map(img => (
                        <div key={img.id} className="relative group">
                          <img src={img.image_path} alt="Room" className="w-full h-32 object-cover rounded" />
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <ImageUpload
                      onImageUpload={(path) => handleAddImage(room.id, path)}
                    />
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
