'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KitchenCard from '@/components/KitchenCard';
import DishCard from '@/components/DishCard';
import CartDrawer from '@/components/CartDrawer';
import { getCooks, getAllDishes, getCookById, INITIAL_COOKS } from '@/lib/db';
import { Dish, CartItem } from '@/lib/types';
import { ChefHat, Search, ShieldCheck, Heart, ArrowRight, Utensils, Star, Quote, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<string>('Bangalore');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [isVegOnly, setIsVegOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const cuisines = [
    'All',
    'North Indian',
    'South Indian',
    'Bengali',
    'Gujarati',
    'Pure Veg / Jain',
    'Healthy & Diet',
  ];

  const filteredCooks = getCooks(selectedCity, selectedCuisine).filter(cook =>
    cook.kitchen_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cook.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDishes = getAllDishes(selectedCuisine, isVegOnly).filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (dish: Dish) => {
    const cook = getCookById(dish.cook_id) || INITIAL_COOKS[0];
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18]">
      <Navbar
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* HERO SECTION - Warm Human Craft Aesthetic */}
        <section className="relative bg-[#1E1B18] text-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#E05326]/20 border border-[#E05326]/40 px-3.5 py-1.5 rounded-full text-[#F59E0B] text-xs font-bold uppercase tracking-wider">
                <ChefHat className="w-4 h-4 text-[#E05326]" />
                <span>Real Home Kitchens • No Restaurants</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black font-heading leading-[1.1] tracking-tight">
                Authentic Regional Food,<br />
                <span className="text-[#E05326]">Cooked by Real Homemakers.</span>
              </h1>

              <p className="text-sm md:text-base text-slate-300 max-w-xl font-medium leading-relaxed">
                Craving genuine North Indian Rajma Chawal, Chettinad Chicken, or Gujarati Undhiyu in {selectedCity === 'All' ? 'your city' : selectedCity}? Discover local home kitchens preparing fresh, small-batch meals with hand-ground spices.
              </p>

              {/* Natural Search Bar */}
              <div className="bg-white p-2 rounded-2xl shadow-xl flex items-center gap-2 text-slate-900 border border-[#EFECE6]">
                <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search dishes (e.g. Rajma Chawal, Shorshe Ilish, Dhokla, Biryani)..."
                  className="w-full text-xs md:text-sm font-semibold focus:outline-none bg-transparent placeholder:text-slate-400"
                />
                <button className="bg-[#E05326] hover:bg-[#c8441c] text-white px-6 py-3 rounded-xl text-xs font-bold transition-colors flex-shrink-0 shadow-md">
                  Find Food
                </button>
              </div>

              {/* Trust Callouts */}
              <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-slate-300 flex-wrap">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FSSAI Certified Home Kitchens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E05326] fill-[#E05326]" />
                  <span>Pure Desi Ghee & Fresh Spices</span>
                </div>
              </div>
            </div>

            {/* Right Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#2A2622] border border-white/10 rounded-3xl p-5 shadow-2xl relative">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                    alt="Punjabi Homestyle Thali"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#E05326] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                    Cooked Fresh To Order
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">Punjabi Homestyle Thali</h3>
                    <p className="text-xs text-slate-400 font-medium">By Sunita Sharma in Indiranagar</p>
                  </div>
                  <div className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CUISINE SELECTOR & MARKETPLACE */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          
          {/* Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E05326]">Explore Kitchens</span>
              <h2 className="text-3xl font-black font-heading text-[#1E1B18] mt-1">
                Home Kitchens in {selectedCity}
              </h2>
            </div>

            {/* Veg Only Toggle */}
            <button
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 border transition-all ${
                isVegOnly
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                  : 'bg-white text-slate-700 border-[#EFECE6] hover:border-slate-300'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-sm border-2 ${isVegOnly ? 'border-white' : 'border-emerald-600'} flex items-center justify-center`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isVegOnly ? 'bg-white' : 'bg-emerald-600'}`} />
              </div>
              <span>Pure Veg Only</span>
            </button>
          </div>

          {/* Cuisine Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
            {cuisines.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedCuisine === c
                    ? 'bg-[#1E1B18] text-white border-[#1E1B18] shadow-md'
                    : 'bg-white text-slate-700 border-[#EFECE6] hover:bg-orange-50/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* KITCHEN CARDS GRID */}
          <div className="mb-14">
            {filteredCooks.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-[#EFECE6] text-slate-400">
                <ChefHat className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No home kitchens match your current filters.</p>
                <p className="text-xs text-slate-400 mt-1">Try selecting "All India" or resetting your cuisine filters!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCooks.map(cook => (
                  <KitchenCard key={cook.id} cook={cook} />
                ))}
              </div>
            )}
          </div>

          {/* POPULAR DISHES DISCOVERY */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Utensils className="w-5 h-5 text-[#E05326]" />
              <h3 className="text-2xl font-black font-heading text-[#1E1B18]">
                Featured Homestyle Dishes
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>

        </section>

        {/* HUMAN TESTIMONIALS & COMMUNITY STORIES */}
        <section className="bg-white border-y border-[#EFECE6] py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-orange-100 text-orange-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Community Trust
              </span>
              <h2 className="text-3xl font-black font-heading text-[#1E1B18] mt-3">
                Why People Love KookIndia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#EFECE6] space-y-4">
                <Quote className="w-8 h-8 text-[#E05326]/40" />
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "As a North Indian software engineer living in Indiranagar, Sunita Ji's Rajma Chawal literally tastes like my mother's kitchen in Chandigarh. Clean, non-greasy, and fresh!"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[#EFECE6]">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Ankit Srivastava</div>
                    <div className="text-[10px] text-slate-500 font-medium">Bangalore • Verified Buyer</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#EFECE6] space-y-4">
                <Quote className="w-8 h-8 text-[#E05326]/40" />
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "I was able to start my home kitchen in DLF Gurgaon with 0 upfront investment. KookIndia handles FSSAI registration and delivery dispatch through Dunzo so I can focus purely on cooking."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[#EFECE6]">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Home Cook" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Anupama Banerjee</div>
                    <div className="text-[10px] text-slate-500 font-medium">Gurgaon • Home Chef</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#EFECE6] space-y-4">
                <Quote className="w-8 h-8 text-[#E05326]/40" />
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  "Finding pure Marwari Jain food without garlic or onions in Mumbai used to be impossible. Bhavna Ben’s daily dinner tiffin subscription has been a life saver for my elderly parents."
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-[#EFECE6]">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Chirag Shah</div>
                    <div className="text-[10px] text-slate-500 font-medium">Mumbai • Tiffin Subscriber</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
