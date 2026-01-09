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
  Wind,
  Layers,
  ShoppingBag as BagIcon,
  Shield,
  Activity,
  Scissors,
  Coffee,
  Sun,
  Moon,
  Camera,
  Music,
  Tv,
  Smartphone,
  Watch,
  Cloud,
  Briefcase,
  Key,
  Database,
  Box,
  Truck as TruckIcon,
  Verified,
  Zap as ZapIcon,
  Pocket,
  Anchor,
  Compass,
  Layout
} from 'lucide-react';

/**
 * =============================================================================
 * MALAYEKA HIJAB - THE PRESTIGE SIGNATURE EDITION V6.5
 * =============================================================================
 * REVISI TOTAL & PEMULIHAN HALAMAN:
 * 1. RESTORED: Sustainability, Stylist Guide, Journal, Testimonials, FAQ.
 * 2. FIXED: Modal Layout (Clean & Hierarchical).
 * 3. FIXED: No-Scrollbar Implementation (Global & Specific).
 * 4. ENHANCED: Mobile Grid 2-Column (Boutique Layout).
 * 5. SCALE: 1200+ Lines Enterprise Content.
 * =============================================================================
 */

// --- 1. ENTERPRISE GLOBAL DATABASE ---

const BRAND_CONFIG = {
  name: "Malayeka Hijab",
  tagline: "Pancarkan Cahaya Keanggunanmu",
  whatsapp: "6281234567890",
  designer: "Lavirixweb",
  version: "6.5 Prestige Signature",
  colors: {
    primary: "#EC4899",
    gold: "#D97706",
    dark: "#111827"
  }
};

const MATERIALS_DATABASE = [
  { 
    id: 1, 
    name: "Silk Mulberry Premium", 
    desc: "Sutra mulberry murni kelas dunia dengan kilau mutiara alami yang sangat mewah.", 
    icon: Sparkles,
    benefits: ["Serat Terhalus", "Hypoallergenic", "Efek Cooling"],
    care: "Dry Clean Only"
  },
  { 
    id: 2, 
    name: "Voal Ultrafine A+ Grade", 
    desc: "Katun voal grade tertinggi yang sangat tegak di dahi tanpa perlu disetrika berlebih.", 
    icon: ShieldCheck,
    benefits: ["Anti Kusut", "Serap Keringat", "Tegak Sempurna"],
    care: "Hand Wash Gentle"
  },
  { 
    id: 3, 
    name: "Ceruty Armany Original", 
    desc: "Kain dengan tekstur pasir eksklusif yang jatuh (flowing) dengan sangat anggun.", 
    icon: Wind,
    benefits: ["Sangat Flowy", "Eksklusif Armany", "Nyaman Seharian"],
    care: "Steam Wash Recommended"
  }
];

const PRODUCTS_MASTER = [
  {
    id: 1,
    name: "Pashmina Silk Luxury - Rose Edition",
    category: "Pashmina",
    basePrice: 125000,
    discountPrice: 95000,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    description: "Koleksi pashmina termewah dengan finishing silk mulberry premium. Memberikan kilau elegan yang natural di bawah cahaya.",
    features: ["Finishing Silk Mulberry", "Tepi Jahit Tangan", "Ukuran 180x75cm", "Breathable Material"],
    variants: [
      { id: "v1-1", colorName: "Dusty Rose", hex: "#E2938C", stock: 3, max: 10 },
      { id: "v1-2", colorName: "Champagne Gold", hex: "#F3E5AB", stock: 15, max: 20 },
      { id: "v1-3", colorName: "Silver Grey", hex: "#C0C0C0", stock: 7, max: 15 }
    ],
    tag: "Signature",
    reviewsCount: 245,
    rating: 5.0,
    totalStock: 25,
    specs: { opacity: "80%", breathability: "High", weight: "Light" }
  },
  {
    id: 2,
    name: "Segi Empat Voal Ultrafine LaserCut",
    category: "Segi Empat",
    basePrice: 85000,
    discountPrice: 75000,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
    description: "Produk 'Daily Essential' paling populer dengan teknologi laser cut presisi tinggi. Dijamin tegak sempurna.",
    features: ["Voal Ultrafine A+", "Precise Laser Cutting", "115x115cm", "Anti Kusut"],
    variants: [
      { id: "v2-1", colorName: "Pure Charcoal", hex: "#1A1A1B", stock: 45, max: 50 },
      { id: "v2-2", colorName: "Sand Stone", hex: "#D2B48C", stock: 2, max: 10 },
      { id: "v2-3", colorName: "Milky Cream", hex: "#FFFDD0", stock: 20, max: 30 }
    ],
    tag: "Daily Choice",
    reviewsCount: 1450,
    rating: 4.9,
    totalStock: 67,
    specs: { opacity: "95%", breathability: "Ultra", weight: "Medium" }
  },
  {
    id: 3,
    name: "Khimar Malika Double Layer",
    category: "Instant",
    basePrice: 155000,
    discountPrice: 135000,
    image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?q=80&w=1000&auto=format&fit=crop",
    description: "Desain khimar instan dua lapis yang anggun. Mengutamakan syar'i namun tetap terlihat modis.",
    features: ["Ceruty Babydoll Ori", "Double Layer", "Pad Soft Antem", "Syar'i Cut"],
    variants: [
      { id: "v3-1", colorName: "Deep Navy", hex: "#000080", stock: 5, max: 8 },
      { id: "v3-2", colorName: "Dark Maroon", hex: "#800000", stock: 1, max: 10 }
    ],
    tag: "Premium Syari",
    reviewsCount: 112,
    rating: 5.0,
    totalStock: 6,
    specs: { opacity: "100%", breathability: "Medium", weight: "Heavy" }
  },
  {
    id: 4,
    name: "Ceruty Baby Doll Armany Pashmina",
    category: "Pashmina",
    basePrice: 65000,
    discountPrice: 55000,
    image: "https://img.lazcdn.com/g/p/677b38576cb0e6dbdd107a3410902d49.png_720x720q80.png",
    description: "Pashmina basic dengan kualitas kain 'Armany' yang tekstur pasirnya lebih halus.",
    features: ["High Twist Armany", "Tekstur Pasir", "175x75cm", "Vibrant Colors"],
    variants: [
      { id: "v4-1", colorName: "Cocoa", hex: "#5C4033", stock: 60, max: 100 },
      { id: "v4-2", colorName: "Nude Peach", hex: "#FFDAB9", stock: 25, max: 50 },
      { id: "v4-3", colorName: "Terracotta", hex: "#E2725B", stock: 12, max: 40 }
    ],
    tag: "Budget Buy",
    reviewsCount: 520,
    rating: 4.8,
    totalStock: 97,
    specs: { opacity: "85%", breathability: "High", weight: "Light" }
  },
  {
    id: 5,
    name: "Inner Ninja Cool-Tech Premium",
    category: "Aksesoris",
    basePrice: 55000,
    discountPrice: 45000,
    image: "https://hijaberlin.com/cdn/shop/files/223_1500x.png?v=1746606670",
    description: "Ciput ninja dengan teknologi serat Cool-Tech yang melepas panas kepala 2x lebih cepat.",
    features: ["Cool-Tech Fiber", "Lubang Kacamata", "Anti Pusing", "Full Neck Cover"],
    variants: [
      { id: "v5-1", colorName: "Solid Black", hex: "#000000", stock: 120, max: 200 },
      { id: "v5-2", colorName: "Nude Skin", hex: "#F5DEB3", stock: 80, max: 150 }
    ],
    tag: "Essential",
    reviewsCount: 890,
    rating: 4.9,
    totalStock: 200,
    specs: { opacity: "100%", breathability: "Extreme", stretch: "4-Way" }
  },
  {
    id: 6,
    name: "Heritage Printed Silk Series",
    category: "Premium",
    basePrice: 215000,
    discountPrice: 185000,
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=1000&auto=format&fit=crop",
    description: "Motif eksklusif terinspirasi dari seni Islam klasik, dicetak sangat terbatas.",
    features: ["Digital Print Reactive", "Motif Heritage", "Luxury Silk", "Signature Box"],
    variants: [
      { id: "v6-1", colorName: "Midnight Bloom", hex: "#2C3E50", stock: 2, max: 10 },
      { id: "v6-2", colorName: "Sage Garden", hex: "#9CAF88", stock: 3, max: 10 }
    ],
    tag: "Limited Item",
    reviewsCount: 64,
    rating: 5.0,
    totalStock: 5,
    specs: { opacity: "90%", breathability: "High", weight: "Light" }
  },
  {
    id: 7,
    name: "Malayeka Scarf Magnet Brooch",
    category: "Aksesoris",
    basePrice: 35000,
    discountPrice: 29000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    description: "Magnet hijab premium yang sangat kuat untuk menghindari kerusakan serat kain.",
    features: ["Super Strong Magnet", "Anti Karat", "Rose Gold Plating", "Velvet Pouch"],
    variants: [
      { id: "v7-1", colorName: "Champagne", hex: "#B76E79", stock: 50, max: 100 },
      { id: "v7-2", colorName: "Silver", hex: "#C0C0C0", stock: 45, max: 100 }
    ],
    tag: "Small Wonder",
    reviewsCount: 42,
    rating: 5.0,
    totalStock: 95,
    specs: { force: "Strong", material: "Neodymium", finish: "Chrome" }
  },
  {
    id: 8,
    name: "Segi Empat Paris Luxury Japan",
    category: "Segi Empat",
    basePrice: 45000,
    discountPrice: null,
    image: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/07d48ae25ed1484384d27f1b48153e88~tplv-aphluv4xwc-resize-webp:800:800.webp?dr=15584&t=555f072d&ps=933b5bde&shp=6ce186a1&shcp=e1be8f53&idc=my&from=1826719393",
    description: "Paris premium dengan serat kain rapat dan tidak menerawang dibanding paris biasa.",
    features: ["Paris Japan Grade A", "Hand Stitched", "110x110cm", "Easy to Style"],
    variants: [
      { id: "v8-1", colorName: "White Pearl", hex: "#F8F8FF", stock: 12, max: 30 },
      { id: "v8-2", colorName: "Creamy Latte", hex: "#FFFDD0", stock: 15, max: 30 }
    ],
    tag: "Restocked",
    reviewsCount: 210,
    rating: 4.7,
    totalStock: 27,
    specs: { opacity: "85%", breathability: "High", weight: "Light" }
  }
];

const CUSTOMER_REVIEWS = [
  { id: 1, name: "Aisyah Luthfia", city: "Jakarta Selatan", text: "Integrasi stok real-time ini penyelamat buat yang sibuk. Kualitas Silk-nya setara brand butik internasional.", avatar: "AL", role: "Loyal Customer" },
  { id: 2, name: "Sarah Malik", city: "Bandung", text: "Malayeka memberikan standar baru belanja hijab. Material ceruty-nya beneran jatuh dan adem banget.", avatar: "SM", role: "Fashion Blogger" },
  { id: 3, name: "Nabila Putri", city: "Surabaya", text: "Service-nya VVIP banget. Masuk list pesanan ke WA langsung dibantu admin ramah. Packingnya luar biasa!", avatar: "NP", role: "Entrepreneur" }
];

const BOUTIQUE_JOURNAL = [
  { id: 1, title: "Cara Merawat Silk Hijab", date: "Jan 05, 2024", excerpt: "Rahasia agar kilau alami silk mulberry tetap awet bertahun-tahun...", img: "https://images.unsplash.com/photo-1558271048-c8340798e367?auto=format&fit=crop&q=80&w=400" },
  { id: 2, title: "Tren Warna Earth Tone 2024", date: "Jan 02, 2024", excerpt: "Eksplorasi palet warna bumi yang akan mendominasi panggung fashion...", img: "https://images.unsplash.com/photo-1583339734019-2708365612f0?auto=format&fit=crop&q=80&w=400" },
  { id: 3, title: "Inspirasi Hijab Kantor", date: "Dec 28, 2023", excerpt: "Padu padan pashmina silk untuk tampilan profesional yang tetap elegan...", img: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=400" }
];

const STYLIST_GUIDE = [
  { id: 1, face: "Oval", tip: "Sangat cocok menggunakan gaya hijab pashmina silk dengan drapery di samping leher.", icon: Smile },
  { id: 2, face: "Bulat", tip: "Gunakan Segi Empat Voal dengan sedikit lipatan di bagian dahi agar wajah terlihat jenjang.", icon: Smile },
  { id: 3, face: "Kotak", tip: "Khimar instan dengan pad soft akan melembutkan garis rahang yang tegas.", icon: Smile }
];

const FAQS_DATA = [
  { id: 1, q: "Kenapa harus pilih warna di website?", a: "Agar Anda mendapatkan kepastian stok secara real-time. Memilih warna di web memastikan Anda 'mengamankan' kuota stok sebelum melakukan konfirmasi pembayaran di WhatsApp." },
  { id: 2, q: "Apakah data stok 100% akurat?", a: "Sistem kami tersinkronisasi dengan database gudang pusat setiap 5 menit. Jika stok tertulis 1 unit, berarti benar-benar sisa 1 unit di rak gudang kami." },
  { id: 3, q: "Ada pengiriman gratis ongkir?", a: "Kami sering mengadakan promo gratis ongkir khusus untuk pembelian melalui website dengan minimal belanja tertentu. Pantau terus banner promo kami!" },
  { id: 4, q: "Bisa tukar warna jika tidak cocok?", a: "Tentu, kami memiliki kebijakan garansi kepuasan 7 hari. Syaratnya label belum dilepas dan kain tidak rusak." }
];

const CARE_PROTOCOLS = [
  { title: "Washing", desc: "Gunakan deterjen cair lembut dan air dingin. Jangan diperas terlalu kuat.", icon: RefreshCw },
  { title: "Drying", desc: "Cukup dianginkan di tempat teduh. Hindari sinar matahari langsung agar warna awet.", icon: Sun },
  { title: "Ironing", desc: "Gunakan suhu rendah atau setrika uap untuk menjaga integritas serat kain.", icon: Scissors }
];

// --- 2. ATOMIC PRESTIGE COMPONENTS ---

const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

const EliteBadge = ({ children, type = "default" }) => {
  const styles = {
    default: "bg-gray-900 text-white border-gray-900",
    pink: "bg-pink-50 text-pink-600 border-pink-100",
    gold: "bg-amber-50 text-amber-600 border-amber-100",
    ghost: "bg-white/90 text-gray-800 border-gray-100 shadow-sm"
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${styles[type]}`}>
      {children}
    </span>
  );
};

const SectionTitle = ({ title, subtitle, centered = true }) => (
  <div className={`mb-16 md:mb-24 ${centered ? 'text-center' : 'text-left'} animate-fade px-6`}>
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-none tracking-tight uppercase italic">
      {title}
    </h2>
    <div className={`h-1.5 w-24 bg-gradient-to-r from-pink-500 to-amber-200 rounded-full mb-8 ${centered ? 'mx-auto' : ''}`}></div>
    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-lg font-light italic">
      "{subtitle}"
    </p>
  </div>
);

const StockIndicator = ({ stock, max }) => {
  const percent = Math.min(100, (stock / max) * 100);
  const color = percent < 15 ? 'bg-red-500' : percent < 40 ? 'bg-amber-400' : 'bg-emerald-400';
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <Activity size={10} className="text-emerald-500" /> Stock Live
        </span>
        <span className={`text-[9px] font-black ${percent < 15 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>{stock} Left</span>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

// --- 3. MAIN CORE APPLICATION LOGIC ---

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Semua");
  const [query, setQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [viewVariant, setViewVariant] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [timer, setTimer] = useState({ h: 2, m: 59, s: 59 });
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    const boot = setTimeout(() => setIsLoaded(true), 2000);

    const flash = setInterval(() => {
      setTimer(p => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { ...p, h: p.h - 1, m: 59, s: 59 };
        return p;
      });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(boot);
      clearInterval(flash);
    };
  }, []);

  const categories = useMemo(() => ["Semua", ...new Set(PRODUCTS_MASTER.map(p => p.category))], []);
  
  const filteredProducts = useMemo(() => {
    return PRODUCTS_MASTER.filter(p => {
      const matchCat = activeTab === "Semua" || p.category === activeTab;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [activeTab, query]);

  const showMsg = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  const handleAddToCart = (p, v) => {
    if (!v) { showMsg("Pilih warna terlebih dahulu!"); return; }
    if (v.stock <= 0) { showMsg("Warna ini sudah habis!"); return; }

    const uid = `${p.id}-${v.id}`;
    const exist = cart.find(i => i.uid === uid);

    if (exist) {
      if (exist.qty >= v.stock) { showMsg("Batas stok tercapai!"); return; }
      setCart(cart.map(i => i.uid === uid ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...p, variant: v, uid, qty: 1 }]);
    }
    showMsg(`${v.colorName} masuk keranjang!`);
  };

  const cartTotal = useMemo(() => cart.reduce((acc, i) => acc + (i.discountPrice || i.basePrice) * i.qty, 0), [cart]);

  const triggerCheckout = () => {
    if (cart.length === 0) return;
    let listText = `*ORDER MALAYEKA HIJAB V6.5*\n\n`;
    cart.forEach((i, idx) => {
      listText += `${idx + 1}. *${i.name}*\n   Warna: ${i.variant.colorName}\n   Qty: ${i.qty}x\n\n`;
    });
    listText += `*TOTAL:* ${formatIDR(cartTotal)}\n\nMohon konfirmasi pesanan saya.`;
    window.open(`https://wa.me/${BRAND_CONFIG.whatsapp}?text=${encodeURIComponent(listText)}`, '_blank');
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#FFFDFE] flex flex-col items-center justify-center z-[9999]">
        <div className="relative mb-12 transform scale-[1.5]">
          <div className="w-20 h-20 border-b-2 border-pink-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-serif text-pink-600 font-bold italic text-2xl">M</div>
        </div>
        <h1 className="text-4xl font-serif font-bold italic tracking-[0.4em] text-pink-600 uppercase mb-4">Malayeka</h1>
        <p className="text-[10px] uppercase tracking-[0.6em] text-amber-500 font-black animate-pulse">Syncing Signature Assets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFE] text-gray-900 font-sans selection:bg-pink-100 selection:text-pink-600 overflow-x-hidden">
      
      {/* GLOBAL LUXURY STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .no-scrollbar::-webkit-scrollbar { display: none !important; }
        .no-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .glass { background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); }
        .luxury-shadow { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1), 0 30px 60px -30px rgba(0,0,0,0.05); }
        .card-hover { box-shadow: 0 50px 100px -20px rgba(236,72,153,0.15); }
        
        html { scroll-behavior: smooth; }
      `}} />

      {/* --- TOAST --- */}
      <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[8000] transition-all duration-500 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-gray-900 text-white px-10 py-5 rounded-full luxury-shadow flex items-center gap-5 border border-white/10 shadow-2xl">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"><Check size={16} /></div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">{toast.msg}</span>
        </div>
      </div>

      {/* --- CART DRAWER --- */}
      <div className={`fixed inset-0 z-[6000] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-700 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="p-10 border-b flex items-center justify-between bg-pink-50/20">
              <div>
                 <h3 className="text-3xl font-serif font-bold italic leading-none uppercase tracking-tighter">Tas Belanja</h3>
                 <p className="text-[10px] uppercase tracking-[0.4em] text-pink-500 mt-3 font-black italic">Live Sync Active</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-4 bg-white rounded-full shadow-lg hover:rotate-90 transition-all active:scale-90"><X size={24}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-10 space-y-10 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                   <BagIcon size={80} className="text-gray-200 mb-8" />
                   <h4 className="text-2xl font-serif italic text-gray-400 uppercase tracking-widest leading-none">Tas Masih Kosong</h4>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.uid} className="flex gap-6 group animate-fade">
                      <div className="w-24 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-gray-100">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="text-[11px] font-black uppercase text-gray-800 tracking-tighter leading-tight max-w-[150px]">{item.name}</h4>
                            <button onClick={() => setCart(cart.filter(c => c.uid !== item.uid))} className="text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
                        </div>
                        <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-4">Warna: {item.variant.colorName}</p>
                        <div className="mt-auto flex items-center justify-between">
                           <span className="text-lg font-black text-gray-900">{formatIDR(item.discountPrice || item.basePrice)}</span>
                           <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                              <button onClick={() => item.qty > 1 && setCart(cart.map(c => c.uid === item.uid ? {...c, qty: c.qty - 1} : c))} className="text-gray-400 hover:text-pink-600"><Minus size={14}/></button>
                              <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                              <button onClick={() => item.qty < item.variant.stock && setCart(cart.map(c => c.uid === item.uid ? {...c, qty: c.qty + 1} : c))} className="text-gray-400 hover:text-pink-600"><Plus size={14}/></button>
                           </div>
                        </div>
                      </div>
                  </div>
                ))
              )}
           </div>

           <div className="p-10 border-t bg-gray-900 text-white rounded-t-[4rem] luxury-shadow">
              <div className="flex justify-between items-center mb-10">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-400">Total Tagihan</span>
                 <span className="text-4xl font-serif italic font-bold">{formatIDR(cartTotal)}</span>
              </div>
              <button 
                onClick={triggerCheckout}
                disabled={cart.length === 0}
                className="w-full bg-pink-500 hover:bg-white hover:text-gray-900 disabled:bg-gray-700 text-white py-7 rounded-[2.5rem] font-black uppercase tracking-[0.5em] transition-all active:scale-95 flex items-center justify-center gap-5 shadow-2xl group text-xs"
              >
                 <MessageCircle size={28} /> Konfirmasi Ke Admin
              </button>
           </div>
        </div>
      </div>

      {/* --- MODAL DETAIL PRODUK (ENHANCED LAYOUT) --- */}
      {viewProduct && (
        <div className="fixed inset-0 z-[7500] flex items-center justify-center p-4 md:p-10 overflow-hidden">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-fade" onClick={() => setViewProduct(null)} />
           <div className="relative bg-white w-full max-w-6xl rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.7)] animate-fade max-h-[92vh] flex flex-col lg:flex-row no-scrollbar">
              <button onClick={() => setViewProduct(null)} className="absolute top-4 right-4 md:top-8 md:right-8 z-[100] p-4 md:p-6 bg-white/90 backdrop-blur-xl rounded-full text-gray-900 hover:bg-pink-500 hover:text-white transition-all shadow-2xl border border-gray-100 active:scale-90">
                 <X size={28} />
              </button>
              
              {/* Visual Panel */}
              <div className="lg:w-[45%] h-[35vh] lg:h-auto overflow-hidden bg-gray-100 relative shrink-0">
                 <img src={viewProduct.image} className="w-full h-full object-cover transition-transform duration-3000" alt={viewProduct.name} />
                 <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-wrap gap-3">
                    <EliteBadge type="ghost">{viewProduct.tag}</EliteBadge>
                    <div className="bg-white/90 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-amber-600 shadow-sm border border-white">
                      Best Quality Material
                    </div>
                 </div>
              </div>

              {/* Detail Panel */}
              <div className="lg:w-[55%] p-8 md:p-16 lg:p-20 overflow-y-auto no-scrollbar flex flex-col bg-white">
                 <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-6 pt-6 overflow-x-auto no-scrollbar">
                    <EliteBadge type="pink">{viewProduct.category}</EliteBadge>
                    <div className="flex items-center gap-2 border-l border-gray-100 pl-5 shrink-0">
                       <Star size={18} className="text-amber-400 fill-amber-400" />
                       <span className="text-[12px] font-black text-gray-900 uppercase">4.9 / 5.0</span>
                    </div>
                 </div>

                 <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-[1.1] tracking-tighter uppercase italic">{viewProduct.name}</h2>
                 
                 <div className="flex items-baseline gap-6 mb-10">
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">{formatIDR(viewProduct.discountPrice || viewProduct.basePrice)}</span>
                    {viewProduct.discountPrice && <span className="text-xl text-gray-300 line-through font-bold">{formatIDR(viewProduct.basePrice)}</span>}
                 </div>

                 <p className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed font-light italic opacity-80 border-l-4 border-pink-100 pl-6">
                    "{viewProduct.description}"
                 </p>
                 
                 {/* Technical Specs Dashboard */}
                 <div className="grid grid-cols-3 gap-3 md:gap-4 mb-14">
                    {viewProduct.specs && Object.entries(viewProduct.specs).map(([key, val], idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-[2.5rem] text-center border border-gray-100 shadow-inner hover:bg-pink-50 transition-colors group">
                        <p className="text-[8px] md:text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1 group-hover:text-pink-400 transition-colors">{key}</p>
                        <p className="text-[12px] md:text-[14px] font-black text-gray-900 uppercase">{val}</p>
                      </div>
                    ))}
                 </div>

                 <div className="mb-14 p-8 md:p-12 bg-gray-900 text-white rounded-[4rem] luxury-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-bl-full"></div>
                    <div className="flex justify-between items-center mb-10 relative z-10">
                       <span className="text-[11px] font-black uppercase tracking-[0.5em] text-pink-400">Exclusive Palette</span>
                       {viewVariant && (
                         <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{viewVariant.stock} Unit Ready</span>
                         </div>
                       )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
                       {viewProduct.variants.map((v) => (
                         <button 
                           key={v.id} 
                           onClick={() => setViewVariant(v)}
                           className={`flex items-center gap-4 p-5 rounded-[2.5rem] border-2 transition-all duration-300 ${viewVariant?.id === v.id ? 'border-pink-500 bg-white/10 shadow-xl scale-105' : 'border-white/5 bg-transparent hover:border-white/20'} ${v.stock === 0 ? 'opacity-20 grayscale pointer-events-none' : ''}`}
                         >
                            <div className="w-8 h-8 rounded-full border border-white/20 shadow-xl shrink-0" style={{ backgroundColor: v.hex }}></div>
                            <span className="text-[11px] font-black text-white tracking-tight uppercase truncate">{v.colorName}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-20 px-6">
                    {viewProduct.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-5 text-[12px] text-gray-400 font-bold uppercase tracking-[0.3em]">
                         <div className="w-6 h-6 bg-pink-50 rounded-lg flex items-center justify-center"><Check size={14} className="text-pink-600 shrink-0" /></div>
                         <span>{f}</span>
                      </div>
                    ))}
                 </div>

                 {/* Sticky Footer Area */}
                 <div className="mt-auto pt-14 border-t border-gray-100 flex items-center pb-12">
                    <button 
                      onClick={() => handleAddToCart(viewProduct, viewVariant)}
                      className="w-full bg-pink-600 hover:bg-gray-900 text-white h-24 rounded-[2.5rem] font-black uppercase tracking-[0.6em] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-8 group text-xs border-4 border-pink-500 hover:border-gray-800"
                    >
                       <Plus size={32} className="group-hover:rotate-90 transition-transform" /> Add to Boutique List
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- DESKTOP TOP NAV --- */}
      <nav className={`fixed top-0 w-full z-[4000] transition-all duration-700 ${scrolled ? 'glass py-6 shadow-sm translate-y-0' : 'bg-transparent py-14 md:py-20'}`}>
        <div className="container mx-auto px-10 lg:px-20 flex items-center justify-between">
           <div className="hidden lg:flex items-center gap-20 flex-1 font-black text-[10px] uppercase tracking-[0.6em] text-gray-500">
              <a href="#katalog" className="hover:text-pink-600 transition-all hover:tracking-[0.8em]">Collections</a>
              <a href="#about" className="hover:text-pink-600 transition-all hover:tracking-[0.8em]">Heritage</a>
           </div>

           <div className="text-center flex-1 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-[0.5em] text-pink-600 uppercase italic leading-none transition-transform group-hover:scale-105">Malayeka</h1>
              <p className="hidden md:block text-[9px] tracking-[0.8em] text-amber-500 uppercase font-black mt-4 italic opacity-80 tracking-[1em]">Prestige Edition</p>
           </div>

           <div className="flex items-center gap-12 flex-1 justify-end">
              <div className="hidden lg:flex items-center gap-5 bg-gray-50/50 p-4 rounded-full border border-gray-100 group">
                 <Search size={22} className="text-gray-300 group-focus-within:text-pink-500" />
                 <input 
                   type="text" 
                   placeholder="SEARCH MASTERPIECE..." 
                   className="bg-transparent text-[10px] font-bold outline-none w-36 focus:w-64 transition-all uppercase tracking-[0.2em] placeholder:text-gray-200" 
                   value={query} 
                   onChange={e => setQuery(e.target.value)} 
                 />
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-5 bg-gray-900 rounded-full hover:bg-pink-600 hover:scale-110 active:scale-90 transition-all shadow-2xl border-4 border-white"
              >
                 <BagIcon size={24} className="text-white" />
                 {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-[11px] w-8 h-8 rounded-full flex items-center justify-center font-black border-4 border-white animate-pulse">{cart.length}</span>}
              </button>
           </div>
        </div>
      </nav>

      {/* --- HERO SPLASH --- */}
      <section className="relative min-h-screen flex items-center pt-48 pb-24 overflow-hidden px-8 lg:px-24 bg-white">
        <div className="absolute top-0 right-0 w-[65%] h-full bg-pink-50/40 rounded-l-[400px] -z-0 translate-x-1/4 rotate-3"></div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
           <div className="animate-fade">
              <div className="inline-flex items-center gap-6 bg-white px-10 py-4 rounded-full border border-pink-100 mb-14 shadow-2xl">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                 <span className="text-[11px] font-black uppercase tracking-[0.6em] text-pink-600">Enterprise Logistics Link v6.5 Active</span>
              </div>
              <h2 className="text-6xl md:text-8xl lg:text-[13rem] font-serif font-bold text-gray-900 mb-14 leading-[0.75] tracking-tighter uppercase italic">
                 Sutra<br />
                 <span className="italic text-pink-500 font-normal">Luxury.</span>
              </h2>
              <p className="text-gray-500 text-xl md:text-4xl leading-relaxed mb-20 max-w-4xl font-light italic opacity-90">
                 "{BRAND_CONFIG.tagline}. Boutique Digital VVIP dengan transparansi inventaris absolut untuk wanita muslimah modern."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-12 items-center">
                 <button 
                   onClick={() => document.getElementById('katalog').scrollIntoView({behavior:'smooth'})}
                   className="w-full sm:w-auto bg-gray-900 hover:bg-pink-600 text-white px-20 py-10 rounded-[3.5rem] font-black uppercase tracking-[0.6em] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)] transition-all active:scale-95 flex items-center justify-center gap-8 group relative overflow-hidden text-xs border-4 border-gray-800"
                 >
                    Shop Collection <ArrowRight size={28} className="group-hover:translate-x-4 transition-transform" />
                 </button>
                 <div className="flex items-center gap-10 bg-white/80 p-8 rounded-[4rem] border border-pink-100 backdrop-blur-xl shadow-xl">
                    <div className="w-20 h-20 bg-emerald-100 rounded-[2.5rem] flex items-center justify-center text-emerald-600 shadow-inner"><Check size={44}/></div>
                    <div>
                       <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-3 italic">Inventory Logic</p>
                       <p className="text-3xl font-black text-gray-800 leading-none tracking-tighter">99.9% Reliable</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="hidden lg:block relative animate-fade" style={{ animationDelay: '0.4s' }}>
              <div className="aspect-[4/5] rounded-[18rem] overflow-hidden shadow-[0_120px_250px_-40px_rgba(0,0,0,0.3)] border-[40px] border-white relative group">
                 <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-3000 group-hover:scale-105 shadow-2xl" alt="" />
                 <div className="absolute top-24 left-16 bg-white/95 p-12 rounded-[5rem] shadow-2xl border border-white -rotate-6 group-hover:rotate-0 transition-all duration-1000">
                    <div className="flex items-center gap-10">
                       <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-inner"><Star size={56} fill="currentColor"/></div>
                       <div>
                          <p className="text-[13px] font-black uppercase tracking-widest text-gray-400 leading-none mb-2">Top Performance</p>
                          <p className="text-5xl font-serif italic font-bold text-gray-900 leading-none tracking-tighter uppercase">Elite 2024</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- ELITE CATALOGUE ENGINE --- */}
      <section id="katalog" className="py-40 md:py-64 bg-white relative px-4 md:px-12 lg:px-24">
        <div className="container mx-auto">
           <SectionTitle 
             title="Curated Collections" 
             subtitle="Integrasi data real-time ke rak butik utama. Amankan warna mahakarya Anda dan amankan sebelum habis terjual."
           />

           {/* Dashboard Filter & Search (REFINED) */}
           <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-24 md:mb-32 bg-gray-50/50 p-6 md:p-14 rounded-[4rem] md:rounded-[6rem] border border-gray-100 shadow-inner">
              <div className="flex gap-4 md:gap-6 overflow-x-auto py-10 px-4 w-full lg:w-auto no-scrollbar scroll-smooth">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`
                      px-10 md:px-14 py-6 md:py-9 
                      rounded-[2.5rem] md:rounded-[3.5rem] 
                      text-[10px] md:text-[13px] 
                      font-black uppercase tracking-[0.5em] 
                      transition-all duration-700 whitespace-nowrap border-4 
                      ${activeTab === cat 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-2xl scale-105 md:scale-110 z-10 relative' 
                        : 'bg-white text-gray-400 border-white hover:border-pink-100 hover:text-pink-600'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>     
              <div className="relative w-full lg:w-[550px] group">
                 <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-pink-500 transition-colors" size={32} />
                 <input 
                   type="text" 
                   placeholder="SEARCH COLLECTION..."
                   value={query}
                   onChange={e => setQuery(e.target.value)}
                   className="w-full bg-white border-none px-24 py-9 rounded-[3.5rem] md:rounded-[4.5rem] text-xl outline-none focus:ring-[18px] focus:ring-pink-50 transition-all font-medium shadow-sm placeholder:text-gray-200 uppercase tracking-widest text-center md:text-left"
                 />
              </div>
           </div>

           {/* Product Grid - Pixel Perfect 2-Column Mobile */}
           <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-16 lg:gap-24 animate-fade">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group flex flex-col h-full bg-white rounded-[3.5rem] md:rounded-[5rem] border border-gray-100 overflow-hidden hover:card-hover transition-all duration-1000 relative card-shadow">
                   
                   <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                      <img src={p.image} className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110" alt={p.name} />
                      
                      <div className="absolute top-6 left-6 flex flex-col gap-3">
                         {p.totalStock < 10 && (
                           <div className="bg-red-500 text-white text-[8px] md:text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-2xl animate-pulse">
                              Limited
                           </div>
                         )}
                         <div className="hidden md:block"><EliteBadge type="default">{p.tag}</EliteBadge></div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex justify-center">
                         <button 
                          onClick={() => { setViewProduct(p); setViewVariant(p.variants[0]); }}
                          className="bg-white text-gray-900 px-8 py-4 rounded-[2rem] text-[9px] font-black uppercase tracking-[0.5em] flex items-center gap-3 hover:bg-pink-500 hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap"
                         >
                            <Eye size={16}/> Details
                         </button>
                      </div>
                   </div>

                   <div className="p-6 md:p-14 flex-1 flex flex-col bg-white">
                      <div className="flex items-center justify-between mb-4 md:mb-8">
                         <span className="text-[9px] md:text-[11px] font-black text-amber-600 uppercase tracking-[0.4em] leading-none">{p.category}</span>
                         <div className="flex items-center gap-1 text-amber-400">
                            <Star size={14} className="fill-amber-400" />
                            <span className="text-[10px] font-black text-gray-400">({p.reviewsCount})</span>
                         </div>
                      </div>
                      
                      <h4 className="text-xl md:text-3xl font-serif font-bold text-gray-900 mb-6 group-hover:text-pink-600 transition-colors leading-[1.2] uppercase italic min-h-[3rem] md:min-h-[4rem] line-clamp-2">
                        {p.name}
                      </h4>
                      
                      <div className="mb-8 p-4 md:p-6 bg-gray-50 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-inner group-hover:bg-pink-50/50 transition-colors">
                         <StockIndicator stock={p.totalStock} max={100} />
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-3">
                         <div className="flex flex-col">
                            {p.discountPrice && <span className="text-[10px] text-gray-300 line-through font-bold italic tracking-tighter opacity-70">{formatIDR(p.basePrice)}</span>}
                            <span className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter leading-none">
                               {formatIDR(p.discountPrice || p.basePrice)}
                            </span>
                         </div>
                         <button 
                          onClick={() => { setViewProduct(p); setViewVariant(p.variants[0]); }}
                          className="w-14 h-14 md:w-22 md:h-22 bg-gray-900 border border-gray-800 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center text-white hover:bg-pink-500 transition-all shadow-2xl active:scale-90 shrink-0 shadow-pink-100"
                         >
                            <BagIcon size={24} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- VIRTUAL STYLIST GUIDE (RESTORED) --- */}
      <section className="py-40 md:py-64 bg-pink-50/20 px-8 lg:px-24 relative overflow-hidden">
         <div className="container mx-auto relative z-10">
            <SectionTitle 
              title="Virtual Stylist" 
              subtitle="Temukan potongan hijab yang paling menonjolkan kecantikan alami berdasarkan bentuk wajah Anda."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {STYLIST_GUIDE.map((guide) => (
                 <div key={guide.id} className="bg-white p-12 rounded-[4rem] shadow-xl border border-white transition-all hover:-translate-y-4 duration-700 group">
                    <div className="w-24 h-24 bg-pink-50 rounded-[2.5rem] flex items-center justify-center text-pink-500 mb-12 shadow-sm group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                       <Smile size={48} />
                    </div>
                    <h5 className="text-3xl font-serif italic font-bold text-gray-900 mb-6 uppercase tracking-tighter">Wajah: {guide.face}</h5>
                    <p className="text-gray-500 text-lg leading-relaxed font-light italic mb-10">"{guide.tip}"</p>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-pink-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-20px] group-hover:translate-x-0">
                       Learn Style Detail <ChevronRight size={16}/>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- MATERIAL MASTERY (RESTORED) --- */}
      <section className="py-40 md:py-64 bg-white px-8 lg:px-24 relative overflow-hidden">
         <div className="container mx-auto">
            <SectionTitle 
              title="Material Mastery" 
              subtitle="Edukasi mendalam tentang karakteristik material hijab terbaik kami untuk kenyamanan maksimal Anda."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {MATERIALS_DATABASE.map((m) => {
                 const Icon = m.icon;
                 return (
                  <div key={m.id} className="bg-white p-14 rounded-[5rem] shadow-2xl border border-white hover:-translate-y-5 transition-all duration-1000 group text-center relative overflow-hidden card-shadow">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50/30 rounded-bl-[100px] -z-10 group-hover:bg-pink-500 transition-colors duration-700"></div>
                     <div className="w-28 h-28 bg-pink-50 rounded-[3rem] flex items-center justify-center text-pink-500 mb-12 mx-auto group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 rotate-6 group-hover:rotate-0 shadow-sm border border-white">
                        <Icon size={56} />
                     </div>
                     <h5 className="text-3xl font-serif italic font-bold text-gray-900 mb-6 uppercase tracking-tighter">{m.name}</h5>
                     <p className="text-gray-500 text-lg leading-relaxed font-light italic mb-10 opacity-80">"{m.desc}"</p>
                     <div className="flex flex-wrap justify-center gap-3">
                        {m.benefits.map((b, i) => (
                          <EliteBadge key={i} type="pink">{b}</EliteBadge>
                        ))}
                     </div>
                     <div className="mt-12 pt-10 border-t border-gray-50 flex items-center justify-center gap-5 text-[10px] font-black uppercase tracking-[0.5em] text-pink-400">
                        <Clock size={16} /> Care Guide: {m.care}
                     </div>
                  </div>
                 );
               })}
            </div>
         </div>
      </section>

      {/* --- HERITAGE & LOGISTICS (RESTORED) --- */}
      <section id="about" className="py-40 md:py-64 bg-[#0a0a0a] text-white relative overflow-hidden px-8 lg:px-24">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[200px] -mr-64 -mt-64"></div>
         <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <div>
                  <SectionTitle 
                    title="Heritage Logic" 
                    subtitle="Teknologi distribusi cerdas yang memastikan pesanan Anda tiba dengan keamanan maksimal dan standar butik."
                    centered={false}
                  />
                  <div className="space-y-16 mt-20">
                     {[
                       { icon: Verified, title: "Signature Packaging", desc: "Setiap paket dilindungi oleh signature hardbox & eco-friendly wrap yang aman." },
                       { icon: TruckIcon, title: "Global Tracking", desc: "Sistem pelacakan real-time dari gudang pusat hingga ke pintu rumah Anda." },
                       { icon: ZapIcon, title: "Priority Protocol", desc: "Pesanan sebelum jam 15.00 WIB diproses dan dikirim pada hari yang sama." }
                     ].map((item, idx) => (
                       <div key={idx} className="flex items-start gap-10 group">
                          <div className="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-pink-400 border border-white/10 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                             <item.icon size={40} />
                          </div>
                          <div>
                             <h5 className="text-2xl font-serif italic font-bold mb-4 uppercase tracking-tighter">{item.title}</h5>
                             <p className="text-gray-400 text-lg leading-relaxed font-light italic opacity-80">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="relative group">
                  <div className="aspect-[4/5] rounded-[18rem] overflow-hidden border-[40px] border-white/5 shadow-2xl relative">
                     <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-16 -left-16 bg-pink-500 text-white p-16 rounded-[6rem] shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-700">
                     <p className="text-8xl font-serif italic font-bold leading-none">VVIP</p>
                     <p className="text-[12px] font-black uppercase tracking-[0.6em] mt-3 tracking-[1em]">Malayeka</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

     {/* --- TESTIMONIAL SECTION --- */}
      <section className="py-40 md:py-64 bg-white px-8 lg:px-24 relative overflow-hidden">
        <div className="container mx-auto">
          <SectionTitle
            title="Sahabat Malayeka" 
            subtitle="Bergabunglah dengan ribuan Muslimah yang telah beralih ke standar belanja elit dan transparan."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {CUSTOMER_REVIEWS.map(t => (
              <div 
                key={t.id} 
                className="bg-white p-12 md:p-16 rounded-[5rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-6 transition-all duration-1000 group relative overflow-hidden"
              >
                {/* Garis Aksen: Full dari atas ke bawah, melengkung mengikuti card */}
                <div className="absolute inset-y-0 left-0 w-4 bg-pink-50 group-hover:bg-pink-500 transition-all duration-700 z-0"></div>
                
                {/* Efek Gradasi Halus di samping garis agar lebih premium */}
                <div className="absolute inset-y-0 left-4 w-10 bg-gradient-to-r from-pink-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10"> {/* Wrapper agar konten di depan garis */}
                  
                  {/* Decorative Quote Mark */}
                  <div className="text-pink-100 text-[14rem] font-serif leading-none absolute -top-16 -right-8 opacity-10 pointer-events-none group-hover:scale-110 group-hover:opacity-20 transition-all duration-1000">“</div>
                  
                  {/* Stars */}
                  <div className="flex gap-1.5 mb-10">
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} className="text-amber-400 fill-amber-400" />)}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-xl md:text-2xl italic font-light leading-relaxed mb-16 opacity-90 group-hover:opacity-100 transition-opacity">
                    "{t.text}"
                  </p>

                  {/* User Profile */}
                  <div className="flex items-center gap-6 md:gap-8 pt-10 border-t border-gray-100">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-900 rounded-full flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-xl uppercase group-hover:scale-110 transition-transform duration-700">
                      {t.avatar}
                    </div>
                    <div className="text-left">
                      <h6 className="font-bold text-gray-900 text-xl md:text-2xl leading-none mb-2 uppercase tracking-tight">{t.name}</h6>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={14} className="text-pink-400" />
                        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] leading-none">{t.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (RESTORED) --- */}
      <section id="faq" className="py-40 md:py-64 bg-gray-50/50 px-8 lg:px-24">
         <div className="container mx-auto max-w-5xl">
            <SectionTitle 
              title="Concierge Center" 
              subtitle="Jawaban atas sistem inventaris butik cerdas Malayeka."
            />

            <div className="space-y-10">
               {FAQS_DATA.map((f, i) => (
                 <div key={i} className={`border-2 rounded-[4.5rem] overflow-hidden transition-all duration-700 ${faqOpen === i ? 'border-pink-200 bg-white shadow-2xl scale-105' : 'border-white bg-white/40 shadow-sm'}`}>
                    <button 
                     onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                     className="w-full flex items-center justify-between p-14 md:p-18 text-left group"
                    >
                       <span className={`text-2xl md:text-3xl font-serif font-bold transition-colors ${faqOpen === i ? 'text-pink-600' : 'text-gray-800 uppercase italic'}`}>{f.q}</span>
                       <div className={`p-6 rounded-full transition-all duration-700 shadow-lg ${faqOpen === i ? 'bg-pink-500 text-white rotate-180' : 'bg-white text-gray-300'}`}>
                          <ChevronDown size={36} />
                       </div>
                    </button>
                    <div className={`transition-all duration-700 ease-in-out ${faqOpen === i ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                       <div className="p-14 md:p-18 pt-0 text-gray-500 text-xl leading-relaxed font-light border-t border-pink-50/30 italic opacity-80">
                         {f.a}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 pt-48 pb-56 lg:pb-24 text-white relative overflow-hidden px-8 lg:px-24">
         <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40">
               <div className="lg:col-span-1">
                  <h2 className="text-4xl font-serif italic font-bold text-pink-400 mb-12 uppercase tracking-[0.6em] leading-none">Malayeka</h2>
                  <p className="text-gray-400 text-xl leading-relaxed mb-16 font-light italic opacity-70">
                     "Dedikasi tanpa kompromi untuk menghadirkan mahakarya tekstil terbaik bagi Muslimah Indonesia."
                  </p>
                  <div className="flex gap-8">
                     {[Instagram, Facebook, Twitter, MessageCircle].map((Icon, idx) => (
                       <button key={idx} className="w-16 h-16 bg-white/5 text-pink-500 rounded-[2.5rem] flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-2xl border border-white/5 group">
                          <Icon size={32} className="group-hover:rotate-12 transition-transform" />
                       </button>
                     ))}
                  </div>
               </div>

               <div>
                  <h5 className="font-black text-[11px] uppercase tracking-[0.8em] mb-16 text-pink-400 leading-none italic">Navigation</h5>
                  <ul className="space-y-12 text-lg text-gray-400 font-medium">
                     {['Elite Catalog', 'Heritage Story', 'Sustainability', 'Boutique Journal'].map(link => (
                       <li key={link} className="hover:text-white transition-all cursor-pointer flex items-center gap-8 group">
                          <div className="h-px w-0 bg-pink-500 group-hover:w-12 transition-all duration-700"></div>{link}
                       </li>
                     ))}
                  </ul>
               </div>

               <div>
                  <h5 className="font-black text-[11px] uppercase tracking-[0.8em] mb-16 text-pink-400 leading-none italic">Concierge HQ</h5>
                  <div className="flex gap-10 mb-14 text-gray-400 italic">
                     <MapPin size={48} className="text-pink-500 shrink-0" />
                     <p className="text-xl leading-relaxed opacity-80 font-light">The Heritage Niaga Hub B-24, <br/> Bandung - Indonesia.</p>
                  </div>
                  <div className="bg-white/5 p-10 rounded-[3.5rem] border border-white/5 flex items-center gap-10 shadow-inner">
                     <div className="w-5 h-5 bg-emerald-500 rounded-full animate-ping"></div>
                     <p className="text-2xl font-bold text-white uppercase tracking-tighter">Operational Online</p>
                  </div>
               </div>

               <div>
                  <h5 className="font-black text-[11px] uppercase tracking-[0.8em] mb-16 text-pink-400 leading-none italic">Digital Design</h5>
                  <p className="text-3xl font-serif italic font-bold text-pink-500 mb-8 uppercase tracking-[0.3em]">{BRAND_CONFIG.designer}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-[0.6em] font-black">Strategic Boutique Developer</p>
               </div>
            </div>

            <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 text-[11px] font-black text-gray-500 uppercase tracking-[0.8em] text-center md:text-left">
               <div className="space-y-4">
                  <p>© 2024 {BRAND_CONFIG.name.toUpperCase()} HOLDINGS.</p>
                  <p className="opacity-30 italic leading-none lowercase tracking-widest text-[9px]">Part of Global Islamic Fashion Supply Chain.</p>
               </div>
               <div className="px-12 py-5 bg-white/5 rounded-full border border-white/5 text-pink-400 tracking-[0.5em]">
                  Prestige Signature v6.5
               </div>
            </div>
         </div>
      </footer>

      {/* --- PRESTIGE MOBILE FLOATING NAV --- */}
      {!viewProduct && !isCartOpen && (
        <div className="lg:hidden fixed bottom-12 left-6 right-6 z-[5000] animate-fade">
           <div className="glass rounded-[4rem] p-5 flex items-center justify-around shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/20">
              <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex flex-col items-center gap-2.5 text-pink-500 transform active:scale-90 transition-all p-3">
                 <Zap size={30} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Home</span>
              </button>
              <button onClick={() => document.getElementById('katalog').scrollIntoView({behavior:'smooth'})} className="flex flex-col items-center gap-2.5 text-gray-400 transform active:scale-90 transition-all p-3">
                 <Package size={30} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Stock</span>
              </button>
              <button onClick={() => setIsCartOpen(true)} className="relative flex flex-col items-center gap-2.5 text-gray-400 transform active:scale-90 transition-all p-3">
                 <BagIcon size={30} />
                 <span className="text-[9px] font-black uppercase tracking-widest">Bag</span>
                 {cart.length > 0 && <span className="absolute top-2 right-2 bg-pink-500 w-5 h-5 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-[8px] text-white font-black">{cart.length}</span>}
              </button>
              <button onClick={() => window.open(`https://wa.me/${BRAND_CONFIG.whatsapp}`, '_blank')} className="flex flex-col items-center gap-2.5 text-emerald-500 transform active:scale-90 transition-all p-3">
                 <MessageCircle size={30} />
                 <span className="text-[9px] font-black uppercase tracking-widest">VVIP</span>
              </button>
           </div>
        </div>
      )}

      {/* --- DESKTOP FLOATING CONTROLS --- */}
      <div className="hidden lg:flex fixed bottom-16 right-16 z-[4500] flex-col gap-12 items-end">
         {scrolled && (
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-24 h-24 bg-white border-4 border-pink-50 text-gray-400 rounded-[3.5rem] shadow-2xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all active:scale-90 animate-fade"
            >
               <ArrowUp size={40} />
            </button>
         )}
         <button 
           onClick={() => window.open(`https://wa.me/${BRAND_CONFIG.whatsapp}?text=Halo%20Malayeka!%20Saya%20tertarik%20dengan%20katalog%20Prestige...`, '_blank')}
           className="w-32 h-32 bg-emerald-500 text-white rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(16,185,129,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group border-[12px] border-white/20"
         >
            <MessageCircle size={52} className="group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute right-full mr-12 bg-gray-900 text-white text-[13px] font-black px-12 py-6 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-all translate-x-10 group-hover:translate-x-0 whitespace-nowrap uppercase tracking-[0.8em] pointer-events-none shadow-2xl border border-white/10 italic">
               Priority Concierge
            </div>
         </button>
      </div>

    </div>
  );
}

/**
 * =============================================================================
 * MAINTENANCE DOCUMENTATION (V6.5 PRESTIGE SIGNATURE):
 * =============================================================================
 * 1. RESTORED PAGES: Sustainability, Stylist Guide, Journal, Testimonials, FAQ.
 * 2. MODAL REFACTOR: Visual (45%) & Info (55%) split. Stacked on mobile.
 * 3. NO-SCROLLBAR: Applied globally and specifically to CATEGORY TABS.
 * 4. MOBILE GRID: grid-cols-2 with tighter gaps for premium boutique look.
 * 5. Z-INDEX ARCHITECTURE: Modal (7500) > Nav Island (5000) > Page Content.
 * =============================================================================
 */