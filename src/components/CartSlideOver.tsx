import { useState, FormEvent } from 'react';
import { X, Trash2, ShieldAlert, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, Product } from '../types';

interface CartSlideOverProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNotification: (msg: string) => void;
}

export function CartSlideOver({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNotification
}: CartSlideOverProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [shippingMethod, setShippingMethod] = useState<'warehouse' | 'rural_cargo'>('warehouse');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    taxId: '', // RUT/RFC/CUIT/DNI for agro invoicing
    ruralAddress: '',
    municipality: '',
    notes: ''
  });

  const [orderSummary, setOrderSummary] = useState({
    orderId: '',
    deliveryDate: ''
  });

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      if (item.product.price === 'consultar') return total;
      return total + (item.product.price as number) * item.quantity;
    }, 0);
  };

  const getShippingFee = () => {
    if (shippingMethod === 'rural_cargo') {
      // flat rate cargo delivery for bulky goods
      return 85; 
    }
    return 0; // Pick up at central warehouse has zero fee
  };

  const getTotal = () => {
    return getSubtotal() + getShippingFee();
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = `AGRO-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Estimate logistics: usually 3 business days
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    setOrderSummary({
      orderId: id,
      deliveryDate: delivery.toLocaleDateString('es-ES', options)
    });
    setStep('success');
    onClearCart();
    onNotification(`¡Pedido ${id} procesado con éxito!`);
  };

  return (
    <div id="cart-slideover-root" className="fixed inset-0 z-50 overflow-hidden bg-ink/80 backdrop-blur-xs flex justify-end">
      <div id="cart-drawer-container" className="bg-white w-full max-w-lg h-full shadow-none flex flex-col justify-between border-l border-black/15 animate-fade-in">
        
        {/* HEADER */}
        <div className="p-5 border-b border-black/10 flex items-center justify-between bg-limestone">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-forest-light text-forest rounded-sm border border-forest/15">
              <Truck className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-ink text-lg font-display italic">
                {step === 'cart' ? 'Detalle de Compra' : step === 'checkout' ? 'Despacho Agropecuario' : 'Confirmación de Pedido'}
              </h3>
              <p className="text-[11px] text-zinc-500 font-medium">
                {step === 'cart' ? `${cart.length} productos listos para procesar` : step === 'checkout' ? 'Ingresa tus coordenadas de entrega' : 'Tu pedido está en camino'}
              </p>
            </div>
          </div>
          <button
            id="btn-close-cart"
            onClick={onClose}
            className="text-zinc-500 hover:text-ink p-1.5 hover:bg-zinc-100 rounded-sm transition-colors cursor-pointer border border-transparent hover:border-black/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-zinc-200">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-sm bg-limestone border border-black/10 flex items-center justify-center text-3xl shadow-none">
                    🌾
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-base font-display italic">Tu carrito está vacío</h4>
                    <p className="text-zinc-500 text-xs mt-1.5 max-w-xs">
                      Explora nuestro catálogo de maquinaria pesada, fertilizantes foliares, semillas certificadas y tecnología de riego.
                    </p>
                  </div>
                  <button
                    id="btn-back-to-shop"
                    onClick={onClose}
                    className="bg-forest hover:bg-forest-hover text-white font-bold text-xs py-2 px-4 rounded-[4px] shadow-none transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    Volver a la Tienda
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3.5 rounded-sm border border-black/10 bg-limestone hover:border-black/20 transition-colors items-center text-xs"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-sm object-cover border border-black/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-forest bg-forest-light px-1.5 py-0.5 rounded-sm tracking-wider">
                          {item.product.category}
                        </span>
                        <h4 className="font-bold text-ink text-sm truncate mt-1">
                          {item.product.name}
                        </h4>
                        <p className="text-zinc-400 text-[11px] mt-0.5">
                          Unidad: {item.product.unit}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-zinc-500 mr-1.5 font-medium">Cant:</span>
                            <div className="flex items-center border border-black/10 rounded-sm bg-white overflow-hidden text-xs">
                              <button
                                id={`qty-dec-${item.product.id}`}
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100 font-bold"
                              >
                                -
                              </button>
                              <span className="px-2 font-bold text-ink min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                id={`qty-inc-${item.product.id}`}
                                onClick={() => onUpdateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                                className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100 font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-zinc-400 block text-[9px] uppercase tracking-wider font-semibold">Subtotal</span>
                            <span className="text-sm font-extrabold text-ink leading-tight">
                              {item.product.price === 'consultar'
                                ? 'Cotización'
                                : `$${((item.product.price as number) * item.quantity).toLocaleString('es-ES')} USD`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        id={`remove-item-${item.product.id}`}
                        onClick={() => {
                          onRemoveItem(item.product.id);
                          onNotification(`Removido ${item.product.name} de la orden.`);
                        }}
                        className="text-zinc-400 hover:text-earth p-1.5 bg-white border border-black/10 hover:border-earth/30 rounded-sm shrink-0 transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="mt-8 border-t border-black/10 pt-5 space-y-3.5">
                    <div className="flex items-start gap-2.5 bg-forest-light border border-forest/15 p-3.5 rounded-sm text-xs text-ink">
                      <Sparkles className="w-5 h-5 text-forest shrink-0" />
                      <div>
                        <strong>Despacho Consolidado:</strong> Puedes elegir entre retirar directamente en nuestros galpones de acopio agrícola o solicitar flete de carga industrial a tu predio rural.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="express-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em] mb-4 font-semibold">
                Información de Facturación y Entrega
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Nombre Completo del Productor / Empresa</label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    placeholder="Ej. Juan Carlos Pérez / Sucesión Agropecuaria S.A."
                    value={shippingDetails.fullName}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Teléfono Móvil o Radio</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      placeholder="Ej. +56 9 8765 4321"
                      value={shippingDetails.phone}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Identificador Fiscal / RUT</label>
                    <input
                      id="checkout-taxid"
                      type="text"
                      required
                      placeholder="Ej. RUT: 76.123.456-K"
                      value={shippingDetails.taxId}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, taxId: e.target.value })}
                      className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5 uppercase tracking-wider">Método de Logística Agrícola</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="ship-warehouse"
                      type="button"
                      onClick={() => setShippingMethod('warehouse')}
                      className={`p-3 rounded-sm border text-left transition-all ${
                        shippingMethod === 'warehouse'
                          ? 'border-forest bg-forest-light text-forest font-bold'
                          : 'border-black/10 hover:border-black/20 text-zinc-650 bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold uppercase tracking-wider">Retiro en Galpón</span>
                      <span className="block text-[10px] text-zinc-500 mt-0.5">Silos Centrales 0$ Costo</span>
                    </button>
                    <button
                      id="ship-cargo"
                      type="button"
                      onClick={() => setShippingMethod('rural_cargo')}
                      className={`p-3 rounded-sm border text-left transition-all ${
                        shippingMethod === 'rural_cargo'
                          ? 'border-forest bg-forest-light text-forest font-bold'
                          : 'border-black/10 hover:border-black/20 text-zinc-650 bg-white'
                      }`}
                    >
                      <span className="block text-xs font-bold uppercase tracking-wider">Despacho de Carga</span>
                      <span className="block text-[10px] text-zinc-500 mt-0.5">A Predio Rural +$85 USD</span>
                    </button>
                  </div>
                </div>

                {shippingMethod === 'rural_cargo' && (
                  <div className="space-y-3 animate-fade-in">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider font-semibold">Dirección de Predio o Coordenadas GPS</label>
                      <input
                        id="checkout-address"
                        type="text"
                        required
                        placeholder="Ej. Km 45 Ruta Nacional, Fundo San Francisco"
                        value={shippingDetails.ruralAddress}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, ruralAddress: e.target.value })}
                        className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Comuna / Provincia / Localidad</label>
                      <input
                        id="checkout-municipality"
                        type="text"
                        required
                        placeholder="Ej. Talca, El Maule"
                        value={shippingDetails.municipality}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, municipality: e.target.value })}
                        className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1 uppercase tracking-wider">Instrucciones Especiales para el Chofer (Opcional)</label>
                  <textarea
                    id="checkout-notes"
                    rows={2}
                    placeholder="Ej. Entrar por el portón verde de fierro al fondo del camino de tierra..."
                    value={shippingDetails.notes}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, notes: e.target.value })}
                    className="w-full bg-white border border-black/10 rounded-sm p-3 text-xs text-ink focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-205 p-3.5 rounded-sm flex items-start gap-2 text-xs text-amber-900 leading-relaxed">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                <p>
                  *Insumos como fertilizantes químicos de amplio espectro requieren visado fitosanitario oficial tras la compra. Nuestro equipo lo coordinará telefónicamente.
                </p>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-20 h-20 rounded-sm bg-forest-light border border-forest/15 flex items-center justify-center text-forest">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-forest bg-forest-light px-3 py-1 rounded-sm tracking-wider">
                  Pedido Autorizado
                </span>
                <h4 className="font-bold text-ink text-xl mt-3 font-display italic">¡Orden Generada Exitosamente!</h4>
                <p className="text-zinc-500 text-xs mt-2 max-w-sm mx-auto">
                  Hemos enviado la nota de compra y la solicitud de visado agrícola a tu correo electrónico. Un flete técnico consolidará tu carga.
                </p>
              </div>

              <div className="bg-limestone border border-black/10 p-5 rounded-sm w-full text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-black/10">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px]">N° de Guía Agroindustrial:</span>
                  <span className="font-mono font-bold text-ink">{orderSummary.orderId}</span>
                </div>
                <div className="flex justify-between items-start text-xs pb-2 border-b border-black/10">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px]">Coordinado para:</span>
                  <span className="font-bold text-ink max-w-[200px] text-right">{shippingDetails.fullName || 'Productor Destinatario'}</span>
                </div>
                <div className="flex justify-between items-start text-xs pb-2 border-b border-black/10">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px]">Método de Entrega:</span>
                  <span className="font-bold text-forest text-right">
                    {shippingMethod === 'warehouse' ? 'Retiro en Silos de Acopio' : 'Flete de Carga a Predio'}
                  </span>
                </div>
                <div className="flex justify-between items-start text-xs">
                  <span className="text-zinc-500 font-medium uppercase tracking-wider text-[10px]">Fecha de Arribo Estimada:</span>
                  <span className="font-bold text-ink text-right">{orderSummary.deliveryDate}</span>
                </div>
              </div>

              <button
                id="btn-return-shop-success"
                onClick={() => {
                  setStep('cart');
                  onClose();
                }}
                className="w-full bg-forest hover:bg-forest-hover text-white font-bold py-3.5 px-4 rounded-[4px] text-sm transition-colors cursor-pointer uppercase tracking-wider"
              >
                Volver a la Tienda principal
              </button>
            </div>
          )}
        </div>

        {/* FOOTER SUMMARY & BUTTONS (if not in success state) */}
        {cart.length > 0 && step !== 'success' && (
          <div className="p-5 border-t border-black/10 bg-limestone shrink-0 space-y-4 animate-fade-in">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Subtotal de insumos:</span>
                <span className="font-bold text-ink">${getSubtotal().toLocaleString('es-ES')} USD</span>
              </div>
              {step === 'checkout' && (
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Logística y flete ({shippingMethod === 'warehouse' ? 'Retiro en Silos' : 'Predial'}):</span>
                  <span className="font-bold text-ink">
                    {getShippingFee() === 0 ? 'Sin Costo' : `$${getShippingFee()} USD`}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-black/10">
                <span className="text-sm font-bold text-ink uppercase tracking-wider">Total Estimado:</span>
                <span className="text-xl font-extrabold text-forest font-sans">
                  ${getTotal().toLocaleString('es-ES')} USD
                </span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                id="btn-go-to-checkout"
                onClick={() => setStep('checkout')}
                className="w-full bg-forest hover:bg-forest-hover text-white font-bold py-3.5 px-4 rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm shadow-none uppercase tracking-wider"
              >
                Continuar con Despacho Agrícola
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  id="btn-back-to-cart"
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-1/3 border border-black/15 bg-white hover:bg-zinc-50 text-zinc-650 font-bold py-3.5 px-2 rounded-[4px] transition-colors text-xs cursor-pointer uppercase tracking-wider"
                >
                  Modificar Carro
                </button>
                <button
                  id="btn-confirm-order"
                  type="submit"
                  form="express-checkout-form"
                  className="flex-1 bg-forest hover:bg-forest-hover text-white font-bold py-3.5 px-4 rounded-[4px] transition-all text-xs cursor-pointer text-center uppercase tracking-wider"
                >
                  Confirmar Pedido Fitosanitario
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
