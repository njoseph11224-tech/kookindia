'use client';

import React from 'react';
import Link from 'next/link';
import { ChefHat, MapPin, ShoppingBag, Utensils, Calendar, UserPlus } from 'lucide-react';

interface NavbarProps {
  selectedCity?: string;
  onCityChange?: (city: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Navbar({
  selectedCity = 'Bangalore',
  onCityChange,
  cartCount = 0,
  onOpenCart,
}: NavbarProps) {
  const cities = ['All', 'Bangalore', 'Gurgaon', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi NCR'];

  return (
    <header className="bg-white border-b border-[#EFECE6] sticky top-0 z-50 py-3.5 px-4 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-2xl bg-[#E05326] flex items-center justify-center text-white shadow-md shadow-[#E05326]/20 group-hover:scale-105 transition-transform">
            <ChefHat className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl font-heading text-[#1E1B18] tracking-tight">
                Kook<span className="text-[#E05326]">India</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                FSSAI Verified
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              Authentic Homestyle Regional Food & Tiffins
            </span>
          </div>
        </Link>

        {/* City Location Selector */}
        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#EFECE6] px-3.5 py-2 rounded-2xl">
          <MapPin className="w-4 h-4 text-[#E05326] flex-shrink-0" />
          <select
            value={selectedCity}
            onChange={e => onCityChange && onCityChange(e.target.value)}
            className="bg-transparent text-xs font-black text-[#1E1B18] focus:outline-none cursor-pointer"
          >
            {cities.map(c => (
              <option key={c} value={c}>
                {c === 'All' ? '🇮🇳 All India' : `📍 ${c}`}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E1B18] hover:text-[#E05326] hover:bg-orange-50/50 transition-colors"
          >
            <Utensils className="w-4 h-4 text-[#E05326]" />
            <span>Kitchens</span>
          </Link>

          <Link
            href="/subscriptions"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#1E1B18] hover:text-[#E05326] hover:bg-orange-50/50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Tiffin Plans</span>
          </Link>

          <Link
            href="/cook/register"
            className="hidden lg:flex items-center gap-1.5 bg-[#1E1B18] hover:bg-[#2A2622] text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition-all shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Cook With Us</span>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative bg-[#E05326] hover:bg-[#c8441c] text-white p-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-md shadow-[#E05326]/20 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-black hidden sm:inline">Basket</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1E1B18] text-amber-300 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
