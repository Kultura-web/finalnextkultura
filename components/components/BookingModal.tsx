'use client';

import React, { useState } from 'react';
import { X, Calendar, Users, CreditCard } from 'lucide-react';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roomType?: string;
  pricePerNight?: number;
  discountPercentage?: number;
  offerTitle?: string;
};

export default function BookingModal({
  isOpen,
  onClose,
  roomType = 'Стандарт',
  pricePerNight = 120,
  discountPercentage = 0,
  offerTitle
}: BookingModalProps) {
  const [step, setStep] = useState<'booking' | 'postbook'>('booking');

  // just to keep controlled inputs functional
  const [formData, setFormData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    guestsCount: 1,
    specialRequests: ''
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const updateForm = (patch: any) => setFormData((s) => ({ ...s, ...patch }));
  const updatePayment = (patch: any) => setPaymentData((s) => ({ ...s, ...patch }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-light text-gray-900">
            {step === 'booking' ? 'Бронирование номера' : 'Бронирование создано'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {step === 'booking' ? (
            <div className="space-y-6">
              {/* ROOM INFO */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{roomType}</h3>
                <p className="text-gray-600">{pricePerNight} BYN за ночь</p>
                {offerTitle && discountPercentage > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                      {offerTitle} – Скидка {discountPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Полное имя</label>
                  <input
                    value={formData.guestName}
                    onChange={(e) => updateForm({ guestName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    value={formData.guestEmail}
                    onChange={(e) => updateForm({ guestEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="example@mail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    value={formData.guestPhone}
                    onChange={(e) => updateForm({ guestPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="+375 29 123 45 67"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users size={16} className="inline mr-1" />
                    Количество гостей
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.guestsCount}
                    onChange={(e) => updateForm({ guestsCount: +e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-1" /> Заезд
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => updateForm({ checkIn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-1" /> Выезд
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => updateForm({ checkOut: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Особые пожелания</label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => updateForm({ specialRequests: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              {/* BUTTON (UI ONLY) */}
              <button
                type="button"
                onClick={() => setStep('postbook')}
                className="w-full py-3 bg-neutral-700 text-white hover:bg-neutral-600 transition-colors"
              >
                Продолжить
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* POSTBOOK MESSAGE */}
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Бронирование создано (UI режим)
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Это просто отображение интерфейса. Функциональность бронирования отключена.
                </div>
              </div>

              {/* DISABLED PAYMENT UI */}
              <div className="bg-white p-4 rounded border border-dashed border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CreditCard size={16} className="inline mr-1" />
                      Номер карты
                    </label>
                    <input
                      disabled
                      value={paymentData.cardNumber}
                      onChange={(e) => updatePayment({ cardNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Имя на карте</label>
                    <input
                      disabled
                      value={paymentData.cardName}
                      onChange={(e) => updatePayment({ cardName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Срок действия</label>
                    <input
                      disabled
                      value={paymentData.expiryDate}
                      onChange={(e) => updatePayment({ expiryDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      disabled
                      value={paymentData.cvv}
                      onChange={(e) => updatePayment({ cvv: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded"
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('booking')}
                    className="py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Назад
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2 px-4 bg-neutral-700 text-white rounded hover:bg-neutral-600"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
