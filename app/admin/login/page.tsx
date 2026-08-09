'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, Mail, ArrowRight, ChefHat } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@kookindia.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@kookindia.com' && password === 'admin123') {
      router.push('/admin');
    } else {
      setError('Invalid admin credentials. Use admin@kookindia.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18]">
      <Navbar />

      <main className="flex-1 max-w-md mx-auto px-4 py-16 w-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-[#EFECE6] shadow-xl w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1E1B18] text-[#E05326] flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black font-heading text-[#1E1B18]">Admin Operations Login</h1>
            <p className="text-xs text-slate-500 font-medium">
              KookIndia Partner Verification & Support Portal
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 text-rose-800 text-xs font-bold p-3 rounded-xl border border-rose-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-medium">
            <div>
              <label className="text-slate-700 font-bold block mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl pl-9 pr-4 py-2.5 font-bold text-[#1E1B18] focus:outline-none focus:border-[#E05326]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 font-bold block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl pl-9 pr-4 py-2.5 font-bold text-[#1E1B18] focus:outline-none focus:border-[#E05326]"
                  required
                />
              </div>
            </div>

            <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-200 text-[11px] text-[#1E1B18]">
              <span className="font-bold">Demo Login:</span> <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-orange-300">admin@kookindia.com</code> / <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-orange-300">admin123</code>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-black py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#E05326]/20"
            >
              <span>Access Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
