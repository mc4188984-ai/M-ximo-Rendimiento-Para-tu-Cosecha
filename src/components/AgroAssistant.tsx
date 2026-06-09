import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product, ConsultationMessage } from '../types';
import { PRODUCTS } from '../data/products';

interface AgroAssistantProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onNotification: (msg: string) => void;
}

export function AgroAssistant({ onAddToCart, onSelectProduct, onNotification }: AgroAssistantProps) {
  const [messages, setMessages] = useState<ConsultationMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Soy AgroBot, tu asesor agrónomo digital. 🌾 ¿Qué cultivo estás trabajando hoy o qué inquietudes técnicas tienes sobre tu campo? Escríbeme o elige una asesoría rápida abajo:',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    { label: '🌽 Plagas en Maizal', text: 'Tengo problemas de plagas y bajo rendimiento en mi siembra de maíz.' },
    { label: '💧 Riego Tecnológico', text: '¿Cómo puedo tecnificar mi riego y ahorrar agua en mi cultivo?' },
    { label: '🧪 Suelo Desgastado', text: 'Mi suelo está perdiendo nutrientes y mis rendimientos bajaron.' },
    { label: '🚜 Cotizar Gran Tractor', text: 'Quisiera asesoría técnica y cotización para un tractor de alta potencia.' }
  ];

  // Simple clever agronomist reply system
  const getBotResponse = (input: string): { reply: string; matchIds?: string[] } => {
    const text = input.toLowerCase();
    
    if (text.includes('maiz') || text.includes('maíz') || text.includes('plaga') || text.includes('cogollo')) {
      return {
        reply: 'Para el cultivo de maíz te sugerimos nuestro híbrido prémium **AgroYield-Gold** que tiene resistencia genética al gusano cogollero y sequías. Para su aplicación foliar de precisión contra insectos, el dron **AeroSpray T50** incrementará tu eficiencia un 90% con respecto al tractor tradicional.',
        matchIds: ['sem-1', 'maq-2']
      };
    }
    
    if (text.includes('riego') || text.includes('agua') || text.includes('tecnificar') || text.includes('goteo')) {
      return {
        reply: 'Excelente decisión para combatir el estrés hídrico. El controlador programable **SmartGrow IoT** se sincroniza con el satélite climático regional para irrigar solo cuando es necesario. Complementado con la **Sonda Multiespectral NPK LoRaWAN**, monitoreas la humedad radicular a tiempo real en tu teléfono.',
        matchIds: ['tec-1', 'tec-2']
      };
    }

    if (text.includes('suelo') || text.includes('nutrientes') || text.includes('fertilizante') || text.includes('abono') || text.includes('ph') || text.includes('acidez')) {
      return {
        reply: 'El primer paso crítico es el diagnóstico. Te recomendamos el **Analizador Portátil 4-en-1 ProTester** para medir el pH radicular tú mismo. Si la tierra está degradada, la dosificación de **BioNutri-Sol** regenerará microbialmente la estructura biológica de tus surcos de siembra.',
        matchIds: ['her-2', 'fer-1']
      };
    }

    if (text.includes('tractor') || text.includes('maquinaria') || text.includes('pesada') || text.includes('cotizar') || text.includes('agropro')) {
      return {
        reply: 'Para labores pesadas de arada y siembra, el **Tractor AgroPro 95 HP** es inigualable en tracción de 3 puntos y bajo consumo diésel. Veo que se trata de una inversión agroindustrial crítica; puedes pulsar el botón de cotización para que un especialista técnico te arme un plan de financiamiento a medida.',
        matchIds: ['maq-1']
      };
    }

    if (text.includes('alfalfa') || text.includes('forraje') || text.includes('pasto') || text.includes('alimento') || text.includes('ganado')) {
      return {
        reply: 'Para hatos lecheros y engorde, cultivar alfalfa con nuestra semilla **UltraForage** pre-inoculada con bacterias rizobios es la mejor elección. Soporta rigurosos sistemas de hasta 6 cortes anuales con alta proteína bruta de hoja.',
        matchIds: ['sem-2', 'fer-2']
      };
    }

    return {
      reply: 'Como especialista en agrotecnología, te comento que proveemos insumos certificados de alta especificación. Contamos con semillas certificadas, drones de esparcimiento autónomo, fertilizantes biológicos y sensores LoRaWAN. Cuéntame sobre tus hectáreas y tipo de cultivo para calcular juntos la receta exacta.',
      matchIds: ['sem-1', 'fer-1', 'tec-1']
    };
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ConsultationMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate agronomy thinking
    setTimeout(() => {
      const { reply, matchIds } = getBotResponse(textToSend);
      const assistantMsg: ConsultationMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        suggestedProducts: matchIds,
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 600);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: '¡Historial restaurado! Estoy listo para resolver cualquier duda agronómica o coordinar una cotización.',
        timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div id="asesoria-agronomo" className="bg-[#111112] text-zinc-100 rounded-sm overflow-hidden border border-zinc-800 shadow-none flex flex-col h-[580px] transition-all">
      {/* HEADER */}
      <div className="bg-[#18181b] px-5 py-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-sm bg-forest-light border border-forest/15 flex items-center justify-center">
            <Bot className="w-5 h-5 text-forest" />
          </div>
          <div>
            <h4 id="bot-title" className="text-xs font-bold tracking-widest text-white flex items-center gap-1.5 leading-tight uppercase">
              Asistente Agronómico I.A. 
              <span className="w-2 h-2 rounded-full bg-forest inline-block animate-pulse" />
            </h4>
            <span className="text-[11px] text-zinc-400">Consultoría e insumos a tiempo real</span>
          </div>
        </div>
        <button
          id="btn-clear-chat"
          onClick={handleClear}
          title="Limpiar Conversación"
          className="text-zinc-400 hover:text-white p-1.5 rounded-sm hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700/50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* CHAT MESSAGES PANEL */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <div
              className={`px-4 py-3 rounded-sm text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-forest text-white rounded-br-none font-medium'
                  : 'bg-[#18181b] text-zinc-300 border border-zinc-800 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* RECOMMENDED PRODUCTS SECTION */}
              {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2.5">
                  <span className="text-[9px] font-bold text-forest uppercase tracking-[0.12em] block">
                    🌾 Productos Recomendados por el Especialista:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {msg.suggestedProducts.map(pId => {
                      const prod = PRODUCTS.find(p => p.id === pId);
                      if (!prod) return null;
                      return (
                        <div
                          key={pId}
                          className="bg-black border border-zinc-800 p-2.5 rounded-sm flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-10 h-10 rounded-sm object-cover border border-zinc-800 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-white line-clamp-1">{prod.name}</div>
                              <div className="text-[11px] text-forest font-bold mt-0.5">
                                {prod.price === 'consultar' ? 'Cotizar' : `$${prod.price} USD`}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              id={`bot-view-${prod.id}`}
                              onClick={() => onSelectProduct(prod)}
                              className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 px-2.5 py-1 rounded-sm font-semibold transition-colors text-[11px]"
                            >
                              Ver Ficha
                            </button>
                            {prod.price !== 'consultar' && (
                              <button
                                id={`bot-add-${prod.id}`}
                                onClick={() => {
                                    onAddToCart(prod, 1);
                                    onNotification(`Añadido ${prod.name} al carrito`);
                                }}
                                className="bg-forest hover:bg-forest-hover text-white p-1.5 rounded-sm transition-colors cursor-pointer"
                                title="Añadir 1 al Carrito"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* QUICK PROMPTS CHIPS */}
      <div className="px-4 py-2 border-t border-zinc-800 shrink-0 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none bg-[#111112]">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            id={`quick-prompt-${idx}`}
            onClick={() => handleSend(q.text)}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#18181b] hover:bg-[#1a1a1d] text-zinc-300 hover:text-white px-3.5 py-2 rounded-sm transition-all border border-zinc-800 shrink-0 cursor-pointer"
          >
            {q.label}
            <ArrowRight className="w-3 h-3 text-forest animate-pulse" />
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form
        id="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputText);
        }}
        className="p-3 bg-[#18181b] border-t border-zinc-800 flex gap-2 shrink-0"
      >
        <input
          id="chat-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu consulta sobre cultivos, herbecidas..."
          className="flex-1 bg-[#1a1a1d] text-white rounded-sm px-4 py-3 text-xs border border-zinc-800 focus:outline-none focus:border-forest transition-colors placeholder-zinc-500"
        />
        <button
          id="btn-send-chat"
          type="submit"
          disabled={!inputText.trim()}
          className="bg-forest hover:bg-forest-hover disabled:bg-zinc-800 disabled:text-zinc-650 text-white p-3 rounded-sm transition-colors shrink-0 flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
