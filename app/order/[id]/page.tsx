'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { INITIAL_ORDERS } from '@/lib/db';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrderTrackingPage() {
  const order = INITIAL_ORDERS[0];
  const [currentStep, setCurrentStep] = useState<number>(2); // Step 2: Cooking

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10 w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <span className="bg-orange-100 text-orange-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Live Order Tracker
            </span>
            <h1 className="text-3xl font-black text-slate-900 font-heading mt-2">
              Order #{order.order_number}
            </h1>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Marketplace</span>
          </Link>
        </div>

        {/* LIVE TIMELINE CARD */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md mb-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs text-slate-500 font-bold">Estimated Delivery:</div>
              <div className="text-xl font-black text-slate-900 font-heading text-orange-600">
                {order.estimated_delivery_time}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500 font-bold">Delivery Partner:</div>
              <div className="text-sm font-black text-slate-900 font-mono">
                🚀 {order.delivery_partner} Express
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-extrabold">
            <div className={`p-4 rounded-2xl border text-center ${currentStep >= 1 ? 'bg-orange-50 border-orange-400 text-orange-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="text-lg font-black mb-1">1. Placed</div>
              <div className="text-[10px] font-medium">Order Received</div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${currentStep >= 2 ? 'bg-orange-50 border-orange-400 text-orange-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="text-lg font-black mb-1">2. Cooking</div>
              <div className="text-[10px] font-medium">Chef {order.cook_name} Preparing</div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${currentStep >= 3 ? 'bg-orange-50 border-orange-400 text-orange-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="text-lg font-black mb-1">3. Dispatched</div>
              <div className="text-[10px] font-medium">Picked Up by {order.delivery_partner}</div>
            </div>

            <div className={`p-4 rounded-2xl border text-center ${currentStep >= 4 ? 'bg-emerald-50 border-emerald-400 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <div className="text-lg font-black mb-1">4. Delivered</div>
              <div className="text-[10px] font-medium">Enjoy Your Home Food!</div>
            </div>
          </div>
        </div>

        {/* ORDER DETAILS SUMMARY */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 text-xs font-medium">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-heading">{order.kitchen_name}</h3>
                <div className="text-xs text-slate-500 font-bold">By {order.cook_name}</div>
              </div>
            </div>

            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 text-xs">
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>Call Kitchen</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="font-extrabold text-slate-900 text-sm">Items Ordered:</div>
            {order.items.map(item => (
              <div key={item.dish_id} className="flex justify-between text-slate-800 font-bold">
                <span>{item.quantity}× {item.dish_name}</span>
                <span className="font-mono">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
            <span>Total Amount Paid ({order.payment_method})</span>
            <span className="font-mono text-orange-600 text-lg">₹{order.total_amount}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
