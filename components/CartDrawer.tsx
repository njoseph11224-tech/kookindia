'use client';

import React from 'react';
import Link from 'next/link';
import { CartItem, Cook } from '@/lib/types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ChefHat, Truck, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
}: CartDrawerProps) {
  if (!isOpen) return null;

  // Group items by Kitchen/Cook
  const groupedByKitchen = cartItems.reduce((acc, item) => {
    const kitchenId = item.cook.id;
    if (!acc[kitchenId]) {
      acc[kitchenId] = {
        cook: item.cook,
        items: [],
      };
    }
    acc[kitchenId].items.push(item);
    return acc;
  }, {} as Record<string, { cook: Cook; items: CartItem[] }>);

  const kitchenCount = Object.keys(groupedByKitchen).length;

  const subtotal = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const deliveryFee = kitchenCount * 35; // ₹35 per kitchen dispatch
  const platformFee = subtotal > 0 ? 15 : 0;
  const grandTotal = subtotal + deliveryFee + platformFee;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex justify-end animate-fadeIn">
      <div
        className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EFECE6] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E05326]" />
            <h3 className="text-lg font-black text-[#1E1B18] font-heading">Your Food Basket</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Chef Info Pill */}
        {kitchenCount > 1 && (
          <div className="bg-[#E05326]/10 border-b border-[#E05326]/20 px-5 py-2.5 flex items-center justify-between text-xs font-bold text-[#E05326]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E05326]" />
              <span>Multi-Chef Order ({kitchenCount} Kitchens)</span>
            </div>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-[#E05326]/30">
              Parallel Prep & Delivery
            </span>
          </div>
        )}

        {/* Cart Item List Grouped By Kitchen */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-medium">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Your food basket is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Explore home kitchens & add items from multiple chefs into the same order!
              </p>
            </div>
          ) : (
            Object.values(groupedByKitchen).map(({ cook, items }) => (
              <div key={cook.id} className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EFECE6] space-y-3">
                {/* Kitchen Header */}
                <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={cook.profile_image}
                      alt={cook.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-[#E05326]"
                    />
                    <div>
                      <h4 className="text-xs font-extrabold text-[#1E1B18] font-heading leading-tight">
                        {cook.kitchen_name}
                      </h4>
                      <div className="text-[10px] text-slate-500 font-semibold">
                        By {cook.name} • {cook.locality}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    Prep: {cook.lead_time_hours}h notice
                  </span>
                </div>

                {/* Items under this kitchen */}
                <div className="space-y-2.5">
                  {items.map(item => (
                    <div
                      key={item.dish.id}
                      className="bg-white p-3 rounded-xl border border-[#EFECE6] flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.dish.image_url}
                          alt={item.dish.name}
                          className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1E1B18] truncate">
                            {item.dish.name}
                          </div>
                          <div className="text-xs font-black text-[#E05326] font-mono mt-0.5">
                            ₹{item.dish.price} × {item.quantity} = ₹{item.dish.price * item.quantity}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#FAF7F2] px-2 py-1 rounded-lg border border-[#EFECE6] flex-shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, -1)}
                          className="text-slate-600 hover:text-rose-600"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="text-xs font-black text-[#1E1B18] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.dish.id, 1)}
                          className="text-slate-600 hover:text-emerald-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Multi-Chef Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#EFECE6] bg-[#FAF7F2] space-y-3">
            <div className="space-y-1 text-xs text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Food Subtotal ({cartItems.length} items)</span>
                <span className="font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Delivery Dispatch ({kitchenCount} {kitchenCount === 1 ? 'Kitchen' : 'Kitchens'})
                </span>
                <span className="font-mono text-slate-900 font-bold">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform & Hygiene Fee</span>
                <span className="font-mono text-slate-900 font-bold">₹{platformFee}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EFECE6] text-sm font-black text-[#1E1B18]">
                <span>Grand Total</span>
                <span className="font-mono text-[#E05326] text-base">₹{grandTotal}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E05326]/20 text-decoration-none"
            >
              <span>Checkout Multi-Chef Order</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
