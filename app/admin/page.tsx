'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { INITIAL_COOKS } from '@/lib/db';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, Phone, MessageSquare, RefreshCw, DollarSign, Search, Award, ChefHat, Users, Calendar } from 'lucide-react';

interface SupportTicket {
  id: string;
  ticket_number: string;
  customer_name: string;
  phone: string;
  issue_type: 'Delayed Order' | 'Food Quality / Packaging' | 'Subscription Pause Request' | 'Refund Claim';
  kitchen_name: string;
  description: string;
  order_amount: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'RESOLVED' | 'REFUNDED';
  created_at: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'verifications' | 'tickets' | 'analytics'>('verifications');
  
  // Kitchen Verification State
  const [cooks, setCooks] = useState(INITIAL_COOKS);

  // Customer Support Tickets Mock State
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'tk-1',
      ticket_number: 'TK-901',
      customer_name: 'Rahul Verma',
      phone: '+91 98765 43210',
      issue_type: 'Food Quality / Packaging',
      kitchen_name: 'Sharma Ji Ki Rasoi',
      description: 'The chole curry lid was slightly loose during Dunzo transport. Requested partial refund for spilled item.',
      order_amount: 423,
      priority: 'HIGH',
      status: 'OPEN',
      created_at: '15 mins ago',
    },
    {
      id: 'tk-2',
      ticket_number: 'TK-902',
      customer_name: 'Ankit Srivastava',
      phone: '+91 91234 56789',
      issue_type: 'Subscription Pause Request',
      kitchen_name: 'Sharma Ji Ki Rasoi',
      description: 'Traveling out of station from 12th Aug to 15th Aug. Please pause North Indian Executive Lunch Tiffin delivery.',
      order_amount: 3499,
      priority: 'MEDIUM',
      status: 'OPEN',
      created_at: '1 hour ago',
    },
    {
      id: 'tk-3',
      ticket_number: 'TK-903',
      customer_name: 'Chirag Shah',
      phone: '+91 99887 76655',
      issue_type: 'Delayed Order',
      kitchen_name: 'Patel Marwari & Gujarati Thali',
      description: 'Delivery partner arrived 10 minutes past estimated time due to rain in Ghatkopar.',
      order_amount: 220,
      priority: 'LOW',
      status: 'RESOLVED',
      created_at: '3 hours ago',
    },
  ]);

  const handleVerifyKitchen = (cookId: string) => {
    setCooks(prev =>
      prev.map(c => (c.id === cookId ? { ...c, is_verified: true } : c))
    );
  };

  const handleResolveTicket = (ticketId: string, action: 'RESOLVED' | 'REFUNDED') => {
    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, status: action } : t))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1E1B18] text-[#E05326] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading text-[#1E1B18]">
                KookIndia Admin Control Panel
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Home Cook Verifications, FSSAI Audits & Customer Support Tickets
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-2xl border border-[#EFECE6]">
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'verifications'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Partner Kitchens ({cooks.length})
            </button>

            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'tickets'
                  ? 'bg-[#1E1B18] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Support Tickets ({tickets.filter(t => t.status === 'OPEN').length})
            </button>
          </div>
        </div>

        {/* TAB 1: PARTNER KITCHEN VERIFICATION */}
        {activeTab === 'verifications' && (
          <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black font-heading text-[#1E1B18] flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#E05326]" />
                <span>Home Cook FSSAI Verification Queue</span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                100% Virtual Kitchen Inspections
              </span>
            </div>

            <div className="space-y-4">
              {cooks.map(cook => (
                <div
                  key={cook.id}
                  className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EFECE6] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={cook.profile_image}
                      alt={cook.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#E05326] flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-[#1E1B18] font-heading">{cook.kitchen_name}</h3>
                        {cook.is_verified ? (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            FSSAI Verified
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-300">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            Pending Inspection
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-600 font-semibold">
                        Chef {cook.name} • {cook.locality}, {cook.city}
                      </div>

                      <div className="text-xs font-mono text-slate-500">
                        FSSAI License: <span className="font-bold text-[#1E1B18]">{cook.fssai_license}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!cook.is_verified ? (
                      <button
                        onClick={() => handleVerifyKitchen(cook.id)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Approve & Verify FSSAI</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setCooks(cooks.map(c => (c.id === cook.id ? { ...c, is_verified: false } : c)))}
                        className="bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-bold px-3.5 py-2 rounded-xl"
                      >
                        Re-Audit Kitchen
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: USER COMPLAINTS & SUPPORT TICKETS */}
        {activeTab === 'tickets' && (
          <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black font-heading text-[#1E1B18] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#E05326]" />
                <span>Customer Complaints & Support Resolution</span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Target Resolution Time: &lt; 15 mins
              </span>
            </div>

            <div className="space-y-4">
              {tickets.map(t => (
                <div
                  key={t.id}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    t.status === 'OPEN'
                      ? 'bg-orange-50/50 border-orange-200'
                      : 'bg-[#FAF7F2] border-[#EFECE6] opacity-75'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-black bg-[#1E1B18] text-white px-2.5 py-1 rounded-md">
                        #{t.ticket_number}
                      </span>
                      <span className="text-sm font-black text-[#1E1B18]">{t.customer_name}</span>
                      <span className="text-xs font-bold text-[#E05326]">({t.issue_type})</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-slate-500">{t.created_at}</span>
                      {t.status === 'OPEN' ? (
                        <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-rose-200">
                          🔴 Action Needed
                        </span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                          ✅ {t.status}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {t.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-bold text-slate-600">
                    <div>
                      Kitchen Involved: <span className="text-[#1E1B18] font-extrabold">{t.kitchen_name}</span> • Amount: <span className="font-mono text-slate-900">₹{t.order_amount}</span>
                    </div>

                    {t.status === 'OPEN' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResolveTicket(t.id, 'RESOLVED')}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl"
                        >
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => handleResolveTicket(t.id, 'REFUNDED')}
                          className="bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl"
                        >
                          Issue Refund (₹{t.order_amount})
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
