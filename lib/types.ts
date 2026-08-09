export interface Cook {
  id: string;
  name: string;
  kitchen_name: string;
  city: string;
  locality: string;
  state: string;
  address: string;
  fssai_license: string;
  bio: string;
  profile_image: string;
  kitchen_image: string;
  cuisine_specialties: string[];
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_active: boolean;
  lead_time_hours: number; // Prep notice in hours (e.g. 2 hours)
  created_at: string;
}

export interface Dish {
  id: string;
  cook_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  cuisine: 'North Indian' | 'South Indian' | 'Bengali' | 'Gujarati' | 'Maharashtrian' | 'Kashmiri' | 'Rajasthani' | 'Healthy & Diet';
  is_veg: boolean;
  is_jain: boolean;
  is_gluten_free: boolean;
  prep_time_minutes: number;
  is_preorder_only: boolean;
  min_order_notice_hours: number;
  serves_people: number;
  daily_stock_limit: number;
  stock_remaining: number;
  is_available: boolean;
  is_batch_ready?: boolean;
  advance_available_for?: string;
}

export interface SubscriptionPlan {
  id: string;
  cook_id: string;
  cook_name: string;
  kitchen_name: string;
  city: string;
  title: string;
  description: string;
  cuisine: string;
  price_per_month: number;
  price_per_week: number;
  price_per_meal: number;
  meal_types: ('Lunch' | 'Dinner')[];
  delivery_days: string[]; // Mon-Fri, All 7 Days
  is_veg: boolean;
  image_url: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  cook: Cook;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  delivery_address: string;
  city: string;
  locality: string;
  cook_id: string;
  cook_name: string;
  kitchen_name: string;
  items: {
    dish_id: string;
    dish_name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  delivery_fee: number;
  platform_fee: number;
  total_amount: number;
  payment_method: 'UPI' | 'Card' | 'COD';
  payment_status: 'PAID' | 'PENDING';
  order_status: 'PLACED' | 'ACCEPTED' | 'COOKING' | 'DISPATCHED' | 'DELIVERED';
  delivery_partner: 'Dunzo' | 'Porter' | 'Borzo' | 'Shadowfax';
  delivery_tracking_url?: string;
  created_at: string;
  estimated_delivery_time: string;
}

export interface CookPartnerRegistration {
  full_name: string;
  kitchen_name: string;
  email: string;
  phone: string;
  city: string;
  locality: string;
  fssai_number: string;
  cuisine_specialties: string[];
  signature_dishes: string;
  bank_account_number: string;
  ifsc_code: string;
}
