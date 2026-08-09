'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getSubscriptions } from '@/lib/db';
import { SubscriptionPlan } from '@/lib/types';
import { Calendar, ShieldCheck, Check, Clock, Sparkles, MapPin, ChefHat, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SubscriptionsPage() {
  const [selectedCity, setSelectedCity] = useState<string>('Bangalore');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const plans = getSubscriptions(selectedCity);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar selectedCity={selectedCity} onCityChange={setSelectedCity} />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-10 w-full">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-emerald-200 inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Daily Office & Home Tiffin Subscriptions</span>
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight mt-3 mb-4">
            Never Miss <span className="text-orange-600">Ghar Ka Khana</span> Again.
          </h1>

          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            Subscribe to monthly or weekly lunch & dinner tiffin plans prepared by verified home chefs in {selectedCity}. Fresh rotis, authentic dals, low oil, and pure ingredients delivered Mon-Fri.
          </p>
        </div>

        {/* SUBSCRIPTION PLANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map(plan => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl border-2 border-slate-200 shadow-md hover:border-orange-500 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100">
                  <img src={plan.image_url} alt={plan.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    {plan.is_veg ? '🥗 100% Pure Veg' : '🍗 Non-Veg Options'}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-bold text-orange-200 flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-orange-400" />
                      <span>{plan.kitchen_name}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-black text-slate-900 font-heading leading-snug">
                    {plan.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {plan.description}
                  </p>

                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-2 text-xs font-bold text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Meal Timing:</span>
                      <span className="text-slate-900">{plan.meal_types.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Delivery Schedule:</span>
                      <span className="text-slate-900">{plan.delivery_days.join(', ')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-orange-200 text-sm font-black text-orange-600">
                      <span>Effective Per Meal:</span>
                      <span className="font-mono">₹{plan.price_per_meal} / meal</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center justify-between text-slate-900">
                  <span className="text-xs font-bold text-slate-500">Monthly Subscription</span>
                  <span className="text-2xl font-black font-mono">₹{plan.price_per_month}</span>
                </div>

                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20"
                >
                  <span>Subscribe to Tiffin Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Confirmation Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
              <h3 className="text-xl font-black text-slate-900 font-heading mb-2">
                Subscribe to {selectedPlan.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium mb-6">
                You are subscribing to {selectedPlan.kitchen_name} in {selectedPlan.city}. Daily fresh meals delivered straight to your home or office.
              </p>

              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 text-xs space-y-2 mb-6 font-bold">
                <div className="flex justify-between">
                  <span>Plan Duration:</span>
                  <span>1 Month (Mon-Fri)</span>
                </div>
                <div className="flex justify-between">
                  <span>Price Per Month:</span>
                  <span className="font-mono text-orange-600 font-black text-base">₹{selectedPlan.price_per_month}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <Link
                  href="/checkout"
                  onClick={() => setSelectedPlan(null)}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-xl text-decoration-none"
                >
                  Proceed to Pay ₹{selectedPlan.price_per_month}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
