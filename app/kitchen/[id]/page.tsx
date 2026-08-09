'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DishCard from '@/components/DishCard';
import CartDrawer from '@/components/CartDrawer';
import { getCookById, getDishesByCookId } from '@/lib/db';
import { Dish, CartItem } from '@/lib/types';
import { Star, MapPin, Clock, ShieldCheck, ArrowLeft, ChefHat, Award, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function KitchenDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const cook = getCookById(id);
  const dishes = getDishesByCookId(id);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  if (!cook) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center flex-1">
          <ChefHat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900">Kitchen Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">The home cook kitchen you are looking for does not exist or has moved.</p>
          <Link href="/" className="bg-orange-600 text-white text-xs font-black py-2.5 px-5 rounded-xl">
            Return to Marketplace
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (dish: Dish) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item =>
          item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { dish, quantity: 1, cook }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-orange-600 mb-6 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Home Kitchens</span>
        </Link>

        {/* Kitchen Cover & Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden mb-8">
          <div className="relative h-48 md:h-64 w-full bg-slate-100">
            <img
              src={cook.kitchen_image}
              alt={cook.kitchen_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </div>

          <div className="p-6 md:p-8 relative">
            {/* Avatar Overlap */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              <div className="flex items-end gap-4">
                <img
                  src={cook.profile_image}
                  alt={cook.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-xl bg-white flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      FSSAI Verified: {cook.fssai_license}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight mt-1">
                    {cook.kitchen_name}
                  </h1>
                  <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mt-0.5">
                    <ChefHat className="w-4 h-4 text-orange-600" />
                    <span>Home Chef: {cook.name}</span>
                  </div>
                </div>
              </div>

              {/* Rating & Lead Time Stats */}
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-3 rounded-2xl border border-orange-200 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm font-black text-slate-900 font-heading">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{cook.rating}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">({cook.review_count} Reviews)</div>
                </div>

                <div className="bg-slate-900 text-white p-3 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-1 text-xs font-black text-amber-300">
                    <Clock className="w-4 h-4" />
                    <span>{cook.lead_time_hours} Hours</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">Prep Notice Needed</div>
                </div>
              </div>
            </div>

            {/* Cook Bio */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
              {cook.bio}
            </p>

            {/* Cuisine Specialties Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500">Cuisine Specialties:</span>
              {cook.cuisine_specialties.map(c => (
                <span
                  key={c}
                  className="bg-orange-100 text-orange-900 text-xs font-bold px-3 py-1 rounded-xl"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MENU DISHES GRID */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-slate-900 font-heading mb-6 flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-orange-600" />
            <span>Kitchen Menu & Pre-Order Specials</span>
          </h2>

          {dishes.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-slate-400 font-semibold">
              No active dishes listed for this kitchen currently.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map(dish => (
                <DishCard key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <Footer />
    </div>
  );
}
