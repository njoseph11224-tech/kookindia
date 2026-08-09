import React from 'react';
import Link from 'next/link';
import { ChefHat, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E1B18] text-slate-300 py-12 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#E05326] flex items-center justify-center text-white font-bold">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-black text-xl font-heading text-white">
                Kook<span className="text-[#E05326]">India</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              Connecting passionate home cooks with food lovers across India. Authentic, hygienic, homestyle regional cooking delivered with love.
            </p>
            <div className="inline-flex items-center gap-1.5 bg-emerald-950/60 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-xl border border-emerald-800/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FSSAI Food Safety Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-3">Explore Menu</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><Link href="/" className="hover:text-[#E05326] transition-colors">North Indian Thalis</Link></li>
              <li><Link href="/" className="hover:text-[#E05326] transition-colors">Chettinad & South Indian</Link></li>
              <li><Link href="/" className="hover:text-[#E05326] transition-colors">Bengali Shorshe Ilish</Link></li>
              <li><Link href="/" className="hover:text-[#E05326] transition-colors">Gujarati & Marwari Pure Veg</Link></li>
              <li><Link href="/subscriptions" className="hover:text-[#E05326] transition-colors">Daily Office Tiffins</Link></li>
            </ul>
          </div>

          {/* Delivery Cities */}
          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-3">Active Cities</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li>📍 Bangalore (Indiranagar, Koramangala, HSR)</li>
              <li>📍 Gurgaon (DLF Phase 1-5, Golf Course Road)</li>
              <li>📍 Mumbai (Ghatkopar, Powai, Bandra)</li>
              <li>📍 Hyderabad (Banjara Hills, Hitec City)</li>
              <li>📍 Pune (Viman Nagar, Baner)</li>
            </ul>
          </div>

          {/* Cook Partner Callout */}
          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-3">Homemakers & Chefs</h4>
            <p className="text-slate-400 mb-4 leading-relaxed font-medium">
              Are you a passionate home cook? Monetize your culinary skills and start your digital kitchen today.
            </p>
            <Link
              href="/cook/register"
              className="inline-flex items-center gap-1.5 bg-[#E05326] hover:bg-[#c8441c] text-white font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-[#E05326]/20"
            >
              <span>Register as Partner Cook</span>
            </Link>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} KookIndia Technologies Pvt Ltd. All Rights Reserved.</p>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-[#E05326] transition-colors font-bold">
              Admin Portal
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#E05326] fill-[#E05326]" />
            <span>for Home Cooks of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
