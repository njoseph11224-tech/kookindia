'use client';

import React from 'react';
import { Dish } from '@/lib/types';
import { Clock, Plus, Users } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onAddToCart: (dish: Dish) => void;
}

export default function DishCard({ dish, onAddToCart }: DishCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 flex flex-col justify-between hover:border-[#E05326]/40 hover:shadow-lg transition-all">
      <div>
        {/* Dish Cover Image */}
        <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-3 bg-slate-100">
          <img src={dish.image_url} alt={dish.name} className="w-full h-full object-cover" />

          {/* Veg / Non-Veg Indicator */}
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md p-1 rounded-md shadow-sm">
            <div className={`w-4 h-4 rounded-sm border-2 ${dish.is_veg ? 'border-emerald-600' : 'border-rose-600'} flex items-center justify-center p-0.5`}>
              <div className={`w-2 h-2 rounded-full ${dish.is_veg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
            </div>
          </div>

          {/* Pre-order Notice Pill */}
          {dish.is_preorder_only && (
            <div className="absolute top-2.5 right-2.5 bg-[#1E1B18]/85 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Pre-order {dish.min_order_notice_hours}h</span>
            </div>
          )}

          {/* Stock remaining */}
          <div className="absolute bottom-2 left-2 bg-[#1E1B18]/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            {dish.stock_remaining} portions left
          </div>
        </div>

        {/* Dish Information */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-extrabold text-[#1E1B18] text-base font-heading leading-snug">
            {dish.name}
          </h4>
          <span className="text-base font-black text-[#1E1B18] font-mono flex-shrink-0">
            ₹{dish.price}
          </span>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium mb-3">
          {dish.description}
        </p>

        {/* Dietary Tags */}
        <div className="flex items-center gap-1.5 flex-wrap mb-4">
          <span className="bg-[#FAF7F2] text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#EFECE6]">
            {dish.cuisine}
          </span>
          {dish.is_jain && (
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md">
              Pure Jain
            </span>
          )}
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <Users className="w-3 h-3" /> Serves {dish.serves_people}
          </span>
        </div>
      </div>

      {/* Add To Basket Button */}
      <button
        onClick={() => onAddToCart(dish)}
        className="w-full bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-black py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#E05326]/20 active:scale-95"
      >
        <Plus className="w-4 h-4" />
        <span>Add to Basket</span>
      </button>
    </div>
  );
}
