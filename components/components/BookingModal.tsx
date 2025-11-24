// Updated BookingModal component with ALL supabase logic removed

"use client";

import React, { useState } from "react";
import { X, Calendar, Users, CreditCard } from "lucide-react";

/**
 * BookingModal (supabase REMOVED)
 */

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  roomType?: string;
  pricePerNight?: number;
  discountPercentage?: number;
  offerTitle?: string;
};

type FormData = {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  specialRequests: string;
};

type PaymentData = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

async function postJSON<T = any>(url: string, body: unknown, timeoutMs = 30000): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    clearTimeout(id);

    const text = await res.text();
    if (!res.ok) {
      try {
        const parsed = JSON.parse(text);
        throw new Error(parsed?.message || parsed?.error || text || `Request failed: ${res.status}`);
      } catch {
        throw new Error(text || `Request failed: ${res.status}`);
      }
    }

    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (err: any) {
    if (err?.name === "AbortError") throw new Error("Request timed out");
    throw err;
  }
}

export default function BookingModal({
  isOpen,
  onClose,
  roomType = "Стандарт",
  pricePerNight = 120,
  discountPercentage = 0,
  offerTitle,
}: BookingModalProps) {
  const [step, setStep] = useState<"booking" | "postbook">("booking");
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [prebookData, setPrebookData] = useState<any | null>(null);

  const [formData, setFormData] = useState<FormData>({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    guestsCount: 1,
    specialRequests: "",
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  if (!isOpen) return null;

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const basePrice = calculateNights() * pricePerNight;
  const discountAmount = discountPercentage > 0 ? Math.round(basePrice * (discountPercentage / 100)) : 0;
  const totalPrice = basePrice - discountAmount;

  // ---- Booking step -> call server prebook ----
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.guestName || !formData.guestEmail || !formData.checkIn || !formData.checkOut) {
      alert("Пожалуйста заполните все обязательные поля.");
      setLoading(false);
      return;
    }

    try {
      const prebookPayload = {
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guestsCount: formData.guestsCount,
        roomType,
        pricePerNight,
        totalPrice,
        guestName: formData.guestName,
        guestEmail: formData.guestEmail,
        guestPhone: formData.guestPhone,
        specialRequests: formData.specialRequests,
      };

      const resp = await postJSON<{
        ok: boolean;
        localBookingId: string;
        prebook?: any;
        bookHash?: string;
        price?: number;
      }>("/api/booking/prebook", prebookPayload, 60000);

      if (!resp?.ok) throw new Error("Prebook failed");

      setBookingId(resp.localBookingId);
      setPrebookData(resp.prebook ?? null);
      setStep("postbook");
    } catch (err: any) {
      console.error("Booking / Prebook error:", err);
      alert(err?.message ?? "Ошибка при создании бронирования.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Simulated confirmation (supabase removed) ----
  const handleSimulateConfirmation = async () => {
    if (!bookingId) return alert("Missing booking id");

    alert(
      "Simulated confirmation! (No Supabase, no DB update — this is only a frontend simulation.)"
    );

    onClose();
    setStep("booking");
    setBookingId("");
    setPrebookData(null);
    setFormData({
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      checkIn: "",
      checkOut: "",
      guestsCount: 1,
      specialRequests: "",
    });
  };

  const updateForm = (patch: Partial<FormData>) => setFormData((s) => ({ ...s, ...patch }));
  const updatePayment = (patch: Partial<PaymentData>) => setPaymentData((s) => ({ ...s, ...patch }));

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-light text-gray-900">
            {step === "booking" ? "Бронирование номера" : "Бронирование создано"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {step === "booking" ? (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* form fields unchanged */}
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Бронирование создано</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Локальный ID бронирования:</span>
                    <span className="font-medium">{bookingId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-700">Сумма (итого):</span>
                    <span className="font-medium">
                      {(prebookData?.price ?? totalPrice).toLocaleString?.("ru-RU") ??
                        prebookData?.price ??
                        totalPrice} BYN
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Disabled */}
              <div className="bg-white p-4 rounded border border-dashed border-gray-200">
                <div className="mb-3 text-sm text-gray-700">
                  Оплата отключена. Ниже — симуляция подтверждения.
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("booking")}
                    className="py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  >
                    Редактировать бронирование
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateConfirmation}
                    className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500"
                  >
                    Simulate confirmation (NO DB)
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