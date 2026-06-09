import { useState } from 'react';
import { Calculator, Sprout, ShoppingCart, Info, TrendingUp, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface AgroCalculatorProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onNotification: (msg: string) => void;
}

export function AgroCalculator({ onAddToCart, onNotification }: AgroCalculatorProps) {
  const [hectares, setHectares] = useState<number>(10);
  const [cropType, setCropType] = useState<string>('corn');
  const [soilType, setSoilType] = useState<string>('normal');
  const [calculatorType, setCalculatorType] = useState<'seeds' | 'fertilizer'>('seeds');

  // Calculation parameters
  const seedRates = {
    corn: { kgPerHa: 25, productId: 'sem-1', label: 'Maíz Híbrido AgroYield-Gold' },
    alfalfa: { kgPerHa: 28, productId: 'sem-2', label: 'Alfalfa Multicorte UltraForage' },
    default: { kgPerHa: 20, productId: 'sem-1', label: 'Semilla Estándar' }
  };

  const fertilizerRates = {
    poor: { kgPerHa: 400, productId: 'fer-1', label: 'Fertilizante Orgánico BioNutri-Sol' },
    normal: { kgPerHa: 250, productId: 'fer-1', label: 'Fertilizante Orgánico BioNutri-Sol' },
    rich: { kgPerHa: 150, productId: 'fer-2', label: 'BioEstimulante Foliar (Garrafas 5L)' }
  };

  const selectedSeedProduct = PRODUCTS.find(
    p => p.id === (cropType === 'alfalfa' ? 'sem-2' : 'sem-1')
  );
  
  const selectedFertilizerProduct = PRODUCTS.find(
    p => p.id === (soilType === 'rich' ? 'fer-2' : 'fer-1')
  );

  // Math
  const getSeedsQuantity = () => {
    const rate = cropType === 'alfalfa' ? seedRates.alfalfa.kgPerHa : seedRates.corn.kgPerHa;
    const totalKg = rate * hectares;
    // Each bag is 25kg
    return Math.ceil(totalKg / 25);
  };

  const getFertilizerQuantity = () => {
    const rate = soilType === 'rich' ? 1 : soilType === 'poor' ? 10 : 6; // dosage unit conversion logic
    const totalVolume = Math.ceil(hectares * rate);
    return totalVolume;
  };

  const handleAddCalculated = () => {
    if (calculatorType === 'seeds' && selectedSeedProduct) {
      const qty = getSeedsQuantity();
      onAddToCart(selectedSeedProduct, qty);
      onNotification(`Añadido ${qty} sacos de ${selectedSeedProduct.name} sugeridos para ${hectares} Ha.`);
    } else if (calculatorType === 'fertilizer' && selectedFertilizerProduct) {
      const qty = getFertilizerQuantity();
      onAddToCart(selectedFertilizerProduct, qty);
      onNotification(`Añadido ${qty} unidades de ${selectedFertilizerProduct.name} estimadas para tu cultivo.`);
    }
  };

  return (
    <div id="calculadora-agronomica" className="bg-white rounded-sm border border-black/10 shadow-none p-6 lg:p-8 transition-transform">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-black/10 pb-5">
        <div>
          <span className="inline-flex items-center gap-1 text-forest bg-forest-light px-3 py-1 rounded-sm text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-forest" />
            Herramienta Técnica
          </span>
          <h3 className="text-2xl font-bold text-ink tracking-tight flex items-center gap-2 font-display italic">
            <Calculator className="w-6 h-6 text-forest" id="icon-calc" />
            Calculadora de Insumos Agropecuarios
          </h3>
          <p className="text-zinc-500 text-sm mt-1">
            Estima de forma científica el volumen y presupuesto aproximado que requiere tu siembra.
          </p>
        </div>
        
        {/* Toggle selector */}
        <div className="flex bg-limestone p-1 rounded-sm border border-black/10">
          <button
            id="toggle-seeds"
            onClick={() => setCalculatorType('seeds')}
            className={`px-4 py-2 text-xs font-bold rounded-sm transition-all cursor-pointer ${
              calculatorType === 'seeds'
                ? 'bg-forest text-white shadow-none font-bold'
                : 'text-zinc-600 hover:text-ink'
            }`}
          >
            Semillas Requeridas
          </button>
          <button
            id="toggle-fertilizers"
            onClick={() => setCalculatorType('fertilizer')}
            className={`px-4 py-2 text-xs font-bold rounded-sm transition-all cursor-pointer ${
              calculatorType === 'fertilizer'
                ? 'bg-forest text-white shadow-none font-bold'
                : 'text-zinc-600 hover:text-ink'
            }`}
          >
            Nutrición de Suelo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
              Superficie de Cultivo (Hectáreas)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="input-hectares"
                type="range"
                min="1"
                max="250"
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                className="w-full excel-range accent-forest cursor-pointer"
              />
              <div className="flex items-center gap-1 border border-black/10 bg-limestone px-3 py-1.5 rounded-sm text-sm font-bold text-ink min-w-[70px] justify-center">
                <span>{hectares}</span>
                <span className="text-xs text-zinc-500 font-normal">Ha</span>
              </div>
            </div>
          </div>

          {calculatorType === 'seeds' ? (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Especie de Cultivo Principal
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn-crop-corn"
                  onClick={() => setCropType('corn')}
                  className={`flex flex-col items-center justify-center p-3 rounded-sm border text-center transition-all cursor-pointer ${
                    cropType === 'corn'
                      ? 'border-forest bg-forest-light text-forest font-bold'
                      : 'border-black/10 hover:border-black/20 text-zinc-605 bg-white'
                  }`}
                >
                  <span className="text-xl mb-1">🌽</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Maíz Híbrido</span>
                  <span className="text-[10px] text-zinc-400 mt-1">25kg por Ha</span>
                </button>
                <button
                  id="btn-crop-alfalfa"
                  onClick={() => setCropType('alfalfa')}
                  className={`flex flex-col items-center justify-center p-3 rounded-sm border text-center transition-all cursor-pointer ${
                    cropType === 'alfalfa'
                      ? 'border-forest bg-forest-light text-forest font-bold'
                      : 'border-black/10 hover:border-black/20 text-zinc-605 bg-white'
                  }`}
                >
                  <span className="text-xl mb-1">🌱</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-semibold">Alfalfa Forraje</span>
                  <span className="text-[10px] text-zinc-400 mt-1">28kg por Ha</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
                Diagnóstico de Fertilidad del Suelo
              </label>
              <div className="space-y-2">
                {[
                  { value: 'poor', label: 'Baja (Suelo desgastado o arenoso)', desc: 'Requiere corrección mineral densa' },
                  { value: 'normal', label: 'Media (Suelo estándar de labranza)', desc: 'Nutrición balanceada estándar' },
                  { value: 'rich', label: 'Óptima (Suelo rico con arcilla)', desc: 'Estimulación foliar y mantenimiento' }
                ].map((item) => (
                  <button
                    key={item.value}
                    id={`btn-soil-${item.value}`}
                    onClick={() => setSoilType(item.value)}
                    className={`w-full flex items-center justify-between p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      soilType === item.value
                        ? 'border-forest bg-forest-light text-forest'
                        : 'border-black/10 hover:border-black/20 text-zinc-650 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      soilType === item.value ? 'border-forest bg-forest' : 'border-zinc-300'
                    }`}>
                      {soilType === item.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-limestone border border-black/10 p-4 rounded-sm flex items-start gap-2.5 text-xs text-zinc-650 leading-relaxed">
            <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
            <p>
              *Nota agronómica: El cálculo se basa en densidades empíricas generales. Para planes de siembra críticos, recomendamos un análisis técnico de suelo en nuestro laboratorio físico.
            </p>
          </div>
        </div>

        {/* RESULTS CARD COLUMN */}
        <div className="lg:col-span-7 bg-limestone border border-black/10 p-6 rounded-sm flex flex-col justify-between">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-4 flex items-center gap-1.5 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-forest" />
              Resultado y Dosificación Recomendados
            </h4>

            {calculatorType === 'seeds' && selectedSeedProduct ? (
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <img
                    src={selectedSeedProduct.imageUrl}
                    alt={selectedSeedProduct.name}
                    className="w-16 h-16 rounded-sm object-cover border border-black/10"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-forest bg-forest-light px-2 py-0.5 rounded-sm tracking-widest">
                      Insumo Seleccionado
                    </span>
                    <h5 className="font-bold text-ink text-base mt-2 font-display italic">
                      {selectedSeedProduct.name}
                    </h5>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {selectedSeedProduct.unit}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-sm border border-black/10">
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      Bolsas de 25kg
                    </span>
                    <span className="text-3xl font-extrabold text-forest">
                      {getSeedsQuantity()}
                    </span>
                    <span className="text-xs text-zinc-500 ml-1 font-bold">unidades</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                      Presupuesto Est.
                    </span>
                    <span className="text-3xl font-extrabold text-ink">
                      ${(getSeedsQuantity() * (selectedSeedProduct.price as number)).toLocaleString('es-ES')}
                    </span>
                    <span className="text-xs text-zinc-500 ml-1 font-bold">USD</span>
                  </div>
                </div>

                <div className="bg-white border border-black/10 p-3 rounded-sm text-xs text-zinc-700 mt-2 leading-relaxed">
                  <Sprout className="inline-block w-3.5 h-3.5 mr-1 text-forest align-text-top" />
                  <strong>Recomendación de siembra:</strong> Coloca aproximadamente{' '}
                  {cropType === 'alfalfa' ? '28' : '25'} kg por hectárea con una profundidad de{' '}
                  {cropType === 'alfalfa' ? '1.5 - 2 cm' : '4 - 5 cm'} para propiciar una germinación robusta.
                </div>
              </div>
            ) : (
              selectedFertilizerProduct && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <img
                      src={selectedFertilizerProduct.imageUrl}
                      alt={selectedFertilizerProduct.name}
                      className="w-16 h-16 rounded-sm object-cover border border-black/10"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-forest bg-forest-light px-2 py-0.5 rounded-sm tracking-widest">
                        Insumo Sugerido de Suelo
                      </span>
                      <h5 className="font-bold text-ink text-base mt-2 font-display italic">
                        {selectedFertilizerProduct.name}
                      </h5>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {selectedFertilizerProduct.unit}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-sm border border-black/10">
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                        Unidad sugerida
                      </span>
                      <span className="text-3xl font-extrabold text-forest">
                        {getFertilizerQuantity()}
                      </span>
                      <span className="text-xs text-zinc-500 ml-1 font-bold">{selectedFertilizerProduct.unit.split(' ')[0]}s</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                        Costo Estimado
                      </span>
                      <span className="text-3xl font-extrabold text-ink">
                        ${(getFertilizerQuantity() * (selectedFertilizerProduct.price as number)).toLocaleString('es-ES')}
                      </span>
                      <span className="text-xs text-zinc-500 ml-1 font-bold">USD</span>
                    </div>
                  </div>

                  <div className="bg-white border border-black/10 p-3 rounded-sm text-xs text-zinc-700 mt-2 leading-relaxed">
                    <Sprout className="inline-block w-3.5 h-3.5 mr-1 text-forest align-text-top" />
                    <strong>Pauta de Nutrición:</strong> Aplicar de manera localizada en surcos o pulverización foliar programada temprano por la mañana para maximizar el índice de absorción estomática.
                  </div>
                </div>
              )
            )}
          </div>

          <button
            id="btn-calc-add-cart"
            onClick={handleAddCalculated}
            className="w-full mt-6 bg-forest hover:bg-forest-hover text-white font-bold py-3.5 px-4 rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-none uppercase tracking-wider"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir Cantidad al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
