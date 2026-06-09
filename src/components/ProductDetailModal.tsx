import { useState, FormEvent } from 'react';
import { X, Check, ArrowRight, ShieldCheck, FileText, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onNotification: (msg: string) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart, onNotification }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    phone: '',
    cropSize: '15-50',
    location: '',
    message: ''
  });

  const isQuoteOnly = product.price === 'consultar';

  const handleQuoteSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    onNotification(`Solicitud de cotización de ${product.name} enviada con éxito.`);
  };

  const handleAddToCartLocal = () => {
    onAddToCart(product, quantity);
    onNotification(`Añadido ${quantity} unidad(es) de ${product.name} al carrito.`);
    onClose();
  };

  return (
    <div id="product-detail-modal-root" className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div id="product-modal-container" className="bg-white rounded-sm overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-black/15 shadow-none relative flex flex-col md:flex-row animate-fade-in">
        
        {/* Close Button */}
        <button
          id="btn-close-modal"
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-ink hover:text-black p-2 rounded-sm border border-black/10 z-10 transition-all cursor-pointer shadow-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: PRODUCT IMAGE & BADGES */}
        <div className="md:w-1/2 bg-limestone border-r border-black/10 p-6 flex flex-col justify-between">
          <div>
            <div className="relative rounded-sm overflow-hidden border border-black/10 aspect-video md:aspect-square">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="bg-ink text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-500' : 'text-zinc-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-ink">{product.rating}</span>
                <span className="text-xs text-zinc-400">({product.reviewsCount} opiniones verificadas)</span>
              </div>
              <h3 className="text-2xl font-bold text-ink leading-tight font-display italic">
                {product.name}
              </h3>
              <p className="text-zinc-500 text-xs mt-1">Categoría: <span className="text-forest font-bold uppercase tracking-wider text-[11px]">{product.category}</span></p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-black/15 text-xs text-zinc-650 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-forest shrink-0" />
              <span>Insumo de distribución autorizada con certificación de fábrica.</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-forest shrink-0" />
              <span>Incluye ficha técnica y manual de dosificación/operación oficial.</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DESCRIPTION, SPECS & PURCHASE / QUOTE FORM */}
        <div className="md:w-1/2 p-6 lg:p-8 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Precio Unitario</span>
              {isQuoteOnly ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-earth uppercase tracking-normal">Precio a Cotizar</span>
                  <span className="text-xs text-zinc-500">Sujeto a requerimiento de campo</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-ink">
                    ${(product.price as number).toLocaleString('es-ES')}
                  </span>
                  <span className="text-sm font-bold text-zinc-500">USD / {product.unit}</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2">Información Técnica Detallada</h4>
              <p className="text-zinc-650 text-sm leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-2.5">Especificaciones del Fabricante</h4>
              <div className="grid grid-cols-1 gap-2">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-black/10 pb-1 text-xs">
                    <span className="text-zinc-500">{spec.label}</span>
                    <span className="font-bold text-ink">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10">
            {isQuoteOnly ? (
              /* MACHINERY QUOTE FORM */
              quoteSubmitted ? (
                <div className="bg-forest-light border border-forest/15 p-4 rounded-sm text-center">
                  <span className="inline-flex p-2 bg-forest/10 text-forest rounded-sm mb-2 font-bold">
                    <Check className="w-5 h-5" />
                  </span>
                  <h4 className="text-sm font-bold text-forest">¡Cotización Solicitada!</h4>
                  <p className="text-xs text-zinc-650 mt-1">
                    Un asesor agroindustrial se contactará contigo vía telefónica y correo electrónico para elaborar tu cotización formal.
                  </p>
                </div>
              ) : (
                <form id="quote-request-form" onSubmit={handleQuoteSubmit} className="space-y-3 bg-limestone p-4 rounded-sm border border-black/10">
                  <h4 className="text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-forest" />
                    Solicitar Cotización de Equipo
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      id="quote-name"
                      type="text"
                      required
                      placeholder="Nombre completo"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                    <input
                      id="quote-phone"
                      type="tel"
                      required
                      placeholder="N° Teléfono"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      id="quote-location"
                      type="text"
                      required
                      placeholder="Localidad / Provincia"
                      value={quoteForm.location}
                      onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                      className="bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                    <select
                      id="quote-crop-size"
                      value={quoteForm.cropSize}
                      onChange={(e) => setQuoteForm({ ...quoteForm, cropSize: e.target.value })}
                      className="bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    >
                      <option value="1-15">1 - 15 Hectáreas</option>
                      <option value="15-50">15 - 50 Hectáreas</option>
                      <option value="50-150">50 - 150 Hectáreas</option>
                      <option value="150+">Más de 150 Hectáreas</option>
                    </select>
                  </div>
                  <textarea
                    id="quote-message"
                    rows={2}
                    placeholder="Describe los cultivos o requerimientos específicos..."
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                  />
                  <button
                    id="btn-submit-quote-request"
                    type="submit"
                    className="w-full bg-forest hover:bg-forest-hover text-white font-bold py-3 px-4 rounded-[4px] text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    Generar Propuesta y Enviar
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )
            ) : (
              /* STANDARD ADD TO CART Controls */
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-limestone border border-black/10 p-3 rounded-sm">
                  <span className="text-xs font-bold text-zinc-650">Stock disponible:</span>
                  <span className="text-xs bg-forest-light text-forest font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {product.stock} {product.unit}s
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex items-center border border-black/10 rounded-sm bg-white overflow-hidden shrink-0">
                    <button
                      id="btn-qty-dec"
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-2 text-zinc-650 hover:bg-zinc-100 active:bg-zinc-200 transition-colors text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 text-sm font-bold text-ink min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      id="btn-qty-inc"
                      type="button"
                      onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                      className="px-3 py-2 text-zinc-650 hover:bg-zinc-100 active:bg-zinc-200 transition-colors text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="btn-detail-add-cart"
                    onClick={handleAddToCartLocal}
                    className="flex-1 bg-forest hover:bg-forest-hover text-white font-bold py-3 px-4 rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm uppercase tracking-wider shadow-none"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
