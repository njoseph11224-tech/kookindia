'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { INITIAL_COOKS, INITIAL_DISHES, INITIAL_ORDERS } from '@/lib/db';
import { Dish, Order } from '@/lib/types';
import { ChefHat, Plus, Clock, ShoppingBag, Star, ShieldCheck, X, Check, Trash2, Edit3, Upload, Zap, CheckSquare, Square, ArrowRight } from 'lucide-react';

export default function CookDashboardPage() {
  const [kitchenOpen, setKitchenOpen] = useState<boolean>(true);
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES.filter(d => d.cook_id === 'cook-1'));
  
  // Seed 3 active orders for demonstration of bulk actions
  const [orders, setOrders] = useState<Order[]>([
    INITIAL_ORDERS[0],
    {
      id: 'ord-1002',
      order_number: 'KI-88913',
      customer_name: 'Ankit Srivastava',
      customer_phone: '+91 91234 56789',
      customer_email: 'ankit@gmail.com',
      delivery_address: 'Flat 102, Green Glen Layout, Bellandur',
      city: 'Bangalore',
      locality: 'Bellandur',
      cook_id: 'cook-1',
      cook_name: 'Sunita Sharma',
      kitchen_name: 'Sharma Ji Ki Rasoi',
      items: [
        { dish_id: 'dish-2', dish_name: 'Homestyle Ghar Ki Thali (Veg)', price: 249, quantity: 2 },
      ],
      subtotal: 498,
      delivery_fee: 40,
      platform_fee: 15,
      total_amount: 553,
      payment_method: 'UPI',
      payment_status: 'PAID',
      order_status: 'PLACED',
      delivery_partner: 'Dunzo',
      created_at: new Date(Date.now() - 10 * 60000).toISOString(),
      estimated_delivery_time: '30-40 mins',
    },
    {
      id: 'ord-1003',
      order_number: 'KI-88914',
      customer_name: 'Priya Nair',
      customer_phone: '+91 99887 11223',
      customer_email: 'priya@gmail.com',
      delivery_address: 'Villa 14, Palm Meadows, Whitefield',
      city: 'Bangalore',
      locality: 'Whitefield',
      cook_id: 'cook-1',
      cook_name: 'Sunita Sharma',
      kitchen_name: 'Sharma Ji Ki Rasoi',
      items: [
        { dish_id: 'dish-1', dish_name: 'Special Amritsari Chole Bhature (2 Pcs)', price: 189, quantity: 1 },
      ],
      subtotal: 189,
      delivery_fee: 40,
      platform_fee: 15,
      total_amount: 244,
      payment_method: 'UPI',
      payment_status: 'PAID',
      order_status: 'PLACED',
      delivery_partner: 'Porter',
      created_at: new Date(Date.now() - 5 * 60000).toISOString(),
      estimated_delivery_time: '40-50 mins',
    },
  ]);

  // Selected Order IDs for Bulk Status Update
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState<boolean>(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const cook = INITIAL_COOKS[0];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // New Dish Form State
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    description: '',
    cuisine: 'North Indian' as Dish['cuisine'],
    is_veg: true,
    is_jain: false,
    is_batch_ready: false,
    advance_available_for: 'Today Instant',
    prep_time_minutes: '45',
    daily_stock_limit: '25',
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (isEdit && editingDish) {
          setEditingDish({ ...editingDish, image_url: result });
        } else {
          setNewDish(prev => ({ ...prev, image_url: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Dish = {
      id: `dish-${Date.now()}`,
      cook_id: cook.id,
      name: newDish.name,
      description: newDish.description,
      price: Number(newDish.price) || 199,
      image_url: newDish.image_url,
      cuisine: newDish.cuisine,
      is_veg: newDish.is_veg,
      is_jain: newDish.is_jain,
      is_gluten_free: false,
      prep_time_minutes: Number(newDish.prep_time_minutes) || 30,
      is_preorder_only: !newDish.is_batch_ready,
      min_order_notice_hours: newDish.is_batch_ready ? 0 : 1,
      serves_people: 1,
      daily_stock_limit: Number(newDish.daily_stock_limit) || 30,
      stock_remaining: Number(newDish.daily_stock_limit) || 30,
      is_available: true,
      is_batch_ready: newDish.is_batch_ready,
      advance_available_for: newDish.advance_available_for,
    };

    setDishes([created, ...dishes]);
    setIsAddDishModalOpen(false);
    setNewDish({
      name: '',
      price: '',
      description: '',
      cuisine: 'North Indian',
      is_veg: true,
      is_jain: false,
      is_batch_ready: false,
      advance_available_for: 'Today Instant',
      prep_time_minutes: '45',
      daily_stock_limit: '25',
      image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    });
  };

  const handleSaveEditDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish) return;

    setDishes(prev =>
      prev.map(d => (d.id === editingDish.id ? editingDish : d))
    );
    setEditingDish(null);
  };

  const handleToggleDishAvailability = (dishId: string) => {
    setDishes(prev =>
      prev.map(d => (d.id === dishId ? { ...d, is_available: !d.is_available } : d))
    );
  };

  const handleDeleteDish = (dishId: string) => {
    setDishes(prev => prev.filter(d => d.id !== dishId));
  };

  // Order Checkbox Handling
  const handleToggleSelectOrder = (orderId: string) => {
    setSelectedOrderIds(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedOrderIds.length === orders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(orders.map(o => o.id));
    }
  };

  // Bulk Status Update Handler
  const handleBulkUpdateStatus = (newStatus: Order['order_status']) => {
    setOrders(prev =>
      prev.map(o => (selectedOrderIds.includes(o.id) ? { ...o, order_status: newStatus } : o))
    );
    setSelectedOrderIds([]);
  };

  const handleSingleUpdateStatus = (orderId: string, newStatus: Order['order_status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, order_status: newStatus } : o))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E1B18]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={cook.profile_image}
              alt={cook.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E05326] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black font-heading text-[#1E1B18]">
                  {cook.kitchen_name}
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  FSSAI Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Chef {cook.name} • {cook.locality}, {cook.city}</p>
            </div>
          </div>

          {/* Kitchen OPEN / CLOSED Toggle */}
          <div className="flex items-center gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EFECE6]">
            <span className="text-xs font-bold text-[#1E1B18]">Kitchen Status:</span>
            <button
              onClick={() => setKitchenOpen(!kitchenOpen)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                kitchenOpen
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-300 text-slate-700'
              }`}
            >
              {kitchenOpen ? '🟢 Kitchen OPEN' : '🔴 Kitchen CLOSED'}
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Today's Earnings</div>
            <div className="text-2xl font-black text-[#1E1B18] font-mono">₹1,240</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Orders</div>
            <div className="text-2xl font-black text-[#E05326] font-heading">{orders.length}</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cook Rating</div>
            <div className="text-2xl font-black text-[#1E1B18] font-heading flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>{cook.rating}</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Next Payout</div>
            <div className="text-2xl font-black text-emerald-700 font-mono">₹4,890</div>
          </div>
        </div>

        {/* ACTIVE ORDER QUEUE WITH BULK STATUS ACTIONS */}
        <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFECE6] pb-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#E05326]" />
              <h2 className="text-xl font-black font-heading text-[#1E1B18]">
                Live Incoming Orders ({orders.length})
              </h2>
            </div>

            {/* Select All Checkbox */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSelectAll}
                className="flex items-center gap-1.5 text-xs font-bold text-[#1E1B18] bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-[#EFECE6]"
              >
                {selectedOrderIds.length === orders.length ? (
                  <CheckSquare className="w-4 h-4 text-[#E05326]" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span>Select All ({orders.length})</span>
              </button>
            </div>
          </div>

          {/* BULK ACTION TOOLBAR (Visible when 1+ orders selected) */}
          {selectedOrderIds.length > 0 && (
            <div className="bg-[#E05326]/10 border border-[#E05326]/30 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-bold animate-fadeIn">
              <div className="text-[#E05326] font-extrabold flex items-center gap-2">
                <span>⚡ {selectedOrderIds.length} Orders Selected for Bulk Update:</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleBulkUpdateStatus('ACCEPTED')}
                  className="bg-[#1E1B18] hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-sm"
                >
                  ✓ Accept Selected ({selectedOrderIds.length})
                </button>

                <button
                  onClick={() => handleBulkUpdateStatus('COOKING')}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-sm"
                >
                  🍳 Start Cooking
                </button>

                <button
                  onClick={() => handleBulkUpdateStatus('DISPATCHED')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-sm"
                >
                  🚀 Dispatch Drivers
                </button>

                <button
                  onClick={() => handleBulkUpdateStatus('DELIVERED')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all shadow-sm"
                >
                  🎉 Mark Delivered
                </button>
              </div>
            </div>
          )}

          {/* ORDER CARDS */}
          <div className="space-y-4">
            {orders.map(order => {
              const isSelected = selectedOrderIds.includes(order.id);
              return (
                <div
                  key={order.id}
                  className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-orange-50 border-[#E05326] shadow-sm'
                      : 'bg-white border-[#EFECE6] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Select Checkbox */}
                    <button
                      onClick={() => handleToggleSelectOrder(order.id)}
                      className="mt-1 flex-shrink-0 text-[#E05326]"
                    >
                      {isSelected ? <CheckSquare className="w-5 h-5 text-[#E05326]" /> : <Square className="w-5 h-5 text-slate-300" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs font-black text-[#1E1B18] bg-[#FAF7F2] px-2.5 py-0.5 rounded-md border border-[#EFECE6]">
                          #{order.order_number}
                        </span>
                        <span className="text-[#1E1B18] font-black">{order.customer_name}</span>
                        <span className="text-slate-500">({order.locality})</span>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                            order.order_status === 'PLACED'
                              ? 'bg-orange-100 text-orange-900 border-orange-200'
                              : order.order_status === 'ACCEPTED'
                              ? 'bg-blue-100 text-blue-900 border-blue-200'
                              : order.order_status === 'COOKING'
                              ? 'bg-amber-100 text-amber-900 border-amber-200'
                              : order.order_status === 'DISPATCHED'
                              ? 'bg-purple-100 text-purple-900 border-purple-200'
                              : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                          }`}
                        >
                          ● {order.order_status}
                        </span>
                      </div>

                      <div className="text-slate-700 space-x-2">
                        {order.items.map(item => (
                          <span key={item.dish_id} className="font-bold text-[#1E1B18]">
                            {item.quantity}× {item.dish_name}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-500 mt-1 font-mono">
                        Total: ₹{order.total_amount} ({order.payment_method}) • Driver: <span className="font-bold text-slate-800">{order.delivery_partner}</span>
                      </div>
                    </div>
                  </div>

                  {/* Individual Order Status Selector */}
                  <div className="flex items-center gap-2">
                    <select
                      value={order.order_status}
                      onChange={e => handleSingleUpdateStatus(order.id, e.target.value as Order['order_status'])}
                      className="bg-[#FAF7F2] text-[#1E1B18] font-bold px-3 py-2 rounded-xl border border-[#EFECE6] text-xs cursor-pointer focus:outline-none"
                    >
                      <option value="PLACED">Placed</option>
                      <option value="ACCEPTED">✓ Accepted by Kitchen</option>
                      <option value="COOKING">🍳 Cooking in Progress</option>
                      <option value="DISPATCHED">🚀 Dispatched with Driver</option>
                      <option value="DELIVERED">🎉 Delivered</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MENU & DISH POSTING MANAGER */}
        <div className="bg-white p-6 rounded-3xl border border-[#EFECE6] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black font-heading text-[#1E1B18] flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#E05326]" />
                <span>Kitchen Menu & Advance Dish Manager</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Upload photos, set advance ready batches, modify prices & manage daily stock
              </p>
            </div>

            <button
              onClick={() => setIsAddDishModalOpen(true)}
              className="bg-[#E05326] hover:bg-[#c8441c] text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-[#E05326]/20"
            >
              <Plus className="w-4 h-4" />
              <span>+ Post New Dish</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-[#FAF7F2] text-slate-500 uppercase text-[10px] font-black tracking-wider border-b border-[#EFECE6]">
                <tr>
                  <th className="py-3 px-4">Dish & Photo</th>
                  <th className="py-3 px-4">Mode / Schedule</th>
                  <th className="py-3 px-4">Price (₹)</th>
                  <th className="py-3 px-4">Daily Stock</th>
                  <th className="py-3 px-4">Prep Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] font-semibold">
                {dishes.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={d.image_url} alt={d.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-[#EFECE6]" />
                        <div>
                          <div className="font-bold text-[#1E1B18]">{d.name}</div>
                          <div className="text-[10px] text-slate-400">{d.is_veg ? '🟢 Pure Veg' : '🔴 Non-Veg'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {d.is_batch_ready ? (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                          <Zap className="w-3 h-3 text-amber-600" />
                          <span>Ready Batch</span>
                        </span>
                      ) : (
                        <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded w-fit block">
                          Made Fresh To Order
                        </span>
                      )}
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {d.advance_available_for || 'Today'}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-black text-[#1E1B18]">₹{d.price}</td>
                    <td className="py-3 px-4">{d.daily_stock_limit} portions</td>
                    <td className="py-3 px-4">{d.prep_time_minutes} mins</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleDishAvailability(d.id)}
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                          d.is_available
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                      >
                        {d.is_available ? '● Active' : '○ Paused'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingDish(d)}
                          className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#E05326] transition-colors"
                          title="Modify Dish"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteDish(d.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADD NEW DISH MODAL DIALOG WITH PHOTO UPLOAD & ADVANCE SETUP */}
        {isAddDishModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-[#EFECE6] shadow-2xl relative max-h-[90vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-[#E05326]" />
                  <h3 className="text-xl font-black font-heading text-[#1E1B18]">Post New Dish to Menu</h3>
                </div>
                <button onClick={() => setIsAddDishModalOpen(false)} className="p-1.5 rounded-xl bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateDish} className="space-y-4 text-xs font-medium">
                {/* PHOTO UPLOAD SECTION */}
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Dish Photo *</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={newDish.image_url}
                      alt="Preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E05326] flex-shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={e => handlePhotoUpload(e, false)}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-[#FAF7F2] hover:bg-orange-50 text-[#1E1B18] font-extrabold py-2 px-3 rounded-xl border border-[#EFECE6] flex items-center justify-center gap-1.5 text-xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#E05326]" />
                        <span>Upload Photo from Device</span>
                      </button>
                      <input
                        type="text"
                        value={newDish.image_url}
                        onChange={e => setNewDish({ ...newDish, image_url: e.target.value })}
                        placeholder="Or enter image URL..."
                        className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3 py-1.5 text-[11px] text-slate-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Dish Name *</label>
                  <input
                    type="text"
                    value={newDish.name}
                    onChange={e => setNewDish({ ...newDish, name: e.target.value })}
                    placeholder="e.g. Special Matar Paneer Thali"
                    className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-bold text-[#1E1B18] focus:outline-none focus:border-[#E05326]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      value={newDish.price}
                      onChange={e => setNewDish({ ...newDish, price: e.target.value })}
                      placeholder="e.g. 220"
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-mono font-bold text-[#1E1B18] focus:outline-none focus:border-[#E05326]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Cuisine Category</label>
                    <select
                      value={newDish.cuisine}
                      onChange={e => setNewDish({ ...newDish, cuisine: e.target.value as Dish['cuisine'] })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3 py-2.5 font-bold text-[#1E1B18]"
                    >
                      <option value="North Indian">North Indian</option>
                      <option value="South Indian">South Indian</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Maharashtrian">Maharashtrian</option>
                      <option value="Healthy & Diet">Healthy & Diet</option>
                    </select>
                  </div>
                </div>

                {/* ADVANCE PREPARATION & BATCH SETUP */}
                <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 space-y-3">
                  <div className="font-extrabold text-amber-900 flex items-center gap-1.5 text-xs">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Advance Batch & Prep Mode</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="batch_mode" className="text-xs font-bold text-slate-800 cursor-pointer">
                      Prepared Ahead in Batch (Instant Pickup)
                    </label>
                    <input
                      type="checkbox"
                      id="batch_mode"
                      checked={newDish.is_batch_ready}
                      onChange={e => setNewDish({ ...newDish, is_batch_ready: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Advance Availability Schedule</label>
                    <select
                      value={newDish.advance_available_for}
                      onChange={e => setNewDish({ ...newDish, advance_available_for: e.target.value })}
                      className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 font-bold text-[#1E1B18]"
                    >
                      <option value="Today Instant">Today Instant (In Stock)</option>
                      <option value="Tomorrow Lunch Batch">Tomorrow Lunch Batch</option>
                      <option value="Tomorrow Dinner Batch">Tomorrow Dinner Batch</option>
                      <option value="Weekend Special Batch">Weekend Special Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Description & Ingredients</label>
                  <textarea
                    rows={2}
                    value={newDish.description}
                    onChange={e => setNewDish({ ...newDish, description: e.target.value })}
                    placeholder="Fresh cottage cheese in green pea gravy served with 4 Ghee Phulkas..."
                    className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs font-medium text-[#1E1B18]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Daily Stock Limit</label>
                    <input
                      type="number"
                      value={newDish.daily_stock_limit}
                      onChange={e => setNewDish({ ...newDish, daily_stock_limit: e.target.value })}
                      placeholder="25"
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-bold text-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Prep Time (Mins)</label>
                    <input
                      type="number"
                      value={newDish.prep_time_minutes}
                      onChange={e => setNewDish({ ...newDish, prep_time_minutes: e.target.value })}
                      placeholder="45"
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-bold text-[#1E1B18]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={newDish.is_veg}
                      onChange={e => setNewDish({ ...newDish, is_veg: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <span>100% Pure Veg</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={newDish.is_jain}
                      onChange={e => setNewDish({ ...newDish, is_jain: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600"
                    />
                    <span>Pure Jain</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#EFECE6]">
                  <button
                    type="button"
                    onClick={() => setIsAddDishModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E05326] text-white font-black rounded-xl shadow-md shadow-[#E05326]/20"
                  >
                    Publish Dish to Menu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* EDIT / MODIFY DISH MODAL DIALOG */}
        {editingDish && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-[#EFECE6] shadow-2xl relative max-h-[90vh] overflow-y-auto my-auto">
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#E05326]" />
                  <h3 className="text-xl font-black font-heading text-[#1E1B18]">Modify Dish Details</h3>
                </div>
                <button onClick={() => setEditingDish(null)} className="p-1.5 rounded-xl bg-slate-100 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEditDish} className="space-y-4 text-xs font-medium">
                {/* PHOTO EDIT SECTION */}
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Dish Photo *</label>
                  <div className="flex items-center gap-4">
                    <img
                      src={editingDish.image_url}
                      alt="Preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#E05326] flex-shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        ref={editFileInputRef}
                        onChange={e => handlePhotoUpload(e, true)}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="w-full bg-[#FAF7F2] hover:bg-orange-50 text-[#1E1B18] font-extrabold py-2 px-3 rounded-xl border border-[#EFECE6] flex items-center justify-center gap-1.5 text-xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#E05326]" />
                        <span>Upload New Photo</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Dish Name *</label>
                  <input
                    type="text"
                    value={editingDish.name}
                    onChange={e => setEditingDish({ ...editingDish, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-bold text-[#1E1B18] focus:outline-none focus:border-[#E05326]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      value={editingDish.price}
                      onChange={e => setEditingDish({ ...editingDish, price: Number(e.target.value) })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-mono font-bold text-[#1E1B18] focus:outline-none focus:border-[#E05326]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Cuisine Category</label>
                    <select
                      value={editingDish.cuisine}
                      onChange={e => setEditingDish({ ...editingDish, cuisine: e.target.value as Dish['cuisine'] })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3 py-2.5 font-bold text-[#1E1B18]"
                    >
                      <option value="North Indian">North Indian</option>
                      <option value="South Indian">South Indian</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Maharashtrian">Maharashtrian</option>
                      <option value="Healthy & Diet">Healthy & Diet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">Description & Ingredients</label>
                  <textarea
                    rows={2}
                    value={editingDish.description}
                    onChange={e => setEditingDish({ ...editingDish, description: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs font-medium text-[#1E1B18]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Daily Stock Limit</label>
                    <input
                      type="number"
                      value={editingDish.daily_stock_limit}
                      onChange={e => setEditingDish({ ...editingDish, daily_stock_limit: Number(e.target.value) })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-bold text-[#1E1B18]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Prep Time (Mins)</label>
                    <input
                      type="number"
                      value={editingDish.prep_time_minutes}
                      onChange={e => setEditingDish({ ...editingDish, prep_time_minutes: Number(e.target.value) })}
                      className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-4 py-2.5 font-bold text-[#1E1B18]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={editingDish.is_veg}
                      onChange={e => setEditingDish({ ...editingDish, is_veg: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <span>100% Pure Veg</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={editingDish.is_jain}
                      onChange={e => setEditingDish({ ...editingDish, is_jain: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600"
                    />
                    <span>Pure Jain</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-[#EFECE6]">
                  <button
                    type="button"
                    onClick={() => setEditingDish(null)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E05326] text-white font-black rounded-xl shadow-md shadow-[#E05326]/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
