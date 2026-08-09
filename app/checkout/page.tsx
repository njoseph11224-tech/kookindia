'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { INITIAL_COOKS, INITIAL_DISHES } from '@/lib/db';
import { ShieldCheck, Truck, CreditCard, CheckCircle2, ArrowRight, MapPin, ChefHat, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD'>('UPI');
  const [placed, setPlaced] = useState<boolean>(false);

  const [address, setAddress] = useState({
    name: 'Rahul Verma',
    phone: '+91 98765 43210',
    flat: 'Flat 402, Sunshine Apartments',
    locality: 'Indiranagar',
    city: 'Bangalore',
    pincode: '560038',
  });

  // Mock Multi-Chef Items in Cart: Item from Sunita (Punjabi) + Item from Meenakshi (Chettinad)
  const cartKitchens = [
    {
      cook: INITIAL_COOKS[0], // Sunita Sharma
      items: [
        { dish: INITIAL_DISHES[0], quantity: 1 }, // Chole Bhature ₹189
      ],
    },
    {
      cook: INITIAL_COOKS[1], // Meenakshi Sundaram
      items: [
        { dish: INITIAL_DISHES[3], quantity: 1 }, // Chettinad Chicken ₹279
      ],
    },
  ];

  const subtotal = cartKitchens.reduce(
    (sum, k) => sum + k.items.reduce((s, i) => s + i.dish.price * i.quantity, 0),
    0
  );
  const deliveryFee = cartKitchens.length * 35; // ₹35 dispatch per kitchen
  const platformFee = 15;
  const grandTotal = subtotal + deliveryFee + platformFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10 w-full">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-black font-heading text-[#1E1B18]">
            Multi-Chef Checkout
          </h1>
          <span className="bg-[#E05326]/10 text-[#E05326] text-xs font-bold px-3 py-1 rounded-full border border-[#E05326]/20">
            {cartKitchens.length} Kitchens Consolidated
          </span>
        </div>

        {placed ? (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#EFECE6] shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black font-heading text-[#1E1B18]">Multi-Chef Order Placed!</h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
              We have split your order into <span className="font-bold text-[#1E1B18]">2 parallel orders</span> (#KI-88912-A & #KI-88912-B). Both home kitchens have begun cooking!
            </p>

            {/* Sub Order Badges */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFECE6] max-w-md mx-auto text-left text-xs font-bold space-y-2">
              <div className="flex justify-between items-center text-[#1E1B18]">
                <span>🍳 Kitchen 1: Sharma Ji Ki Rasoi</span>
                <span className="text-emerald-700 font-black">Cooking (#KI-88912-A)</span>
              </div>
              <div className="flex justify-between items-center text-[#1E1B18]">
                <span>🍳 Kitchen 2: Chettinad Amma Kitchen</span>
                <span className="text-emerald-700 font-black">Cooking (#KI-88912-B)</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/order/ord-1001" className="bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-black py-3.5 px-6 rounded-2xl inline-flex items-center gap-2 shadow-lg shadow-[#E05326]/20">
                <span>Track Both Orders Live</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Delivery Address Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm space-y-4 text-xs font-medium">
                <div className="flex items-center gap-2 text-base font-black font-heading text-[#1E1B18]">
                  <MapPin className="w-5 h-5 text-[#E05326]" />
                  <span>1. Delivery Address</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={e => setAddress({ ...address, name: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3.5 py-2 font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={e => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3.5 py-2 font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Flat / Building / House No.</label>
                  <input
                    type="text"
                    value={address.flat}
                    onChange={e => setAddress({ ...address, flat: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3.5 py-2 font-bold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Locality</label>
                    <input
                      type="text"
                      value={address.locality}
                      onChange={e => setAddress({ ...address, locality: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3.5 py-2 font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={e => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3.5 py-2 font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm space-y-4 text-xs font-medium">
                <div className="flex items-center gap-2 text-base font-black font-heading text-[#1E1B18]">
                  <CreditCard className="w-5 h-5 text-[#E05326]" />
                  <span>2. Consolidated Payment Method</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-2xl border text-center font-bold transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#E05326] bg-orange-50/50 text-[#E05326] shadow-sm'
                        : 'border-[#EFECE6] text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-black mb-1">📱 UPI</div>
                    <div className="text-[10px] text-slate-500">Google Pay / PhonePe</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-4 rounded-2xl border text-center font-bold transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#E05326] bg-orange-50/50 text-[#E05326] shadow-sm'
                        : 'border-[#EFECE6] text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-black mb-1">💳 Card</div>
                    <div className="text-[10px] text-slate-500">Credit / Debit</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-2xl border text-center font-bold transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#E05326] bg-orange-50/50 text-[#E05326] shadow-sm'
                        : 'border-[#EFECE6] text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-black mb-1">💵 Cash</div>
                    <div className="text-[10px] text-slate-500">Pay on Delivery</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary Column - Items Grouped By Chef */}
            <div>
              <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm space-y-4 text-xs font-medium sticky top-24">
                <h3 className="text-base font-black font-heading text-[#1E1B18] border-b border-[#EFECE6] pb-3">
                  Multi-Chef Basket ({cartKitchens.length} Chefs)
                </h3>

                {/* Kitchen Breakdown */}
                <div className="space-y-4">
                  {cartKitchens.map(({ cook, items }) => (
                    <div key={cook.id} className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EFECE6] space-y-2">
                      <div className="flex items-center gap-2 border-b border-[#EFECE6] pb-1.5">
                        <ChefHat className="w-3.5 h-3.5 text-[#E05326]" />
                        <span className="font-extrabold text-[#1E1B18]">{cook.kitchen_name}</span>
                      </div>

                      {items.map(i => (
                        <div key={i.dish.id} className="flex justify-between text-slate-800 font-bold">
                          <span>{i.quantity}× {i.dish.name}</span>
                          <span className="font-mono">₹{i.dish.price * i.quantity}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#EFECE6] space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>Food Subtotal</span>
                    <span className="font-mono">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics Dispatch ({cartKitchens.length} Kitchens)</span>
                    <span className="font-mono text-[#1E1B18] font-bold">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span className="font-mono text-[#1E1B18] font-bold">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#EFECE6] text-base font-black text-[#1E1B18]">
                    <span>Total Amount</span>
                    <span className="font-mono text-[#E05326]">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#E05326]/20"
                >
                  <span>Pay ₹{grandTotal} & Place Orders</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
