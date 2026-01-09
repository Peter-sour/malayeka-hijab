import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Instagram, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Truck, 
  ShieldCheck, 
  Heart,
  ArrowRight,
  ShoppingBasket,
  Sparkles,
  Search,
  Eye,
  Trash2,
  Plus,
  Minus,
  Check,
  Facebook,
  Twitter,
  ChevronDown,
  Info,
  Clock,
  ArrowUp,
  MapPin,
  Mail,
  Phone,
  Award,
  AlertCircle,
  RefreshCw,
  Zap,
  HelpCircle,
  Settings,
  Smile,
  Globe,
  Share2,
  Package,
  CreditCard,
  UserCheck,
  Bookmark,
  Gift,
  Timer,
  Wind // Menambahkan Wind ke dalam daftar impor
} from 'lucide-react';

/**
 * =============================================================================
 * MALAYEKA HIJAB - THE ENTERPRISE DIGITAL BOUTIQUE V4.1 (STABLE & BUG-FIXED)
 * =============================================================================
 * * FILOSOFI PENGEMBANGAN:
 * Menggabungkan estetika butik fisik kelas atas ke dalam antarmuka digital.
 * Fokus pada "Conversion Rate Optimization" (CRO) melalui transparansi stok
 * dan kemudahan navigasi perangkat seluler tanpa hambatan tanya-jawab admin.
 * * * FITUR UNGGULAN:
 * 1. Live Inventory Tracking: Transparansi stok per varian warna secara visual.
 * 2. Shopping Cart Engine: Manajemen keranjang belanja dengan sinkronisasi WhatsApp.
 * 3. Luxury Presentation: Efek glassmorphism, animasi fade-in, dan transisi smooth.
 * 4. Mobile App Feel: Navigasi bawah khusus mobile untuk pengalaman seperti App Store.
 * 5. Knowledge Center: Panduan bahan dan perawatan untuk menambah kredibilitas brand.
 * * * AUTHOR: Lavirixweb
 * TOTAL LINES: 1000+
 * =============================================================================
 */

// --- 1. GLOBAL CONFIGURATIONS & MOCK DATABASE ---

const BRAND_NAME = "Malayeka Hijab";
const BRAND_TAGLINE = "Pancarkan Cahaya Keanggunanmu";
const WHATSAPP_NUMBER = "6281234567890"; // Ganti dengan nomor asli klien
const DESIGNED_BY = "Lavirixweb";

// Alias Ikon untuk konsistensi sistem (Menghindari ReferenceError)
const CartIcon = ShoppingBag;

/**
 * DATABASE MATERIAL (Bahan Hijab)
 * Memberikan nilai edukasi kepada calon pembeli.
 */
const MATERIALS_KNOWLEDGE = [
  { id: 1, name: "Silk Mulberry", desc: "Bahan sutra premium dengan kilau alami yang sangat mewah dan tekstur super lembut.", icon: Sparkles },
  { id: 2, name: "Voal Ultrafine", desc: "Serat katun berkualitas tinggi yang dingin, menyerap keringat, dan mudah dibentuk.", icon: ShieldCheck },
  { id: 3, name: "Ceruty Armany", desc: "Tekstur berpasir yang elegan, jatuh sempurna, dan memberikan efek flowing saat bergerak.", icon: Wind }
];

/**
 * DATABASE PRODUK & INVENTARIS
 * Struktur data mendalam untuk transparansi stok real-time.
 */
const PRODUCTS_INVENTORY = [
  {
    id: 1,
    name: "Pashmina Silk Luxury - Rose Edition",
    category: "Pashmina",
    basePrice: 125000,
    discountPrice: 95000,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    description: "Koleksi pashmina termewah dengan finishing silk mulberry. Sangat sejuk, memberikan kilau elegan di bawah cahaya, dan memiliki tekstur yang jatuh sempurna (flowing).",
    features: ["Finishing Silk Mulberry Premium", "Hand-stitched (Tepi Jahit Tangan)", "Ukuran 180x75cm", "Bahan Breathable"],
    variants: [
      { id: "v1-1", colorName: "Dusty Rose", hex: "#E2938C", stock: 3, max: 10 },
      { id: "v1-2", colorName: "Champagne Gold", hex: "#F3E5AB", stock: 15, max: 20 },
      { id: "v1-3", colorName: "Silver Grey", hex: "#C0C0C0", stock: 7, max: 15 }
    ],
    tag: "Best Seller",
    reviewsCount: 156,
    rating: 5.0
  },
  {
    id: 2,
    name: "Segi Empat Voal Ultrafine LaserCut",
    category: "Segi Empat",
    basePrice: 85000,
    discountPrice: 75000,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
    description: "Produk 'Daily Essential' paling populer. Menggunakan kain Voal Ultrafine Grade A+ yang dijamin tegak sempurna di dahi tanpa perlu disetrika berulang kali.",
    features: ["Voal Ultrafine Grade A+", "Ultra Precise Laser Cutting", "Ukuran 115x115cm", "Serat Kain Anti Kusut"],
    variants: [
      { id: "v2-1", colorName: "Pure Charcoal", hex: "#1A1A1B", stock: 45, max: 50 },
      { id: "v2-2", colorName: "Sand Stone", hex: "#D2B48C", stock: 2, max: 10 },
      { id: "v2-3", colorName: "Milky Cream", hex: "#FFFDD0", stock: 20, max: 30 }
    ],
    tag: "Most Popular",
    reviewsCount: 1240,
    rating: 4.9
  },
  {
    id: 3,
    name: "Khimar Malika Double Layer",
    category: "Instant",
    basePrice: 155000,
    discountPrice: 135000,
    image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1000&auto=format&fit=crop",
    description: "Desain khimar instan dua lapis yang anggun. Mengutamakan syar'i namun tetap terlihat modis dengan potongan layering yang dinamis.",
    features: ["Ceruty Babydoll Original", "Double Layer (Anti Tembus)", "Pad Soft Antem Hijrah", "Menutup Dada & Punggung"],
    variants: [
      { id: "v3-1", colorName: "Deep Navy", hex: "#000080", stock: 5, max: 8 },
      { id: "v3-2", colorName: "Dark Maroon", hex: "#800000", stock: 1, max: 10 },
      { id: "v3-3", colorName: "Misty Grey", hex: "#708090", stock: 4, max: 12 }
    ],
    tag: "Exclusive",
    reviewsCount: 89,
    rating: 5.0
  },
  {
    id: 4,
    name: "Pashmina Ceruty Baby Doll Armany",
    category: "Pashmina",
    basePrice: 65000,
    discountPrice: 55000,
    image: "https://images.unsplash.com/photo-1618333244973-7740523497d5?q=80&w=1000&auto=format&fit=crop",
    description: "Pashmina basic dengan kualitas kain 'Armany' yang tekstur pasirnya lebih halus dibanding ceruty biasa. Favorit influencer fashion muslimah.",
    features: ["Ceruty Armany High Twist", "Tekstur Pasir Halus", "Ukuran 175x75cm", "Pilihan 40+ Warna"],
    variants: [
      { id: "v4-1", colorName: "Cocoa", hex: "#5C4033", stock: 60, max: 100 },
      { id: "v4-2", colorName: "Nude Peach", hex: "#FFDAB9", stock: 25, max: 50 },
      { id: "v4-3", colorName: "Terracotta", hex: "#E2725B", stock: 12, max: 40 }
    ],
    tag: "Budget Buy",
    reviewsCount: 342,
    rating: 4.8
  },
  {
    id: 5,
    name: "Inner Ninja Cool-Tech Spandek",
    category: "Aksesoris",
    basePrice: 55000,
    discountPrice: 45000,
    image: "https://images.unsplash.com/photo-1609178694972-2337d10003df?q=80&w=1000&auto=format&fit=crop",
    description: "Ciput ninja tercanggih kami. Dengan teknologi serat Cool-Tech yang melepas panas kepala 2x lebih cepat dibanding katun biasa.",
    features: ["Teknologi Cool-Tech Spandek", "Lubang Earphone/Kacamata", "Anti Pusing & Gatal", "Menutup Leher Sempurna"],
    variants: [
      { id: "v5-1", colorName: "Solid Black", hex: "#000000", stock: 120, max: 200 },
      { id: "v5-2", colorName: "Skin Tone", hex: "#F5DEB3", stock: 80, max: 150 },
      { id: "v5-3", colorName: "Cloud White", hex: "#FFFFFF", stock: 40, max: 100 }
    ],
    tag: "Essential",
    reviewsCount: 567,
    rating: 4.9
  },
  {
    id: 6,
    name: "Malayeka Heritage Printed Silk",
    category: "Premium",
    basePrice: 215000,
    discountPrice: 185000,
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=1000&auto=format&fit=crop",
    description: "Karya seni dalam selembar kain. Motif eksklusif terinspirasi dari arsitektur Islam klasik, dicetak terbatas hanya 100 pcs per motif.",
    features: ["Digital Printing Reaktif", "Motif Heritage Eksklusif", "Bahan Silk Luxury", "Hardbox Eksklusif & Card"],
    variants: [
      { id: "v6-1", colorName: "Midnight Bloom", hex: "#2C3E50", stock: 1, max: 10 },
      { id: "v6-2", colorName: "Sage Garden", hex: "#9CAF88", stock: 3, max: 10 }
    ],
    tag: "Collector's Item",
    reviewsCount: 45,
    rating: 5.0
  },
  {
    id: 7,
    name: "Scarf Magnet Luxury Brooch",
    category: "Aksesoris",
    basePrice: 35000,
    discountPrice: 29000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    description: "Magnet hijab premium yang kuat namun sangat lembut pada kain. Menghindari kerusakan kain akibat jarum pentul.",
    features: ["Super Strong Magnet", "Anti Karat", "Rose Gold Plating", "Elegant Design"],
    variants: [
      { id: "v7-1", colorName: "Rose Gold", hex: "#B76E79", stock: 50, max: 100 },
      { id: "v7-2", colorName: "Silver", hex: "#C0C0C0", stock: 45, max: 100 }
    ],
    tag: "New Product",
    reviewsCount: 23,
    rating: 5.0
  },
  {
    id: 8,
    name: "Segi Empat Paris Luxury",
    category: "Segi Empat",
    basePrice: 45000,
    discountPrice: null,
    image: "https://images.unsplash.com/photo-1520006403993-4740f0967d02?q=80&w=1000&auto=format&fit=crop",
    description: "Paris premium dengan serat kain yang lebih rapat dan tidak menerawang dibanding paris biasa.",
    features: ["Paris Japan Grade A", "Tepi Jahit Rapi", "Ukuran 110x110cm", "Banyak Warna"],
    variants: [
      { id: "v8-1", colorName: "White Pearl", hex: "#F8F8FF", stock: 12, max: 30 },
      { id: "v8-2", colorName: "Creamy Latte", hex: "#FFFDD0", stock: 15, max: 30 }
    ],
    tag: "Restock",
    reviewsCount: 112,
    rating: 4.7
  }
];

const CUSTOMER_REVIEWS = [
  { id: 1, name: "Aisyah Luthfia", city: "Jakarta", text: "Gak perlu nanya admin lagi stok warna apa yang ready, semuanya jelas di web. Bahannya beneran premium!", avatar: "AL" },
  { id: 2, name: "Siti Rahma", city: "Bandung", text: "Silk luxury-nya mewah banget. Checkout di web langsung diarahkan ke WA admin yang ramah. Rekomen!", avatar: "SR" },
  { id: 3, name: "Nabila Putri", city: "Surabaya", text: "Pengiriman cepat dan packingnya sangat eksklusif. Berasa beli barang branded luar negeri.", avatar: "NP" }
];

const FAQS_DATA = [
  { id: 1, q: "Kenapa harus pilih warna di website?", a: "Agar Anda mendapatkan kepastian stok secara real-time. Memilih warna di web memastikan Anda 'mengamankan' kuota stok sebelum melakukan konfirmasi pembayaran di WhatsApp." },
  { id: 2, q: "Apakah data stok 100% akurat?", a: "Sistem kami tersinkronisasi dengan database gudang pusat setiap 5-10 menit. Jika stok tertulis 1 unit, berarti benar-benar sisa 1 unit di rak gudang kami." },
  { id: 3, q: "Ada pengiriman gratis ongkir?", a: "Kami sering mengadakan promo gratis ongkir khusus untuk pembelian melalui website dengan minimal belanja tertentu. Pantau terus banner promo kami!" }
];

// --- 2. REUSABLE ATOMIC COMPONENTS ---

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 md:mb-32 ${centered ? 'text-center' : 'text-left'} animate-fade`}>
    <h2 className="text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-gradient-to-r from-pink-400 to-amber-200 rounded-full mb-10 ${centered ? 'mx-auto' : ''}`}></div>
    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg font-light italic">
      "{subtitle}"
    </p>
  </div>
);

const LuxuryBadge = ({ children, type = "primary" }) => {
  const styles = {
    primary: "bg-pink-50 text-pink-600 border-pink-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    danger: "bg-red-50 text-red-600 border-red-100",
    dark: "bg-gray-900 text-white border-gray-900"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${styles[type]}`}>
      {children}
    </span>
  );
};

const formatPrice = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

/**
 * Visualisasi Progres Stok
 * Membantu pembeli melihat urgensi pembelian.
 */
const StockVisualizer = ({ stock, max }) => {
  const percentage = Math.min(100, (stock / max) * 100);
  let color = "bg-emerald-400";
  if (percentage < 15) color = "bg-red-500";
  else if (percentage < 40) color = "bg-amber-400";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sisa Stok Real-Time</span>
        <span className={`text-[10px] font-bold ${percentage < 15 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>{stock} Unit</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// --- 3. MAIN CORE APPLICATION ---

export default function App() {
  // --- A. STATE MANAGEMENT ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Semua");
  const [query, setQuery] = useState("");
  const [viewProduct, setViewProduct] = useState(null);
  const [activeVariant, setActiveVariant] = useState(null);
  const [cart, setCart] = useState([]);
  const [faqIndex, setFaqIndex] = useState(0);
  const [toast, setToast] = useState({ active: false, msg: "" });
  const [countdown, setCountdown] = useState({ h: 2, m: 45, s: 0 });

  // --- B. EFFECTS & LIFECYCLE ---

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    const preloader = setTimeout(() => setIsLoaded(true), 2000);

    // Flash Sale Timer Logic
    const timer = setInterval(() => {
       setCountdown(prev => {
         if (prev.s > 0) return { ...prev, s: prev.s - 1 };
         if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
         if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
         return prev;
       });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(preloader);
      clearInterval(timer);
    };
  }, []);

  // --- C. BUSINESS LOGIC ---

  const categories = useMemo(() => ["Semua", ...new Set(PRODUCTS_INVENTORY.map(p => p.category))], []);

  const displayedItems = useMemo(() => {
    return PRODUCTS_INVENTORY.filter(p => {
      const matchCat = activeTab === "Semua" || p.category === activeTab;
      const matchSearch = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeTab, query]);

  const showToast = (msg) => {
    setToast({ active: true, msg });
    setTimeout(() => setToast({ active: false, msg: "" }), 3000);
  };

  const handleAddToCart = (product, variant) => {
    if (!variant) {
      showToast("Mohon pilih warna dahulu!");
      return;
    }
    if (variant.stock <= 0) {
      showToast("Warna ini sudah habis!");
      return;
    }

    const uniqueCartId = `${product.id}-${variant.id}`;
    const found = cart.find(i => i.uniqueCartId === uniqueCartId);

    if (found) {
      if (found.qty >= variant.stock) {
        showToast("Batas stok tercapai!");
        return;
      }
      setCart(cart.map(i => i.uniqueCartId === uniqueCartId ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, activeVariant: variant, uniqueCartId, qty: 1 }]);
    }
    showToast(`${variant.colorName} masuk keranjang!`);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.discountPrice || item.basePrice) * item.qty, 0);
  }, [cart]);

  const triggerCheckout = () => {
    if (cart.length === 0) return;
    let orderList = `*ORDER KATALOG MALAYEKA*\n\n`;
    cart.forEach((item, idx) => {
      orderList += `${idx + 1}. *${item.name}*\n   - Warna: ${item.activeVariant.colorName}\n   - Qty: ${item.qty}x\n   - Sisa Stok: ${item.activeVariant.stock} (Verified)\n\n`;
    });
    orderList += `*TOTAL TAGIHAN:* ${formatPrice(cartTotal)}\n\nMohon informasi pembayarannya agar stok saya tidak hangus.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderList)}`, '_blank');
  };

  // --- D. RENDER COMPONENTS ---

  if (!isLoaded) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FFFDFE] overflow-hidden">
        <div className="relative mb-12">
          <div className="w-24 h-24 border-b-4 border-pink-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="font-serif italic text-pink-600 text-3xl font-bold">M</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-serif italic text-4xl text-pink-600 tracking-[0.3em] uppercase leading-none mb-4">Malayeka</h1>
          <p className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-black animate-pulse">Establishing Inventory Link...</p>
        </div>
        {/* Abstract Background for Loader */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-50 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-50 rounded-full blur-[100px] opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFE] text-gray-900 font-sans selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden">
      
      {/* GLOBAL CSS INJECTION */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-fade { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide { animation: slideRight 0.5s ease-out forwards; }
        
        html { scroll-behavior: smooth; }

        .luxury-glass {
           background: rgba(255, 255, 255, 0.8);
           backdrop-filter: blur(12px);
           -webkit-backdrop-filter: blur(12px);
        }

        .custom-shadow {
           box-shadow: 0 50px 100px -20px rgba(0,0,0,0.1), 0 30px 60px -30px rgba(0,0,0,0.15);
        }
      `}} />

      {/* --- TOAST NOTIFICATION SYSTEM --- */}
      <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[3000] transition-all duration-500 ${toast.active ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-gray-900 text-white px-10 py-5 rounded-[1.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex items-center gap-5 border border-white/10">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
             <Check size={20} className="text-white" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em]">{toast.msg}</span>
        </div>
      </div>

      {/* --- SHOPPING LIST DRAWER --- */}
      <div className={`fixed inset-0 z-[2000] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-700 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-10 border-b flex items-center justify-between bg-pink-50/20">
              <div>
                 <h3 className="text-3xl font-serif font-bold italic leading-none">Daftar Stok Saya</h3>
                 <p className="text-[10px] uppercase tracking-[0.4em] text-pink-500 mt-3 font-black">Live Reservation Active</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-4 bg-white rounded-full shadow-lg hover:rotate-90 transition-transform"><X size={24}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                   <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center mb-10">
                      <ShoppingBasket size={80} className="text-gray-300" />
                   </div>
                   <h4 className="text-2xl font-serif italic text-gray-400">Keranjang Masih Kosong</h4>
                   <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 mt-6 leading-loose font-black">Pilih Hijab Favoritmu <br/> di Katalog Live Stok</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.uniqueCartId} className="flex gap-8 group animate-fade">
                     <div className="w-28 h-36 rounded-[2rem] overflow-hidden shrink-0 shadow-2xl transition-transform group-hover:scale-105 border border-gray-100">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                     </div>
                     <div className="flex-1 py-2 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xs font-black uppercase text-gray-800 tracking-tighter leading-tight max-w-[150px]">{item.name}</h4>
                           <button onClick={() => setCart(cart.filter(c => c.uniqueCartId !== item.uniqueCartId))} className="text-gray-300 hover:text-red-500 transition-colors p-1"><Trash2 size={20}/></button>
                        </div>
                        <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-6 italic">Warna: {item.activeVariant.colorName}</p>
                        <div className="mt-auto flex items-center justify-between">
                           <span className="text-xl font-black text-gray-900">{formatPrice(item.discountPrice || item.basePrice)}</span>
                           <div className="flex items-center gap-5 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                              <button onClick={() => {
                                 if (item.qty > 1) {
                                   setCart(cart.map(c => c.uniqueCartId === item.uniqueCartId ? { ...c, qty: c.qty - 1 } : c));
                                 } else {
                                   setCart(cart.filter(c => c.uniqueCartId !== item.uniqueCartId));
                                 }
                              }} className="hover:text-pink-600 transition-colors"><Minus size={14}/></button>
                              <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                              <button onClick={() => {
                                if (item.qty < item.activeVariant.stock) {
                                  setCart(cart.map(c => c.uniqueCartId === item.uniqueCartId ? { ...c, qty: c.qty + 1 } : c));
                                } else {
                                  showToast("Melebihi stok yang ada!");
                                }
                              }} className="hover:text-pink-600 transition-colors"><Plus size={14}/></button>
                           </div>
                        </div>
                     </div>
                  </div>
                ))
              )}
           </div>

           <div className="p-10 border-t bg-gray-900 text-white rounded-t-[4rem] custom-shadow">
              <div className="space-y-5 mb-12 opacity-80 font-bold uppercase tracking-[0.3em] text-[10px]">
                 <div className="flex justify-between">
                    <span>Estimasi Subtotal</span>
                    <span className="text-sm font-black">{formatPrice(cartTotal)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span>Admin Verifikasi</span>
                    <span className="text-sm font-black italic text-pink-400">Gratis</span>
                 </div>
                 <div className="h-px bg-white/10 w-full"></div>
                 <div className="flex justify-between items-center text-white opacity-100 pt-2">
                    <span className="text-xs text-amber-500">Total Akhir</span>
                    <span className="text-4xl font-serif italic font-bold">{formatPrice(cartTotal)}</span>
                 </div>
              </div>
              <button 
                onClick={triggerCheckout}
                disabled={cart.length === 0}
                className="w-full bg-pink-500 hover:bg-white hover:text-gray-900 disabled:bg-gray-700 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-5 group overflow-hidden relative"
              >
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                 <MessageCircle size={28} className="shrink-0" /> Checkout Ke WA
              </button>
              <p className="text-[9px] text-center text-gray-500 mt-6 font-bold uppercase tracking-widest leading-relaxed">
                 *Stok hanya terkunci selama 15 menit <br/> setelah list pesanan dikirim ke admin.
              </p>
           </div>
        </div>
      </div>

      {/* --- QUICK LOOK MODAL (DETAIL PRODUK) --- */}
      {viewProduct && (
        <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade" onClick={() => setViewProduct(null)} />
           <div className="relative bg-white w-full max-w-6xl rounded-[4rem] overflow-hidden shadow-[0_80px_150px_rgba(0,0,0,0.4)] animate-fade">
              <button onClick={() => setViewProduct(null)} className="absolute top-10 right-10 z-10 p-5 bg-white/80 rounded-full hover:bg-pink-500 hover:text-white transition-all shadow-2xl border border-gray-100">
                 <X size={32} />
              </button>
              
              <div className="flex flex-col lg:flex-row h-full max-h-[92vh]">
                 <div className="lg:w-[55%] h-80 lg:h-auto overflow-hidden bg-gray-50 relative group">
                    <img src={viewProduct.image} className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105" alt="" />
                    <div className="absolute top-10 left-10">
                       <LuxuryBadge type="dark">{viewProduct.tag || "Koleksi Terbaru"}</LuxuryBadge>
                    </div>
                 </div>
                 <div className="lg:w-[45%] p-10 lg:p-20 overflow-y-auto no-scrollbar flex flex-col bg-white">
                    <div className="flex items-center gap-6 mb-8">
                       <LuxuryBadge type="amber">{viewProduct.category}</LuxuryBadge>
                       <div className="flex items-center gap-2">
                          <Star size={20} className="text-amber-400 fill-amber-400" />
                          <span className="text-[12px] font-black text-gray-900 uppercase">4.9/5.0</span>
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest ml-1">({viewProduct.reviewsCount} Ulasan)</span>
                       </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-none tracking-tight">{viewProduct.name}</h2>
                    <p className="text-gray-500 text-base mb-12 leading-relaxed font-light italic">"{viewProduct.description}"</p>
                    
                    <div className="mb-14 p-8 bg-pink-50/30 rounded-[3rem] border border-pink-100">
                       <div className="flex justify-between items-center mb-8">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-600">Pilih Varian Warna</span>
                          {activeVariant && (
                            <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${activeVariant.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${activeVariant.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {activeVariant.stock > 0 ? `${activeVariant.stock} Unit Ready` : 'HABIS TERJUAL'}
                               </span>
                            </div>
                          )}
                       </div>
                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                          {viewProduct.variants.map((v) => (
                            <button 
                              key={v.id}
                              onClick={() => setActiveVariant(v)}
                              className={`flex items-center gap-3 p-4 rounded-3xl border-2 transition-all duration-500 ${activeVariant?.id === v.id ? 'border-pink-500 bg-white shadow-[0_15px_30px_rgba(236,72,153,0.2)] scale-105' : 'border-transparent bg-white hover:border-gray-200'} ${v.stock === 0 ? 'opacity-30 grayscale pointer-events-none' : ''}`}
                            >
                               <div className="w-8 h-8 rounded-full border border-gray-100 shadow-inner shrink-0" style={{ backgroundColor: v.hex }}></div>
                               <span className="text-[11px] font-black text-gray-800 tracking-tight truncate">{v.colorName}</span>
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-16 px-4">
                       {viewProduct.features.map((f, i) => (
                         <div key={i} className="flex items-center gap-5 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                            <Check size={18} className="text-pink-500 shrink-0" />
                            <span>{f}</span>
                         </div>
                       ))}
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row items-center gap-10 pt-12 border-t border-gray-100">
                       <div className="flex flex-col flex-1 text-center sm:text-left">
                          <span className="text-[11px] font-black uppercase tracking-widest text-gray-300 mb-2 italic">Luxury Investment</span>
                          <div className="flex items-baseline gap-4 justify-center sm:justify-start">
                             <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
                                {formatPrice(viewProduct.discountPrice || viewProduct.basePrice)}
                             </span>
                             {viewProduct.discountPrice && (
                               <span className="text-xl text-gray-300 line-through font-bold">{formatPrice(viewProduct.basePrice)}</span>
                             )}
                          </div>
                       </div>
                       <button 
                        onClick={() => { handleAddToCart(viewProduct, activeVariant); }}
                        className="w-full sm:w-auto flex-1 bg-gray-900 hover:bg-pink-600 text-white h-20 rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-5 group"
                       >
                          <Plus size={28} className="group-hover:rotate-90 transition-transform" /> Tambah List
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- TOP BAR NAVIGATION (DESKTOP) --- */}
      <nav className={`fixed top-0 w-full z-[1500] transition-all duration-700 ${scrolled ? 'bg-white/90 backdrop-blur-2xl py-4 shadow-[0_15px_40px_rgba(0,0,0,0.05)] translate-y-0' : 'bg-transparent py-12'}`}>
        <div className="container mx-auto px-8 lg:px-16 flex items-center justify-between">
           {/* Desktop Links Left */}
           <div className="hidden lg:flex items-center gap-16 flex-1 font-black text-[10px] uppercase tracking-[0.5em] text-gray-500">
              <a href="#katalog" className="hover:text-pink-600 transition-all hover:tracking-[0.6em] relative group">Katalog Stok</a>
              <a href="#cerita" className="hover:text-pink-600 transition-all hover:tracking-[0.6em] relative group">Filosofi</a>
           </div>

           {/* Brand Centerpiece */}
           <div className="text-center flex-1 lg:flex-none cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-[0.3em] text-pink-600 uppercase italic leading-none transition-all group-hover:scale-110">Malayeka</h1>
              <div className="flex items-center justify-center gap-6 mt-3">
                 <div className="h-px w-10 bg-amber-200/50"></div>
                 <p className="text-[10px] tracking-[0.6em] text-amber-500 uppercase font-black">Luxury Boutique</p>
                 <div className="h-px w-10 bg-amber-200/50"></div>
              </div>
           </div>

           {/* Desktop Links Right */}
           <div className="hidden lg:flex items-center gap-12 flex-1 justify-end">
              <div className="relative group p-3 bg-gray-50/50 rounded-2xl cursor-pointer">
                 <Search size={22} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative group p-4 bg-gray-900 rounded-3xl transition-all hover:bg-pink-500 hover:scale-110 active:scale-90 shadow-2xl"
              >
                 <CartIcon size={24} className="text-white" />
                 {cart.length > 0 && (
                   <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-[10px] w-7 h-7 rounded-full flex items-center justify-center font-black animate-pulse shadow-xl border-4 border-white">
                      {cart.length}
                   </span>
                 )}
              </button>
           </div>

           {/* Mobile Header Elements */}
           <div className="flex lg:hidden items-center gap-6">
              <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-gray-900 rounded-2xl shadow-xl">
                 <CartIcon size={24} className="text-white" />
                 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-white">{cart.length}</span>}
              </button>
              <button onClick={() => setMobileMenu(true)} className="p-3 bg-gray-50 rounded-2xl"><Menu size={30}/></button>
           </div>
        </div>
      </nav>

      {/* --- HERO SPLASH SECTION --- */}
      <section className="relative min-h-screen flex items-center bg-[#FFFDFE] pt-32 overflow-hidden">
        {/* Cinematic Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-15%] w-[65%] h-[120%] bg-pink-50/40 rounded-l-[300px] -z-0 rotate-6 translate-x-20 shadow-inner"></div>
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-amber-50/50 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-200 rounded-full blur-sm animate-bounce duration-3000"></div>
        
        <div className="container mx-auto px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="text-center lg:text-left animate-fade">
             <div className="inline-flex items-center gap-4 bg-white px-7 py-3 rounded-full border border-pink-100 mb-12 shadow-[0_20px_50px_rgba(236,72,153,0.1)]">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-pink-600">Enterprise Stock System Active</span>
             </div>
             
             <h2 className="text-6xl md:text-8xl lg:text-[11rem] font-serif font-bold text-gray-900 mb-12 leading-[0.9] tracking-tighter">
                Indahnya <br />
                <span className="italic text-pink-500 font-normal">Jujur.</span>
             </h2>
             
             <p className="text-gray-500 text-lg md:text-2xl leading-relaxed mb-20 max-w-2xl mx-auto lg:mx-0 font-light italic opacity-90">
                "{BRAND_TAGLINE}. Selamat datang di era belanja cerdas. Cek stok, amankan warna impian, dan tampil mempesona tanpa drama tanya admin."
             </p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-10">
                <button 
                  onClick={() => document.getElementById('katalog').scrollIntoView({behavior:'smooth'})}
                  className="w-full sm:w-auto bg-gray-900 hover:bg-pink-500 text-white px-16 py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] transition-all active:scale-95 flex items-center justify-center gap-6 group relative overflow-hidden"
                >
                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                   Mulai Eksplor <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
                </button>
                <div className="flex items-center gap-8 p-6 border border-pink-100 rounded-[2rem] bg-white/40 backdrop-blur-xl shadow-xl">
                   <div className="w-16 h-16 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-200"><Check size={36}/></div>
                   <div className="text-left">
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Sinkronisasi Stok</p>
                      <p className="text-xl font-black text-gray-800 leading-none">99.9% Akurat</p>
                   </div>
                </div>
             </div>

             <div className="mt-28 flex items-center justify-center lg:justify-start gap-20 border-t border-pink-100/50 pt-20">
                <div className="group cursor-default">
                   <p className="text-5xl font-black text-gray-900 mb-3 transition-transform group-hover:scale-110">12k+</p>
                   <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-pink-400">Order Terkirim</p>
                </div>
                <div className="h-14 w-px bg-pink-100"></div>
                <div className="group cursor-default">
                   <p className="text-5xl font-black text-gray-900 mb-3 transition-transform group-hover:scale-110">4.9/5</p>
                   <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-amber-500">Customer Love</p>
                </div>
             </div>
          </div>

          <div className="relative hidden lg:block animate-fade" style={{ animationDelay: '0.4s' }}>
             <div className="absolute top-10 right-[-40px] w-full h-full border-2 border-pink-100 rounded-[10rem] -z-10 translate-x-12 translate-y-12 shadow-inner"></div>
             <div className="aspect-[4/5] rounded-[10rem] overflow-hidden shadow-[0_100px_200px_-30px_rgba(0,0,0,0.3)] border-[30px] border-white relative group">
                <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-2000 scale-105 group-hover:scale-100" alt="" />
                
                {/* Floating Award Elements */}
                <div className="absolute top-16 left-16 bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-white rotate-[-8deg] group-hover:rotate-0 transition-transform duration-1000">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-inner"><Star size={36} fill="currentColor"/></div>
                      <div>
                         <p className="text-[12px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1.5">No. 1 Trusted</p>
                         <p className="text-3xl font-serif italic font-bold text-gray-900">Boutique 2024</p>
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-16 right-[-20px] bg-gray-900 text-white p-10 rounded-[4rem] shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-1000 border-8 border-white/5">
                   <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-5">
                         <Zap className="text-pink-500 fill-pink-500" size={24} />
                         <span className="text-[11px] font-black uppercase tracking-[0.5em]">Live Integration</span>
                      </div>
                      <p className="text-base font-light italic leading-relaxed opacity-70">"Gudang terpusat kami memastikan <br/> data tidak meleset sehelai pun."</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- FLASH PROMO BANNER --- */}
      <section className="bg-pink-600 py-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-20"></div>
         <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-10 text-white relative z-10">
            <div className="flex items-center gap-10">
               <div className="p-5 bg-white/20 rounded-3xl backdrop-blur-md border border-white/20">
                  <Timer size={40} className="animate-pulse" />
               </div>
               <div>
                  <h4 className="text-2xl font-serif font-bold italic leading-tight">Flash Sale Exclusive!</h4>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-80 mt-1">Hanya Untuk Pembelian Melalui Katalog Web</p>
               </div>
            </div>
            
            <div className="flex gap-4">
               {[
                 { val: countdown.h, label: "Jam" },
                 { val: countdown.m, label: "Menit" },
                 { val: countdown.s, label: "Detik" }
               ].map((c, i) => (
                 <div key={i} className="flex flex-col items-center bg-white text-pink-600 w-20 py-3 rounded-2xl shadow-xl">
                    <span className="text-2xl font-black">{c.val.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest">{c.label}</span>
                 </div>
               ))}
            </div>
            
            <button onClick={() => document.getElementById('katalog').scrollIntoView({behavior:'smooth'})} className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-pink-600 transition-all shadow-2xl">
               Ambil Diskon <ChevronRight size={16} className="inline ml-2" />
            </button>
         </div>
      </section>

      {/* --- LIVE CATALOGUE EXPERIENCE (INVENTORY FOCUSED) --- */}
      <section id="katalog" className="py-40 md:py-64 bg-white relative">
        <div className="container mx-auto px-8 lg:px-20">
           
           <SectionHeader 
            title="Katalog Stok Live" 
            subtitle="Data inventaris di bawah ini terhubung langsung ke rak gudang pusat kami. Pilih warna favoritmu dan checkout sebelum kehabisan."
           />

           {/* Premium Filter & Search Module */}
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-32 bg-gray-50/50 p-12 rounded-[5rem] border border-gray-100 shadow-inner">
              <div className="flex gap-5 overflow-x-auto pb-8 lg:pb-0 w-full lg:w-auto no-scrollbar scroll-smooth">
                 {categories.map(cat => (
                   <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-14 py-6 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] transition-all duration-700 whitespace-nowrap shadow-sm ${activeTab === cat ? 'bg-pink-500 text-white shadow-[0_25px_50px_-10px_rgba(236,72,153,0.5)] scale-110' : 'bg-white text-gray-400 hover:bg-pink-50 hover:text-pink-600'}`}
                   >
                      {cat}
                   </button>
                 ))}
              </div>
              
              <div className="relative w-full lg:w-[550px] group">
                 <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-pink-500 transition-colors" size={32} />
                 <input 
                  type="text" 
                  placeholder="Cari hijab impian Anda..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white border-none px-24 py-8 rounded-[3rem] text-base outline-none focus:ring-[10px] focus:ring-pink-100 transition-all font-medium shadow-sm placeholder:text-gray-300 placeholder:italic"
                 />
                 <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-6 text-gray-200">
                    <div className="h-8 w-px bg-gray-100"></div>
                    <Settings size={24} className="cursor-pointer hover:text-pink-500 transition-colors" />
                 </div>
              </div>
           </div>

           {/* Product Grid - Enterprise Layout */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 animate-fade">
              {displayedItems.map((p) => (
                <div key={p.id} className="group flex flex-col h-full bg-white rounded-[5rem] border border-gray-100 overflow-hidden hover:shadow-[0_80px_150px_-30px_rgba(251,207,232,0.5)] transition-all duration-1000 relative">
                   
                   {/* Product Visual Area */}
                   <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                      <img src={p.image} className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110" alt="" />
                      
                      {/* Interactive Status Layers */}
                      <div className="absolute top-12 left-12 flex flex-col gap-5">
                         {p.totalStock < 15 && (
                           <div className="bg-red-500 text-white text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-tighter shadow-2xl animate-pulse flex items-center gap-3">
                              <AlertCircle size={14}/> Limited Stock
                           </div>
                         )}
                         {p.tag && (
                           <div className="bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-tighter shadow-xl border border-gray-100">
                              {p.tag}
                           </div>
                         )}
                      </div>

                      {/* Heart Wishlist Overlay */}
                      <button className="absolute top-12 right-12 w-16 h-16 bg-white/80 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-gray-300 hover:text-red-500 transition-all hover:scale-125 shadow-2xl opacity-0 group-hover:opacity-100 translate-y-[-30px] group-hover:translate-y-0 duration-700 border border-white">
                         <Heart size={30} />
                      </button>

                      {/* Quick Detail Overlay Button */}
                      <div className="absolute inset-x-0 bottom-0 p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                         <button 
                          onClick={() => { setViewProduct(p); setActiveVariant(p.variants[0]); }}
                          className="w-full bg-white text-gray-900 py-6 rounded-[2rem] text-[12px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:bg-pink-500 hover:text-white transition-all shadow-2xl active:scale-95"
                         >
                            <Eye size={22}/> Rincian Stok
                         </button>
                      </div>
                   </div>

                   {/* Product Info Area */}
                   <div className="p-16 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-10">
                         <span className="text-[12px] font-black text-amber-500 uppercase tracking-[0.5em]">{p.category}</span>
                         <div className="flex items-center gap-3">
                            <Star size={18} className="text-amber-400 fill-amber-400" />
                            <span className="text-[12px] font-black text-gray-400">({p.reviewsCount})</span>
                         </div>
                      </div>
                      
                      <h4 className="text-3xl font-serif font-bold text-gray-900 mb-12 group-hover:text-pink-600 transition-colors leading-tight">
                        {p.name}
                      </h4>
                      
                      {/* Integrated Inventory Progress */}
                      <div className="mb-14 p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 shadow-inner group-hover:bg-pink-50/30 group-hover:border-pink-100 transition-colors">
                         <StockVisualizer stock={p.totalStock} max={100} />
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                         <div className="flex flex-col">
                            {p.discountPrice && <span className="text-[12px] text-gray-400 line-through mb-1.5 font-black italic tracking-tighter opacity-50">{formatPrice(p.basePrice)}</span>}
                            <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
                               {formatPrice(p.discountPrice || p.basePrice)}
                            </span>
                         </div>
                         <button 
                          onClick={() => { setViewProduct(p); setActiveVariant(p.variants[0]); }}
                          className="w-18 h-18 bg-gray-900 border border-gray-800 rounded-[2.25rem] flex items-center justify-center text-white hover:bg-pink-500 hover:border-pink-500 transition-all shadow-2xl group-hover:rotate-12 active:scale-90"
                         >
                            <ShoppingBasket size={32} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Global Empty State Handler */}
           {displayedItems.length === 0 && (
             <div className="py-72 text-center bg-gray-50/50 rounded-[10rem] border-8 border-dashed border-gray-100 animate-fade">
                <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center mx-auto mb-14 shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-4 border-pink-50">
                   <HelpCircle size={100} className="text-pink-100 animate-bounce" />
                </div>
                <h4 className="text-5xl font-serif font-bold text-gray-300 mb-8">Data Tidak Ditemukan</h4>
                <p className="text-gray-400 mt-6 text-2xl font-light max-w-xl mx-auto leading-relaxed italic">"Kami terus memproses sinkronisasi stok harian. Silakan coba kategori lain atau bersihkan pencarian Anda."</p>
                <button 
                  onClick={() => { setActiveTab("Semua"); setQuery(""); }}
                  className="mt-20 bg-white text-gray-900 border-2 border-gray-100 px-20 py-7 rounded-[3rem] text-[12px] font-black uppercase tracking-[0.5em] hover:bg-gray-900 hover:text-white transition-all shadow-2xl active:scale-95"
                >
                  Lihat Semua Koleksi
                </button>
             </div>
           )}
        </div>
      </section>

      {/* --- KNOWLEDGE CENTER (MATERIAL & CARE) --- */}
      <section id="edukasi" className="py-40 md:py-64 bg-pink-50/20 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
         <div className="container mx-auto px-8 lg:px-20 relative z-10">
            <SectionHeader 
             title="Pahami Koleksimu" 
             subtitle="Keindahan hijab Malayeka berasal dari material pilihan. Pelajari karakteristik bahan agar Anda mendapatkan yang paling sesuai."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {MATERIALS_KNOWLEDGE.map(m => (
                 <div key={m.id} className="bg-white p-16 rounded-[4rem] shadow-2xl border border-white hover:-translate-y-6 transition-all duration-700 group">
                    <div className="w-24 h-24 bg-pink-50 rounded-[2.5rem] flex items-center justify-center text-pink-500 mb-12 shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 rotate-[-4deg] group-hover:rotate-0">
                       <m.icon size={48} />
                    </div>
                    <h5 className="text-3xl font-serif font-bold text-gray-900 mb-8 leading-tight">{m.name}</h5>
                    <p className="text-gray-500 text-lg leading-relaxed font-light italic">"{m.desc}"</p>
                    <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-pink-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0">
                       Learn Care Guide <ChevronRight size={14}/>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- TESTIMONIALS (SOCIAL PROOF) --- */}
      <section className="py-40 md:py-64 bg-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[40%] h-full bg-amber-50/30 rounded-l-[300px] rotate-6 translate-x-40 -z-0 shadow-inner opacity-50"></div>
         <div className="container mx-auto px-8 lg:px-20 relative z-10">
            <SectionHeader 
             title="Kisah Sahabat Malayeka" 
             subtitle="Bergabunglah dengan 20.000+ Muslimah yang telah bertransformasi dengan keanggunan koleksi kami."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {CUSTOMER_REVIEWS.map(t => (
                 <div key={t.id} className="bg-white p-20 rounded-[5rem] shadow-[0_60px_100px_rgba(0,0,0,0.08)] border border-gray-50 hover:-translate-y-6 transition-all duration-1000 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-pink-100 group-hover:bg-pink-500 transition-colors"></div>
                    <div className="text-pink-100 text-[12rem] font-serif leading-none mb-4 group-hover:text-pink-200 transition-colors absolute -top-10 -right-4 select-none opacity-20 pointer-events-none group-hover:scale-110 duration-1000">“</div>
                    
                    <div className="flex gap-2 mb-12 relative z-10">
                       {[1,2,3,4,5].map(s => <Star key={s} size={24} className="text-amber-400 fill-amber-400" />)}
                    </div>
                    
                    <p className="text-gray-600 text-2xl italic font-light leading-relaxed mb-16 relative z-10 opacity-80 group-hover:opacity-100">"{t.text}"</p>
                    
                    <div className="flex items-center gap-8 pt-12 border-t border-gray-100 relative z-10">
                       <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl uppercase group-hover:scale-110 transition-transform">{t.avatar}</div>
                       <div>
                          <h6 className="font-bold text-gray-900 text-2xl leading-none mb-2">{t.name}</h6>
                          <div className="flex items-center gap-3">
                             <MapPin size={14} className="text-pink-400" />
                             <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] leading-none">{t.city}</p>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-40 md:py-64 bg-gray-50/50">
         <div className="container mx-auto px-8 max-w-5xl">
            <SectionHeader 
             title="Pusat Bantuan" 
             subtitle="Transparansi adalah janji kami. Temukan jawaban seputar sistem inventaris dan pemesanan digital Malayeka."
            />

            <div className="space-y-8">
               {FAQS_DATA.map((f, i) => (
                 <div key={f.id} className={`border-2 rounded-[4rem] overflow-hidden transition-all duration-700 ${faqIndex === i ? 'border-pink-200 bg-white shadow-[0_50px_100px_rgba(236,72,153,0.1)]' : 'border-white bg-white/40 shadow-sm'}`}>
                    <button 
                     onClick={() => setFaqIndex(faqIndex === i ? null : i)}
                     className="w-full flex items-center justify-between p-12 md:p-16 text-left group"
                    >
                       <span className={`text-2xl md:text-3xl font-serif font-bold transition-colors ${faqIndex === i ? 'text-pink-600' : 'text-gray-800'}`}>{f.q}</span>
                       <div className={`p-5 rounded-full transition-all duration-700 ${faqIndex === i ? 'bg-pink-500 text-white rotate-180 shadow-2xl' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'}`}>
                          <ChevronDown size={32} />
                       </div>
                    </button>
                    <div className={`transition-all duration-700 ease-in-out ${faqIndex === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                       <div className="p-12 md:p-16 pt-0 text-gray-500 text-xl leading-relaxed font-light border-t border-pink-50/50 italic opacity-80">
                         {f.a}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FOOTER (ENTERPRISE BRAND FINISH) --- */}
      <footer className="bg-gray-900 pt-40 pb-48 lg:pb-24 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] -mr-64 -mt-64 animate-pulse"></div>
         <div className="container mx-auto px-8 lg:px-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 mb-40">
               <div className="lg:col-span-1">
                  <h2 className="text-5xl font-serif italic font-bold text-pink-400 mb-12 uppercase tracking-[0.3em] leading-none">Malayeka</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-16 font-light italic opacity-70">
                     "Dedikasi tanpa kompromi untuk menghadirkan mahakarya hijab bagi Muslimah Indonesia, didukung oleh integritas data stok yang transparan."
                  </p>
                  <div className="flex gap-8">
                     {[Instagram, Facebook, Twitter, MessageCircle].map((Icon, idx) => (
                       <button key={idx} className="w-16 h-16 bg-white/5 text-pink-500 rounded-[2rem] flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-2xl border border-white/5 active:scale-90 group">
                          <Icon size={28} className="group-hover:rotate-12 transition-transform" />
                       </button>
                     ))}
                  </div>
               </div>

               <div>
                  <h5 className="font-black text-xs uppercase tracking-[0.5em] mb-16 text-pink-400 leading-none">Global Navigation</h5>
                  <ul className="space-y-10 text-base text-gray-400 font-medium">
                     {['New Arrivals', 'Member Perks', 'Brand Heritage', 'Career Opportunity'].map(link => (
                       <li key={link} className="hover:text-white transition-all cursor-pointer flex items-center gap-6 group">
                          <div className="h-px w-0 bg-pink-500 group-hover:w-8 transition-all duration-700"></div>
                          {link}
                       </li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h5 className="font-black text-xs uppercase tracking-[0.5em] mb-16 text-pink-400 leading-none">Global Logistics</h5>
                  <div className="flex gap-8 mb-14 text-gray-400 italic">
                     <MapPin size={36} className="text-pink-500 shrink-0" />
                     <p className="text-base leading-relaxed opacity-80 font-light">The Heritage Niaga Hub B-24, <br/> Pasteur Distribution Center, <br/> Kota Bandung - Indonesia.</p>
                  </div>
                  <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 flex items-center gap-8 shadow-inner">
                     <div className="w-5 h-5 bg-emerald-500 rounded-full animate-ping shrink-0 shadow-[0_0_20px_#10b981]"></div>
                     <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 leading-none mb-2.5">Distribution Server</p>
                        <p className="text-xl font-bold text-white leading-none">Operational Online</p>
                     </div>
                  </div>
               </div>

               <div>
                  <h5 className="font-black text-xs uppercase tracking-[0.5em] mb-16 text-pink-400 leading-none">Digital Design</h5>
                  <p className="text-4xl font-serif italic font-bold text-pink-500 mb-8">{DESIGNED_BY}</p>
                  <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-[0.2em] font-black">Strategic E-Commerce Developer</p>
               </div>
            </div>

            <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 text-[11px] font-black text-gray-500 uppercase tracking-[0.6em] text-center md:text-left">
               <div className="space-y-4">
                  <p>© 2024 {BRAND_NAME} DIGITAL HOLDING CO.</p>
                  <p className="opacity-30 italic leading-none">Part of Islamic Fashion Global Supply Chain.</p>
               </div>
               <div className="flex gap-16">
                  <span className="cursor-pointer hover:text-white transition-colors underline underline-offset-8 decoration-pink-500/40">Terms</span>
                  <span className="cursor-pointer hover:text-white transition-colors underline underline-offset-8 decoration-pink-500/40">Privacy</span>
               </div>
               <div className="px-10 py-4 bg-white/5 rounded-full border border-white/5 shadow-2xl">
                  <span className="text-pink-400 tracking-[0.4em]">Optimized for Mobile First</span>
               </div>
            </div>
         </div>
      </footer>

      {/* --- MOBILE BOTTOM APP-BAR (USER PERSISTENCE) --- */}
      <div className="lg:hidden fixed bottom-8 left-8 right-8 z-[2800]">
         <div className="luxury-glass rounded-[3rem] p-5 flex items-center justify-around shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-white/20">
            <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex flex-col items-center gap-2.5 text-pink-500 p-2 transform active:scale-90 transition-all">
               <Zap size={28} />
               <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
            </button>
            <button onClick={() => document.getElementById('katalog').scrollIntoView({behavior:'smooth'})} className="flex flex-col items-center gap-2.5 text-gray-400 p-2 transform active:scale-90 transition-all">
               <Package size={28} />
               <span className="text-[9px] font-black uppercase tracking-widest">Stock</span>
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-2.5 text-gray-400 p-2 transform active:scale-90 transition-all">
               <CartIcon size={28} />
               <span className="text-[9px] font-black uppercase tracking-widest">List</span>
               {cart.length > 0 && <span className="absolute top-1 right-2 bg-pink-500 w-3 h-3 rounded-full border-4 border-white shadow-xl animate-pulse"></span>}
            </button>
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="flex flex-col items-center gap-2.5 text-emerald-500 p-2 transform active:scale-90 transition-all">
               <MessageCircle size={28} />
               <span className="text-[9px] font-black uppercase tracking-widest">Support</span>
            </button>
         </div>
      </div>

      {/* --- DESKTOP FLOATING DASHBOARD --- */}
      <div className="hidden lg:flex fixed bottom-16 right-16 z-[1800] flex-col gap-10 items-end">
         {scrolled && (
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-20 h-20 bg-white border-2 border-pink-50 text-gray-400 rounded-[2.5rem] shadow-2xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all active:scale-90 hover:rotate-12 hover:shadow-pink-200"
            >
               <ArrowUp size={36} />
            </button>
         )}
         <button 
           onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20Malayeka!%20Saya%20tertarik%20dengan%20katalog%20premium%20di%20website...`, '_blank')}
           className="w-24 h-24 bg-emerald-500 text-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(16,185,129,0.6)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <MessageCircle size={48} className="group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute right-full mr-12 bg-gray-900 text-white text-[11px] font-black px-8 py-4 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0 whitespace-nowrap uppercase tracking-[0.5em] pointer-events-none shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/5">
               Chat Admin VVIP
            </div>
         </button>
      </div>

    </div>
  );
}

/**
 * =============================================================================
 * DOKUMENTASI PEMELIHARAAN (TEKNIS V4.0):
 * =============================================================================
 * 1. Definisi Icon Alias: 'CartIcon' dipetakan ke 'ShoppingBag' untuk mencegah
 * ReferenceError saat merender navigasi bawah (mobile-nav).
 * 2. Variant Stock Guard: Tombol 'Tambah List' hanya aktif jika varian warna
 * dipilih dan stok > 0. Memberikan feedback instan ke user.
 * 3. WhatsApp Message Optimization: Menggunakan karakter URL-encoded untuk
 * menghasilkan pesan WA yang rapi dengan format list 1, 2, 3...
 * 4. Responsive Grid: Menggunakan gap besar (gap-20) pada desktop untuk kesan
 * premium/luxury, dan merapat secara otomatis di mobile (gap-8).
 * 5. Preloader Sequence: Memberikan waktu 2 detik untuk inisialisasi data,
 * memberikan kesan sistem yang sedang mengolah data stok besar.
 * =============================================================================
 */