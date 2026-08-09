'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChefHat, ShieldCheck, CheckCircle2, ArrowRight, Upload, Phone, Mail, Building, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function CookRegisterPage() {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    full_name: '',
    kitchen_name: '',
    email: '',
    phone: '',
    city: 'Bangalore',
    locality: '',
    fssai_number: '',
    needs_fssai_help: false,
    cuisine_specialties: ['North Indian'],
    signature_dishes: '',
    bank_account: '',
    ifsc_code: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white font-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-600/20">
            <ChefHat className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Start Your Digital Kitchen on <span className="text-orange-600">KookIndia</span>
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-2 leading-relaxed">
            Turn your passion for regional cooking into a profitable home business. Connect with thousands of customers craving authentic, home-cooked food in your neighborhood.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">Application Submitted Successfully!</h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{formData.full_name}</span>! Our Onboarding Specialist will contact you at <span className="font-bold text-slate-900">{formData.phone}</span> within 24 hours to conduct your virtual kitchen hygiene check and activate your menu.
            </p>
            <div className="pt-4">
              <Link href="/cook/dashboard" className="bg-slate-900 text-white text-xs font-black py-3 px-6 rounded-xl inline-block">
                View Cook Partner Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 text-xs font-bold text-slate-400">
              <span className={step >= 1 ? 'text-orange-600 font-black' : ''}>1. Basic Details</span>
              <span>➔</span>
              <span className={step >= 2 ? 'text-orange-600 font-black' : ''}>2. FSSAI & Kitchen</span>
              <span>➔</span>
              <span className={step >= 3 ? 'text-orange-600 font-black' : ''}>3. Menu & Specialties</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-medium">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 font-heading mb-2">Step 1: Personal & Kitchen Info</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="e.g. Sunita Sharma"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Kitchen Name *</label>
                      <input
                        type="text"
                        value={formData.kitchen_name}
                        onChange={e => setFormData({ ...formData, kitchen_name: e.target.value })}
                        placeholder="e.g. Sharma Ji Ki Rasoi"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sunita@gmail.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">City *</label>
                      <select
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                      >
                        <option value="Bangalore">Bangalore</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Locality / Neighborhood *</label>
                      <input
                        type="text"
                        value={formData.locality}
                        onChange={e => setFormData({ ...formData, locality: e.target.value })}
                        placeholder="e.g. Indiranagar, HSR Layout"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-orange-600 text-white text-xs font-black py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      <span>Next: FSSAI License & Hygiene</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 font-heading mb-2">Step 2: FSSAI Food Safety Compliance</h3>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-emerald-900 space-y-1">
                    <div className="font-extrabold flex items-center gap-1.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>FSSAI Registration is Mandatory in India</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-medium">
                      Basic FSSAI registration for home cooks costs only ₹100/year for under ₹12 Lakh annual turnover. If you don't have one, we will help you get registered!
                    </p>
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">14-Digit FSSAI License Number (If Available)</label>
                    <input
                      type="text"
                      value={formData.fssai_number}
                      onChange={e => setFormData({ ...formData, fssai_number: e.target.value })}
                      placeholder="e.g. 21223190004512"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="needs_help"
                      checked={formData.needs_fssai_help}
                      onChange={e => setFormData({ ...formData, needs_fssai_help: e.target.checked })}
                      className="w-4 h-4 rounded text-orange-600"
                    />
                    <label htmlFor="needs_help" className="text-xs text-slate-700 font-bold cursor-pointer">
                      I don't have an FSSAI license yet — Please assist me with FSSAI registration.
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-slate-100 text-slate-700 text-xs font-bold py-3 px-5 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-orange-600 text-white text-xs font-black py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      <span>Next: Menu & Signature Dishes</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 font-heading mb-2">Step 3: Cuisine & Signature Dishes</h3>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Describe Your Signature Dishes & Specialty *</label>
                    <textarea
                      rows={3}
                      value={formData.signature_dishes}
                      onChange={e => setFormData({ ...formData, signature_dishes: e.target.value })}
                      placeholder="e.g. Authentic Amritsari Chole Bhature, Ghee Phulka Thali, Slow-cooked Rajma Chawal..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">Bank Account Number (For Weekly Payouts)</label>
                      <input
                        type="text"
                        value={formData.bank_account}
                        onChange={e => setFormData({ ...formData, bank_account: e.target.value })}
                        placeholder="9182390128301"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={formData.ifsc_code}
                        onChange={e => setFormData({ ...formData, ifsc_code: e.target.value })}
                        placeholder="SBIN0001234"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-orange-500 font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-slate-100 text-slate-700 text-xs font-bold py-3 px-5 rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/20"
                    >
                      Submit Kitchen Registration
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
