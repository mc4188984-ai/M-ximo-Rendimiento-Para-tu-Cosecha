import { useState, useEffect, FormEvent } from 'react';
import {
  Sprout,
  Search,
  ShoppingCart,
  MessageSquare,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  BookOpen,
  CloudSun,
  X,
  FileText,
  BadgeAlert,
  SlidersHorizontal,
  ThumbsUp,
  ArrowRight
} from 'lucide-react';
import { Product, CartItem, Category } from './types';
import { PRODUCTS, CATEGORY_LABELS } from './data/products';
import { AgroCalculator } from './components/AgroCalculator';
import { AgroAssistant } from './components/AgroAssistant';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartSlideOver } from './components/CartSlideOver';

export default function App() {
  // Navigation & Categorization
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'rating'>('default');

  // Shopping Cart & Selected Items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Custom notifications banner
  const [notification, setNotification] = useState<string | null>(null);
  
  // Custom states for Field Visits Booking
  const [visitList, setVisitList] = useState<{ id: string; name: string; date: string; crop: string }[]>([
    { id: 'v-1', name: 'Ing. Mercedes Fuentes', date: 'Viernes, 12 de Junio - 09:00 AM', crop: 'Diagnóstico de Suelo Arcilloso' }
  ]);
  const [visitForm, setVisitForm] = useState({
    farmerName: '',
    phone: '',
    cropType: 'Maíz Híbrido',
    prefDate: '',
    address: ''
  });
  const [visitBooked, setVisitBooked] = useState(false);

  // General contact form state
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');

  // Handle auto-clearing notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter and sort products
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') {
      const pA = typeof a.price === 'number' ? a.price : 999999;
      const pB = typeof b.price === 'number' ? b.price : 999999;
      return pA - pB;
    }
    if (sortBy === 'priceDesc') {
      const pA = typeof a.price === 'number' ? a.price : -1;
      const pB = typeof b.price === 'number' ? b.price : -1;
      return pB - pA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // default order
  });

  // Calculate cart badge count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Visit booking submission
  const handleBookVisit = (e: FormEvent) => {
    e.preventDefault();
    if (!visitForm.farmerName || !visitForm.prefDate) return;
    
    const formattedDate = new Date(visitForm.prefDate).toLocaleDateString('es-ES', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }) + ' @ Hora Coordinada';

    const newVisit = {
      id: `v-${Date.now()}`,
      name: `Técnico de Zona - Solicitado por ${visitForm.farmerName}`,
      date: formattedDate,
      crop: `Visita Fundo en ${visitForm.address || 'Ubicación Predial'} p/ ${visitForm.cropType}`
    };

    setVisitList(prev => [newVisit, ...prev]);
    setVisitBooked(true);
    triggerNotification(`¡Visita agronómica de campo agendada! Un ingeniero te llamará.`);
    
    // Reset form
    setVisitForm({
      farmerName: '',
      phone: '',
      cropType: 'Maíz Híbrido',
      prefDate: '',
      address: ''
    });
  };

  return (
    <div className="min-h-screen bg-limestone font-sans text-ink selection:bg-forest selection:text-white antialiased">
      
      {/* GLOBAL BANNER INDEX / MARGIN CLUTTER PROTECTION */}
      <div className="bg-ink text-limestone text-[11px] font-medium py-2 px-4 shadow-inner flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-white/10 uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <CloudSun className="w-3.5 h-3.5 text-forest" />
            <strong>Zona Central Sur clima:</strong> 18°C Templado - Suelos Óptimos p/ Siembra Directa
          </span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-forest" />
            Atención Agro-Técnica: 08:30 a 18:00 hrs
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-white/10 text-limestone font-bold px-2 py-0.5 rounded border border-white/10">
            Cotización Agro: 1.00 USD = $940 CLP
          </span>
          <a href="#calculadora-agronomica" className="hover:text-white transition-colors underline decoration-forest font-bold">
            Calcular Sacos por Hectárea
          </a>
        </div>
      </div>

      {/* FLOAT NOTIFICATION POPUP */}
      {notification && (
        <div id="toast-wrapper" className="fixed bottom-6 left-6 z-50 bg-ink text-white max-w-sm px-4 py-3.5 rounded-sm shadow-2xl border border-forest/30 flex items-center justify-between gap-3 animate-slide-up">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-forest animate-pulse shrink-0" />
            <p className="text-xs font-semibold">{notification}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-zinc-400 hover:text-white text-xs font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/15 shadow-none transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 group shrink-0">
            <div className="p-2.5 bg-forest text-white rounded-[4px] group-hover:bg-forest-hover transition-colors">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-ink tracking-tight leading-none flex items-baseline">
                AGRO<span className="text-forest font-black">INDUSTRIAL</span>
              </h1>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.1em] block mt-1">
                Ingeniería y Tecnología Rural
              </span>
            </div>
          </a>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-xs font-bold text-zinc-500 hover:text-forest transition-colors uppercase tracking-widest">Inicio</a>
            <a href="#productos" className="text-xs font-bold text-zinc-500 hover:text-forest transition-colors uppercase tracking-widest">Catálogo</a>
            <a href="#calculadora-agronomica" className="text-xs font-bold text-zinc-500 hover:text-forest transition-colors uppercase tracking-widest">Calculadora Técnica</a>
            <a href="#visitas" className="text-xs font-bold text-zinc-500 hover:text-forest transition-colors uppercase tracking-widest">Visitas de Campo</a>
            <a href="#nosotros" className="text-xs font-bold text-zinc-500 hover:text-forest transition-colors uppercase tracking-widest">Nosotros</a>
            <a href="#contacto" className="text-xs font-bold text-zinc-500 hover:text-forest transition-colors uppercase tracking-widest">Contacto</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              id="btn-trigger-ai-assistant"
              onClick={() => setIsAssistantOpen(!isAssistantOpen)}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer relative ${
                isAssistantOpen 
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-805' 
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
              }`}
              title="Asistente Agrónomo"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </button>

            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="bg-stone-900 hover:bg-stone-880 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-transform active:scale-95 cursor-pointer relative text-sm shadow-sm"
            >
              <ShoppingCart className="w-4.5 h-4.5" />
              <span className="hidden sm:inline">Mi Orden</span>
              {cartItemCount > 0 && (
                <span className="bg-emerald-650 text-white text-[11px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-stone-900 shrink-0">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative bg-ink text-white overflow-hidden py-16 sm:py-24 border-b border-black/15">
        
        {/* background image representation pattern */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
            alt="Fondo de campo de siembra"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-forest text-white text-[11px] font-bold uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-[4px]">
              <Sparkles className="w-3.5 h-3.5 text-earth-light" />
              Insumos Certificados y Distribución Oficial
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-display italic">
              Máximo Rendimiento <br />
              <span className="text-forest">Para tu Cosecha</span>
            </h2>
            <p className="text-[#a1a1aa] text-base sm:text-lg max-w-xl leading-relaxed">
              Equipamiento técnico pesado, semillas certificadas de germinación controlada y sistemas de riego automatizados. Proveemos soluciones biológicas y de ingeniería para la agroindustria moderna.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <a
                href="#productos"
                className="bg-forest hover:bg-forest-hover text-white font-bold px-8 py-3.5 rounded-[4px] text-center text-sm transition-all cursor-pointer shadow-none"
              >
                Explorar Catálogo Agrícola
              </a>
              <a
                href="#calculadora-agronomica"
                className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold px-8 py-3.5 rounded-[4px] text-center text-sm transition-all cursor-pointer"
              >
                Calcular Dosis de Semilla
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 text-center sm:text-left">
              <div>
                <span className="block text-2xl font-bold text-forest font-display italic">99.8%</span>
                <span className="text-xs text-zinc-400 block mt-0.5 font-semibold">Tasa Germinación Certificada</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-forest font-display italic">+20 Años</span>
                <span className="text-xs text-zinc-400 block mt-0.5 font-semibold">Apoyando al Campo Chileno</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-forest font-display italic">24/7 PM</span>
                <span className="text-xs text-zinc-400 block mt-0.5 font-semibold">Atención de Urgencia Química</span>
              </div>
            </div>
          </div>

          {/* Hero interactive card highlight / mini catalog access */}
          <div className="lg:col-span-5 bg-white text-ink rounded-sm p-6 shadow-none border border-black/10 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-forest bg-forest-light px-2.5 py-1 rounded-[4px] inline-block mb-3 tracking-wider">
                Artículo Destacado de Temporada
              </span>
              <img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80"
                alt="Highlight Drone"
                className="w-full h-40 rounded-sm object-cover border border-black/15 mb-4"
              />
              <h3 className="text-lg font-bold text-ink leading-snug font-display italic">
                Dron de Fumigación AeroSpray T50
              </h3>
              <p className="text-xs text-[#64748b] mt-1 line-clamp-2">
                Navegación 3D autónoma, tanque de 40L para fitosanitarios y radar de evasión esférico anticrisis.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-black/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wide block">Precio especial</span>
                <span className="text-base font-extrabold text-ink">$18,500 USD</span>
              </div>
              <button
                id="btn-hero-highlight"
                onClick={() => {
                  const drone = PRODUCTS.find(p => p.id === 'maq-2');
                  if (drone) setSelectedProduct(drone);
                }}
                className="bg-forest hover:bg-forest-hover text-white text-xs font-bold px-4 py-2.5 rounded-[4px] transition-colors cursor-pointer flex items-center gap-1"
              >
                Ver Ficha Técnica
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* BENTO STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Award className="w-5 h-5 text-forest" />,
              title: "Estándar de Calidad OMRI",
              desc: "Fertilizantes orgánicos homologados para agricultura orgánica nacional."
            },
            {
              icon: <Sprout className="w-5 h-5 text-forest" />,
              title: "Semillas Tratadas y Visadas",
              desc: "Pureza genética mayor al 99.8% con inoculante radicular preventivo."
            },
            {
              icon: <BookOpen className="w-5 h-5 text-forest" />,
              title: "Asesoría Agrónoma",
              desc: "Monitoreo satelital y visitas técnicas calendarizadas en su propio fango."
            },
            {
              icon: <Clock className="w-5 h-5 text-forest" />,
              title: "Flete de Carga Seguro",
              desc: "Despacho con montacargas para bidones y súper sacos a pie de galpón."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-sm border border-black/10 p-5 shadow-none hover:border-black/20 transition-all flex gap-3.5 items-start">
              <div className="p-3 bg-forest-light rounded-sm shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-ink text-sm uppercase tracking-wide">{item.title}</h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RETAIL MAIN CONTAINER (CATALOG & AI ADVISOR) */}
      <main id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title Group */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase font-semibold text-forest tracking-widest block mb-1">
              Abastecimiento Premium para Agricultores
            </span>
            <h3 className="text-3xl font-bold font-display italic text-ink tracking-tight mt-1">
              Catálogo Agroindustrial y de Tecnología
            </h3>
            <p className="text-zinc-500 text-sm mt-1.5 max-w-2xl">
              Filtre por categoría de cultivo o use el buscador predictivo para localizar la semilla, fitosanitario u herramienta de precisión idónea.
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto shrink-0">
            <button
              id="btn-toggle-filters-box"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 border border-black/15 bg-white hover:bg-zinc-50 text-ink font-bold px-4 py-2.5 text-xs rounded-[4px] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-forest" />
              {showFilters ? 'Ocultar Filtros' : 'Filtros y Orden'}
            </button>
          </div>
        </div>

        {/* SEARCH & FILTERS CONTROLS */}
        <div className="bg-white rounded-sm border border-black/10 shadow-none p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              <input
                id="search-input-catalog"
                type="text"
                placeholder="Buscar por insecto plaga, modelo de tractor, tipo de cultivo, fertilizante foliar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-limestone border border-black/10 rounded-sm pl-10 pr-4 py-3 text-sm text-ink focus:outline-none focus:border-forest placeholder-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 bg-zinc-200 hover:bg-zinc-300 text-zinc-650 p-1 rounded-sm text-[10px]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex overflow-x-auto gap-1.5 pb-1 md:pb-0 whitespace-nowrap scrollbar-none max-w-full">
              <button
                id="pill-todos"
                onClick={() => setActiveCategory('todos')}
                className={`px-4 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer uppercase tracking-wider ${
                  activeCategory === 'todos'
                    ? 'bg-forest text-white shadow-none'
                    : 'bg-limestone text-zinc-650 hover:bg-zinc-100 border border-black/10'
                }`}
              >
                Todos ({PRODUCTS.length})
              </button>
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                <button
                  key={cat}
                  id={`pill-${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-sm text-xs font-bold transition-all cursor-pointer uppercase tracking-wider ${
                    activeCategory === cat
                      ? 'bg-forest text-white shadow-none'
                      : 'bg-limestone text-zinc-650 hover:bg-zinc-100 border border-black/10'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* ADVANCED MULTI-OPTIONS (EXPANDABLE PANEL) */}
          {showFilters && (
            <div className="pt-4 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Ordenar por:</label>
                <select
                  id="select-sort-options"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full bg-limestone border border-black/10 p-2.5 rounded-sm focus:outline-none focus:border-forest font-medium text-ink"
                >
                  <option value="default">Recomendado por la Casa</option>
                  <option value="priceAsc">Menor precio primero</option>
                  <option value="priceDesc">Mayor precio primero</option>
                  <option value="rating">Mejor Calificación Técnica</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Disponibilidad:</label>
                <div className="bg-limestone border border-black/10 p-2.5 rounded-sm font-medium text-zinc-600">
                  <span>Solo stock verificado de importación</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Soporte Técnico Complementario:</label>
                <div className="bg-limestone border border-black/10 p-2.5 rounded-sm font-medium text-zinc-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  <span>Laboratorio de ph habilitado</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PRIMARY LAYOUT ROW: DYNAMIC GRID + AI CHATBAR SIDEBAR */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* LEFT: PRODUCTS LIST GRID (COL-SPAN-8 or FULL) */}
          <div className={`${isAssistantOpen ? 'xl:col-span-8' : 'xl:col-span-12'} space-y-8 transition-all duration-300`}>
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-sm border border-black/10 p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-none">
                <div className="text-4xl">🌾</div>
                <div>
                  <h4 className="font-bold text-ink text-lg font-display italic">No se hallaron insumos que concuerden</h4>
                  <p className="text-zinc-500 text-xs mt-1.5 max-w-sm mx-auto">
                    Prueba cambiando los parámetros de búsqueda, simplificando la frase o haciendo clic en "Todos". También puedes preguntarle a nuestro asesor digital en la barra verde.
                  </p>
                </div>
                <button
                  id="btn-reset-filters"
                  onClick={() => {
                    setActiveCategory('todos');
                    setSearchQuery('');
                  }}
                  className="bg-forest hover:bg-forest-hover text-white font-bold py-2.5 px-6 rounded-[4px] text-xs cursor-pointer shadow-none transition-colors"
                >
                  Limpiar Filtros y Mostrar Todo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isQuote = product.price === 'consultar';
                  return (
                    <div
                      key={product.id}
                      id={`p-card-${product.id}`}
                      className="bg-white rounded-sm border border-black/10 p-4 shadow-none hover:border-black/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div>
                        <div className="relative aspect-video rounded-sm overflow-hidden border border-black/10 bg-limestone mb-3.5">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                            {product.badges.slice(0, 2).map((badge, idx) => (
                              <span
                                key={idx}
                                className="bg-ink text-white text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Text block */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-forest bg-forest-light px-2 py-0.5 rounded-sm inline-block tracking-wider">
                            {CATEGORY_LABELS[product.category]}
                          </span>
                          <h4 className="font-bold text-ink text-base leading-tight line-clamp-2 hover:text-forest transition-colors cursor-pointer font-display italic mt-1" onClick={() => setSelectedProduct(product)}>
                            {product.name}
                          </h4>
                          <p className="text-zinc-500 text-xs line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Footer Specs & Purchase trigger */}
                      <div className="mt-5 pt-3.5 border-t border-black/10">
                        {/* Highlights parameters */}
                        <div className="grid grid-cols-2 gap-1 mb-4 text-[11px] text-zinc-500">
                          <div>
                            <span className="block font-semibold text-zinc-400">Pureza/Rend.</span>
                            <span className="font-bold text-ink">{product.specs[0]?.value.split(' ')[0] || 'Certif.'}</span>
                          </div>
                          <div className="text-right">
                            <span className="block font-semibold text-zinc-400">Envase</span>
                            <span className="font-bold text-ink">{product.unit}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-medium">PRECIO NETO</span>
                            {isQuote ? (
                              <span className="text-xs font-bold text-earth uppercase tracking-wider">Cotizar Ficha</span>
                            ) : (
                              <span className="text-sm font-extrabold text-ink">
                                ${(product.price as number).toLocaleString('es-ES')} <span className="text-[10px] font-normal text-zinc-400">USD</span>
                              </span>
                            )}
                          </div>

                          <div className="flex gap-1.5">
                            <button
                              id={`p-view-${product.id}`}
                              onClick={() => setSelectedProduct(product)}
                              className="border border-black/15 hover:bg-zinc-50 text-ink font-bold px-2.5 py-1.5 rounded-sm text-xs transition-colors cursor-pointer"
                              title="Ver Especificaciones"
                            >
                              Ver Ficha
                            </button>
                            
                            {isQuote ? (
                              <button
                                id={`p-quote-${product.id}`}
                                onClick={() => setSelectedProduct(product)}
                                className="bg-earth hover:bg-[#5c2409] text-white font-bold px-3 py-1.5 rounded-sm text-xs transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
                              >
                                Cotizar
                              </button>
                            ) : (
                              <button
                                id={`p-add-${product.id}`}
                                onClick={() => {
                                  handleAddToCart(product, 1);
                                  triggerNotification(`Añadido ${product.name} a tu selección de compra.`);
                                }}
                                className="bg-forest hover:bg-forest-hover text-white font-bold p-1.5 rounded-sm text-xs transition-colors cursor-pointer shadow-none"
                                title="Añadir al Carro"
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: FLOATING ADVOCACY ASSISTANT CHATBAR (if open state) */}
          {isAssistantOpen && (
            <div className="xl:col-span-4 sticky top-24 shrink-0 transition-all duration-300">
              <div className="relative">
                {/* Close absolute floating header help */}
                <button
                  onClick={() => setIsAssistantOpen(false)}
                  className="absolute top-4 right-16 z-10 text-zinc-400 hover:text-white bg-ink p-1.5 rounded-sm"
                  title="Ocultar Asistente"
                >
                  ✕
                </button>
                <AgroAssistant
                  onAddToCart={handleAddToCart}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onNotification={triggerNotification}
                />
              </div>
            </div>
          )}

        </div>

      </main>

      {/* MID-BANNER AGRICULTURAL CALCULATOR COMPONENT */}
      <section className="bg-white py-16 border-t border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[11px] uppercase font-semibold text-forest bg-forest-light px-3 py-1 rounded-[4px] tracking-wider">
              Optimización de Recursos Agronómicos
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-4 font-display italic">
              Calculadora de Densidad de Cultivo y Nutrición
            </h3>
            <p className="text-zinc-500 text-sm mt-2 max-w-xl mx-auto">
              Evite desperdicios y deficiencias en sus parcelas. Ingrese las hectáreas, defina su objetivo de siembra, y nuestra calculadora generará los volúmenes necesarios de semilla certificada u abonos biológicos listos para el carro de compra.
            </p>
          </div>

          <AgroCalculator
            onAddToCart={handleAddToCart}
            onNotification={triggerNotification}
          />
        </div>
      </section>

      {/* TECH VISITS BOOKING SECTION (#visitas) */}
      <section id="visitas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info about expert technical inspections */}
          <div className="lg:col-span-5 bg-ink text-white rounded-sm p-8 flex flex-col justify-between border border-black/15">
            <div>
              <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-2">Soporte Físico en Terreno</span>
              <h3 className="text-3xl font-bold tracking-tight text-white leading-tight font-display italic">
                Agende una Visita Técnica de Suelos
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                No arriesgue su inversión. Uno de nuestros ingenieros agrónomos de zona puede apersonarse en su fundo para tomar lecturas de NPK directo en raíz profunda, comprobar conductividad y visar los planes de rotación de suelo.
              </p>

              <div className="space-y-4 mt-6">
                {[
                  { title: "Mapeo de Conductividad Eléctrica", desc: "Monitoreo del vigor hídrico radicular para evitar pudrición de rizomas." },
                  { title: "Muestreo Físico-Químico Lab", desc: "Análisis espectral de Nitrógeno, Fósforo disponible y acidez de sustrato." }
                ].map((visItem, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs">
                    <span className="p-1.5 bg-forest/20 text-forest rounded-sm text-xs font-bold">✓</span>
                    <div>
                      <h5 className="font-bold text-white uppercase tracking-wider">{visItem.title}</h5>
                      <p className="text-zinc-400 mt-1 leading-relaxed">{visItem.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-sm bg-forest-light border border-forest/20 flex items-center justify-center text-forest shrink-0 font-black">
                24h
              </div>
              <p className="text-xs text-zinc-400">
                Confirmación telefónica de coordenadas o visado en menos de un día hábil.
              </p>
            </div>
          </div>

          {/* Right panel: Live visit schedule simulation form & list of booked technicians */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-black/10 shadow-none p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-ink mb-4 flex items-center gap-2 font-display italic">
                <Calendar className="w-5 h-5 text-forest" />
                Coordinador de Inspección de Campo
              </h4>

              {visitBooked ? (
                <div className="bg-forest-light border border-forest/15 p-6 rounded-sm text-center space-y-3 my-4">
                  <div className="w-12 h-12 bg-forest/10 text-forest rounded-sm flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-bold text-forest">¡Agenda Registrada con Éxito!</h4>
                  <p className="text-xs text-zinc-650 max-w-sm mx-auto">
                    Tu solicitud ha sido transmitida a los agrónomos regionales. Revisa tu bitácora abajo para confirmar la franja horaria.
                  </p>
                  <button
                    id="btn-book-another-visit"
                    onClick={() => setVisitBooked(false)}
                    className="bg-forest hover:bg-forest-hover text-white font-bold text-xs py-2 px-4 rounded-sm cursor-pointer"
                  >
                    Agendar otra visita predial
                  </button>
                </div>
              ) : (
                <form id="visit-booking-form" onSubmit={handleBookVisit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Nombre del Agricultor / Encargado</label>
                    <input
                      id="visit-farmer-name"
                      type="text"
                      required
                      placeholder="Ej. Manuel Benavides"
                      value={visitForm.farmerName}
                      onChange={(e) => setVisitForm({ ...visitForm, farmerName: e.target.value })}
                      className="w-full bg-limestone border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Teléfono Directo de Fundo</label>
                    <input
                      id="visit-farmer-phone"
                      type="tel"
                      required
                      placeholder="Ej. +56 9 9876 5432"
                      value={visitForm.phone}
                      onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                      className="w-full bg-limestone border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Variedad de Interés Principal</label>
                    <select
                      id="visit-crop-select"
                      value={visitForm.cropType}
                      onChange={(e) => setVisitForm({ ...visitForm, cropType: e.target.value })}
                      className="w-full bg-limestone border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest font-medium"
                    >
                      <option value="Maíz Híbrido">Maíz Híbrido Silero</option>
                      <option value="Alfalfa Forraje">Alfalfa Forraje Persistente</option>
                      <option value="Frutales Pesados">Frutales y Árboles de Secano</option>
                      <option value="Mapeo NPK Suelo">Sólo Mapeo NPK Macroporos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Fecha de la Inspección Solicitada</label>
                    <input
                      id="visit-pref-date"
                      type="date"
                      required
                      value={visitForm.prefDate}
                      onChange={(e) => setVisitForm({ ...visitForm, prefDate: e.target.value })}
                      className="w-full bg-limestone border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest font-bold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Ubicación Rural o Coordenadas de Entrada</label>
                    <input
                      id="visit-address"
                      type="text"
                      required
                      placeholder="Ej. Camino Antiguo Champa Km 12.5, Fundo El Olivar, Hijuela 4"
                      value={visitForm.address}
                      onChange={(e) => setVisitForm({ ...visitForm, address: e.target.value })}
                      className="w-full bg-limestone border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button
                      id="btn-submit-visit-request"
                      type="submit"
                      className="w-full bg-forest hover:bg-forest-hover text-white font-extrabold text-xs py-3.5 px-4 rounded-[4px] shadow-none transition-colors cursor-pointer text-center uppercase tracking-wider"
                    >
                      Agendar Visita de Campo
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Booked list */}
            <div className="mt-8 border-t border-black/10 pt-6">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3 block font-semibold">
                Bitácora de Salidas Fitosanitarias Agendadas:
              </h5>
              <div className="space-y-2.5">
                {visitList.map((vis) => (
                  <div
                    key={vis.id}
                    className="flex items-center justify-between p-3.5 rounded-sm border border-black/10 bg-limestone text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-forest shrink-0" />
                      <div>
                        <span className="font-bold text-ink block">{vis.crop}</span>
                        <span className="text-zinc-500 block text-[11px] mt-0.5">{vis.name}</span>
                      </div>
                    </div>
                    <span className="bg-white border border-black/10 text-zinc-700 text-[10px] font-bold px-2.5 py-1 rounded-sm shrink-0">
                      📅 {vis.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT COMPANY SECTION (#nosotros) */}
      <section id="nosotros" className="bg-white py-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] uppercase font-semibold text-forest tracking-widest px-3 py-1 bg-forest-light rounded-sm inline-block">
                Trayectoria Fitosanitaria Chilena
              </span>
              <h3 className="text-3xl font-bold text-ink tracking-tight leading-tight font-display italic">
                Impulsando la Transformación Tecnológica del Agro
              </h3>
              <p className="text-zinc-650 text-sm leading-relaxed">
                Fundada hace más de 20 años como un pequeño almacén de insumos genéricos, **AgroIndustrial** ha crecido para convertirse en la red logística autorizada predilecta de la región central. Suministramos herramientas analíticas de precisión de última generación y fitosanitarios con sellos ecológicos de menor impacto ambiental.
              </p>
              <p className="text-zinc-650 text-sm leading-relaxed">
                Nuestra misión principal es erradicar las deficiencias de microelementos que degradan la fertilidad del suelo, proporcionando a los productores agrícolas tanto familiares como industriales las herramientas necesarias para enfrentar las contingencias de sequía climática y plagas con total seguridad.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold text-ink">
                <div className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-forest shrink-0" />
                  <span>Laboratorio Especializado</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-forest shrink-0" />
                  <span>Distribución Autorizada</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-forest shrink-0" />
                  <span>Soporte Oficial DJI Agras</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle2 className="w-5 h-5 text-forest shrink-0" />
                  <span>Semillas Fitosanitarias</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              {/* Image assembly representing agricultural machinery and field work */}
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&h=500&q=80"
                  alt="Laboratorio de semillas"
                  className="rounded-sm object-cover h-80 w-full border border-black/10 shadow-none"
                />
                <img
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&h=500&q=80"
                  alt="Tractor en campo"
                  className="rounded-sm object-cover h-80 w-full border border-black/10 shadow-none mt-8"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION (#contacto) */}
      <section id="contacto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-sm border border-black/10 shadow-none p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left info column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] uppercase font-semibold text-forest tracking-widest block mb-1">
                  Atención Directa al Productor
                </span>
                <h3 className="text-3xl font-bold text-ink tracking-tight font-display italic">
                  Oficina Central de Suministros
                </h3>
                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                  ¿Tiene consultas respecto al despacho o necesita un presupuesto formal consolidado para licitaciones estatales o de cooperativas? Consúltenos directamente.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-forest shrink-0" />
                  <div>
                    <span className="block font-bold text-ink uppercase tracking-wider text-[11px]">Dirección Física:</span>
                    <span className="text-zinc-500">Panamericana Sur Km 180, Talca, Región del Maule</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-forest shrink-0" />
                  <div>
                    <span className="block font-bold text-ink uppercase tracking-wider text-[11px]">Teléfono Directo:</span>
                    <span className="text-zinc-500">+56 71 234 5678 / Móvil: +56 9 9876 5432</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-forest shrink-0" />
                  <div>
                    <span className="block font-bold text-ink uppercase tracking-wider text-[11px]">Correo Electrónico Oficial:</span>
                    <span className="text-zinc-500">despachos@ventaagroindustrial.cl</span>
                  </div>
                </div>
              </div>

              {/* simulated mini interactive google maps frame indicator */}
              <div className="bg-limestone rounded-sm p-4 border border-black/10 flex items-center gap-3 text-xs">
                <div className="w-12 h-12 bg-forest/10 rounded-sm overflow-hidden shrink-0 flex items-center justify-center font-bold text-xl text-forest border border-forest/15">
                  🗺️
                </div>
                <div>
                  <h5 className="font-bold text-ink uppercase tracking-wider">Ubicación Coordinada GPS</h5>
                  <p className="text-zinc-500 text-[11px] mt-0.5 leading-none">Silos de Acopio junto a Autopista central.</p>
                </div>
              </div>
            </div>

            {/* Right contact form */}
            <div className="lg:col-span-7 bg-limestone rounded-sm border border-black/10 p-6 flex flex-col justify-between">
              
              {contactFormSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-14 h-14 bg-forest/20 text-forest rounded-sm flex items-center justify-center text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-base font-display italic">¡Mensaje Recepcionado, {contactName}!</h4>
                    <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                      Hemos transmitido tus requerimientos técnicos al área de ventas y despacho. Un especialista agropecuario te responderá en breve.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setContactFormSubmitted(false);
                      setContactName('');
                    }}
                    className="bg-forest hover:bg-forest-hover text-white font-bold text-xs py-2 px-4 rounded-sm cursor-pointer uppercase tracking-wider"
                  >
                    Enviar otro mensaje corporativo
                  </button>
                </div>
              ) : (
                <form
                  id="contact-general-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactFormSubmitted(true);
                    triggerNotification(`Mensaje de contacto agrónomo recibido.`);
                  }}
                  className="space-y-4"
                >
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em] mb-2 font-semibold">
                    Formulario de Consulta Directa
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Nombre Completo</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ej. Manuel Allende"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Correo Electrónico</label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="Ej. manuel@fundoallende.cl"
                        className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider font-semibold">Fundo o Nombre de Parcela</label>
                    <input
                      id="contact-farm-name"
                      type="text"
                      placeholder="Ej. Fundo El Roble, Hijuela B"
                      className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Tu Mensaje Agronómico u Pedido de Cotización</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Indique detalladamente si requiere fitosanitarios con visado especial, dosis de nitrógeno estimadas, o presupuestos de tractor custom."
                      className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>

                  <button
                    id="btn-submit-contact-general"
                    type="submit"
                    className="w-full bg-forest hover:bg-forest-hover text-white font-extrabold text-xs py-3.5 px-4 rounded-[4px] shadow-none transition-colors cursor-pointer text-center uppercase tracking-wider"
                  >
                    Enviar Mensaje Agrícola
                  </button>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* DETAILED ROOT FOOTER */}
      <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#18181b] text-white rounded-sm border border-zinc-800">
                <Sprout className="w-5 h-5 text-forest" />
              </div>
              <h4 className="text-white font-bold text-lg font-display italic">Venta Agroindustrial</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              La mayor distribuidora de semillas certificadas de forraje, tractores de alta exigencia, bioestimulantes y sensores LoRaWAN integrados para la agricultura de precisión.
            </p>
            <div className="flex gap-2">
              <span className="px-2.5 py-1.5 bg-[#18181b] border border-zinc-800 text-[9px] text-zinc-300 rounded-sm font-bold tracking-widest">OMRI LISTED</span>
              <span className="px-2.5 py-1.5 bg-[#18181b] border border-zinc-800 text-[9px] text-zinc-300 rounded-sm font-bold tracking-widest">SAG/ICA VISADO</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Gama de Insumos</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#productos" className="hover:text-forest transition-colors">Maquinaria John Deere y DJI</a></li>
              <li><a href="#productos" className="hover:text-forest transition-colors">Semillas Híbridas de Alta Densidad</a></li>
              <li><a href="#productos" className="hover:text-forest transition-colors">Foliantes Estimulantes de Cuaje</a></li>
              <li><a href="#productos" className="hover:text-forest transition-colors">Sensores IoT Termo-Húmedos</a></li>
              <li><a href="#productos" className="hover:text-forest transition-colors">Analizadores Mecánicos de Arcilla</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Ayuda Agronómica</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#calculadora-agronomica" className="hover:text-forest transition-colors">Calculadora de Semillas por Hectárea</a></li>
              <li><a href="#visitas" className="hover:text-forest transition-colors">Reserva de Ingeniero en Fundo</a></li>
              <li><a href="#asesoria-agronomo" className="hover:text-forest transition-colors">Asistente Virtual AgroBot</a></li>
              <li><a href="#nosotros" className="hover:text-forest transition-colors">Preguntas Fitosanitarias Frecuentes</a></li>
              <li><a href="#contacto" className="hover:text-forest transition-colors">Coordenadas de Silos Centrales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Suscripción al Boletín Climático</h4>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Reciba en su celular correos con alertas tempranas de heladas, pronósticos de lluvias estacionales e invitaciones a ferias de cosechadoras de maíz.
            </p>
            <form
              id="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                triggerNotification("¡Inscrito al boletín de heladas y clima agrícola!");
                (e.target as HTMLFormElement).reset();
              }}
              className="flex gap-2 text-xs"
            >
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Tu email de campo"
                className="bg-[#1a1a1d] text-white rounded-sm p-2.5 flex-1 focus:outline-none focus:border-forest border border-zinc-800 text-xs"
              />
              <button
                id="btn-submit-newsletter"
                type="submit"
                className="bg-forest hover:bg-forest-hover font-bold px-3 py-2 rounded-sm text-white cursor-pointer uppercase text-[10px] tracking-wider"
              >
                Inscribir
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500">
          <div>
            <p>&copy; {new Date().getFullYear()} Venta de Productos Agroindustriales. Todos los derechos reservados. Distribución autorizada.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Aviso de Tratamiento Certificados</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Términos del Flete Predial</a>
          </div>
        </div>
      </footer>

      {/* OUT-PAGE DETAIL MODAL PORTALS */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onNotification={triggerNotification}
        />
      )}

      {/* OUT-PAGE SLIDEOVERS */}
      {isCartOpen && (
        <CartSlideOver
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onNotification={triggerNotification}
        />
      )}

      {/* FLOATING BOT SHORTCUT BUTTON (when chat not open in column but user wants easy toggle) */}
      {!isAssistantOpen && (
        <div id="floating-bot-trigger-root" className="fixed bottom-6 right-6 z-40">
          <button
            id="btn-bot-floating-trigger"
            onClick={() => {
              setIsAssistantOpen(true);
              // scroll to chat block for immediate view
              setTimeout(() => {
                const element = document.getElementById('asesoria-agronomo');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="w-14 h-14 bg-forest hover:bg-forest-hover text-white rounded-sm flex items-center justify-center shadow-none transition-all hover:scale-105 cursor-pointer border border-[#fff]/10"
            title="Asesoría Agrónoma Inteligente"
          >
            <MessageSquare className="w-5 h-5 animate-pulse" />
          </button>
        </div>
      )}

    </div>
  );
}
