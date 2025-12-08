'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageUpload from '@/components/admin/ImageUpload';
import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';

interface OfferImage {
  id: string;
  image_path: string;
  display_order: number;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  display_order: number;
  offer_images?: OfferImage[];
}

export default function OffersDashboard() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Offer>>({});

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*, offer_images(*)')
        .order('display_order');

      if (error) throw error;
      setOffers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditOffer = (offer: Offer) => {
    setEditingOfferId(offer.id);
    setEditForm({...offer});
  };

  const handleSaveOffer = async () => {
    if (!editingOfferId || !editForm) return;

    try {
      const { error } = await supabase
        .from('offers')
        .update({
          title: editForm.title,
          description: editForm.description,
          discount: editForm.discount,
        })
        .eq('id', editingOfferId);

      if (error) throw error;
      setMessage('Предложение сохранено!');
      setEditingOfferId(null);
      fetchOffers();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    if (!confirm('Вы уверены?')) return;

    try {
      const { error } = await supabase.from('offers').delete().eq('id', offerId);
      if (error) throw error;
      fetchOffers();
      setMessage('Предложение удалено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleAddImage = async (offerId: string, imagePath: string) => {
    try {
      const maxOrder = Math.max(0, ...(offers.find(o => o.id === offerId)?.offer_images?.map(img => img.display_order) || [0]));
      const { error } = await supabase
        .from('offer_images')
        .insert([{
          offer_id: offerId,
          image_path: imagePath,
          display_order: maxOrder + 1,
        }]);

      if (error) throw error;
      fetchOffers();
      setMessage('Изображение добавлено!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(`Ошибка: ${err.message}`);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Удалить изображение?')) return;

    try {
      const { error } = await supabase.from('offer_images').delete().eq('id', imageId);
      if (error) throw error;
      fetchOffers();
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Управление предложениями</h1>

        {message && (
          <div className={`mb-6 p-4 rounded ${message.includes('успешно') || message.includes('добавлено') || message.includes('удалено') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="space-y-8">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow p-6">
              {editingOfferId === offer.id ? (
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
                    <label className="block text-gray-700 font-medium mb-2">Скидка (%)</label>
                    <input
                      type="number"
                      value={editForm.discount || 0}
                      onChange={(e) => setEditForm({...editForm, discount: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveOffer}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setEditingOfferId(null)}
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
                      <h2 className="text-2xl font-bold text-gray-900">{offer.title}</h2>
                      <p className="text-gray-600 mt-2">{offer.description}</p>
                      <p className="text-lg font-bold text-blue-600 mt-2">Скидка: {offer.discount}%</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditOffer(offer)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold text-gray-900 mb-4">Изображения</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {offer.offer_images?.map(img => (
                        <div key={img.id} className="relative group">
                          <img src={img.image_path} alt="Offer" className="w-full h-32 object-cover rounded" />
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
                      onImageUpload={(path) => handleAddImage(offer.id, path)}
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
