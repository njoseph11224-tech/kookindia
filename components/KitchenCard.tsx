'use client';

import React from 'react';
import Link from 'next/link';
import { Cook } from '@/lib/types';
import { Star, MapPin, Clock, ShieldCheck, ArrowRight, ChefHat } from 'lucide-react';

interface KitchenCardProps {
  cook: Cook;
}

export default function KitchenCard({ cook }: KitchenCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#EFECE6] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:border-[#E05326]/30 transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Cover / Kitchen Image Header */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <img
            src={cook.kitchen_image}
            alt={cook.kitchen_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/80 via-transparent to-transparent" />

          {/* FSSAI Verified Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FSSAI Verified</span>
          </div>

          {/* Prep Notice Pill */}
          <div className="absolute top-3 right-3 bg-[#1E1B18]/85 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{cook.lead_time_hours}h Prep Notice</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3 bg-white text-[#1E1B18] text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{cook.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({cook.review_count})</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Cook Avatar & Kitchen Title */}
          <div className="flex items-start gap-3 mb-3">
            <img
              src={cook.profile_image}
              alt={cook.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E05326] shadow-sm flex-shrink-0"
            />

            <div>
              <h3 className="text-lg font-bold text-[#1E1B18] font-heading leading-snug group-hover:text-[#E05326] transition-colors">
                {cook.kitchen_name}
              </h3>
              <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5 text-[#E05326]" />
                <span>By {cook.name}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{cook.locality}, {cook.city}</span>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium mb-4">
            {cook.bio}
          </p>

          {/* Cuisine Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {cook.cuisine_specialties.map(tag => (
              <span
                key={tag}
                className="bg-[#FAF7F2] text-[#1E1B18] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#EFECE6]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 pt-0">
        <Link
          href={`/kitchen/${cook.id}`}
          className="w-full bg-[#FAF7F2] hover:bg-[#E05326] hover:text-white text-[#1E1B18] text-xs font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
        >
          <span>View Kitchen & Menu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
