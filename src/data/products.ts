import { Product, Category } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'maq-1',
    name: 'Tractor de Alta Potencia AgroPro 95 HP',
    category: 'maquinaria',
    description: 'Tractor robusto diseñado para labranza profunda con transmisión hidrostática y cabina climatizada ergonómica.',
    fullDescription: 'El AgroPro 95 HP es la máxima representación de tecnología y potencia para campos exigentes. Su motor diésel turbo-intercooler entrega un par superior a bajas revoluciones, optimizando el consumo de combustible bajo cargas pesadas. Cuenta con tracción 4WD, mandos servoasistidos de alta precisión y un sistema hidráulico de flujo constante ideal para acoplar sembradoras, rastras y cosechadoras modernas. Además, su cabina con reducción acústica del 80% y aire acondicionado de alto flujo protege la salud del operador durante jornadas extensas.',
    price: 'consultar',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    badges: ['Más Vendido', 'Garantía 3 Años', 'Trasmisión Reforzada'],
    specs: [
      { label: 'Potencia', value: '95 HP @ 2200 RPM' },
      { label: 'Combustible', value: 'Diésel - Capacidad 120 L' },
      { label: 'Tracción', value: '4 x 4 con bloqueo electrohidráulico' },
      { label: 'Caja de cambios', value: '12 Marchas de Avance + 12 de Retroceso' },
      { label: 'Capacidad de Levante', value: '3,200 kg a los tres puntos' }
    ],
    stock: 3,
    rating: 4.9,
    reviewsCount: 14,
    unit: 'Unidad'
  },
  {
    id: 'maq-2',
    name: 'Dron de Fumigación Agrícola AeroSpray T50',
    category: 'maquinaria',
    description: 'Dron autónomo equipado con tanque inteligente de 40L, radar de evasión esférico y sistema de pulverización centrífugo.',
    fullDescription: 'Optimiza la aplicación de fitosanitarios y fertilizantes foliares con el AeroSpray T50. Este dron de última generación reduce el uso de agua en hasta un 90% y aumenta la precisión de adherencia foliar gracias a sus boquillas de atomización centrífuga magnética. Equipado con radares de matriz en fase activa y visión binocular, navega de forma 100% autónoma esquivando obstáculos en terrenos inclinados o con arboledas densas. Incluye control de flujo en milisegundos sincronizado con la velocidad de vuelo para una dosificación homogénea.',
    price: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80',
    badges: ['Alta Tecnología', 'Precisión GPS RTK', 'Tanque de 40 Litros'],
    specs: [
      { label: 'Capacidad depósito', value: '40 Litros líquidos / 50 kg sólidos' },
      { label: 'Rendimiento por hora', value: 'Hasta 21 hectáreas' },
      { label: 'Ancho de aspersión', value: '8 a 11 metros' },
      { label: 'Batería', value: 'Litio inteligente - Carga ultrarrápida (9 min)' },
      { label: 'Posicionamiento', value: 'Centi-métrico con GPS RTK + Glonass' }
    ],
    stock: 5,
    rating: 4.8,
    reviewsCount: 8,
    unit: 'Kit Completo'
  },
  {
    id: 'sem-1',
    name: 'Semilla de Maíz Híbrido AgroYield-Gold',
    category: 'semillas',
    description: 'Semilla híbrida certificada de alto rendimiento con resistencia extrema a estrés hídrico y plagas de cogollos.',
    fullDescription: 'El híbrido de maíz AgroYield-Gold ha sido genéticamente seleccionado para maximizar la cosecha tanto en regadío como en secano templado. Presenta un vigor de emergencia sobresaliente, tallos de alta resistencia al vuelco climático y un llenado de mazorca completo hasta la punta. Tiene incorporada tolerancia innata a las principales enfermedades de raíz y del tallo, ofreciendo una alta densidad de siembra sin comprometer el calibre del grano. Ideal para producción tanto de grano comercial como de ensilaje balanceado de alta digestibilidad.',
    price: 135,
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    badges: ['Híbrido Premium', 'Certificado Orgánico', '99% Germinación'],
    specs: [
      { label: 'Densidad sugerida', value: '75,000 - 85,000 plantas / Ha' },
      { label: 'Ciclo biológico', value: 'Intermedio (125 - 132 días a madurez)' },
      { label: 'Tratamiento de semilla', value: 'Fungicida + Insecticida sistémico protector' },
      { label: 'Rendimiento potencial', value: '14 - 17 Toneladas por Hectárea' },
      { label: 'Pureza física', value: '99.8%' }
    ],
    stock: 120,
    rating: 4.7,
    reviewsCount: 32,
    unit: 'Bolsa 25 kg'
  },
  {
    id: 'sem-2',
    name: 'Semilla de Alfalfa Multicorte UltraForage',
    category: 'semillas',
    description: 'Semilla inoculada de alfalfa con latencia invernal ideal para producción constante de heno de alto contenido proteico.',
    fullDescription: 'La alfalfa UltraForage ofrece una persistencia de stand líder en el mercado agropecuario, soportando hasta 6 cortes anuales con rápidos tiempos de recuperación entre cortes. Viene pre-inoculada con bacterias rizobios específicas y protegida con recubrimiento hidrófilo que asegura una retención óptima de humedad en la plántula recién emergida. Desarrolla una raíz pivotante profunda altamente eficiente para extraer nutrientes difíciles de alcanzar y sobrellevar sequías estacionales. Ideal para ganaderías de alta producción láctea.',
    price: 245,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    badges: ['Excelente Persistencia', 'Inoculada', 'Fibra Extra Fina'],
    specs: [
      { label: 'Latencia', value: 'Grupo 9 (Invernal muy activa)' },
      { label: 'Porcentaje Proteína', value: '22% - 24% en pre-floración' },
      { label: 'Frecuencia de corte', value: 'Cada 28 - 32 días' },
      { label: 'Dosis recomendada', value: '25 a 30 kg por Hectárea' },
      { label: 'Resistencia a nematodos', value: 'Totalmente resistente' }
    ],
    stock: 85,
    rating: 4.6,
    reviewsCount: 19,
    unit: 'Bolsa 25 kg'
  },
  {
    id: 'fer-1',
    name: 'Fertilizante Orgánico Concentrado BioNutri-Sol',
    category: 'fertilizantes',
    description: 'Abono orgánico-mineral a base de aminoácidos, ácidos fúlvicos y microelementos quelatados de rápida asimilación.',
    fullDescription: 'BioNutri-Sol es una solución ecológica y balanceada para enriquecer suelos desgastados y propiciar una floración exhuberante. Contiene un alta concentración de Nitrógeno, Fósforo y Potasio (NPK 12-8-15) de origen completamente natural, estabilizado con materia orgánica compostada de origen vegetal y marino. Estimula la microbiota benéfica del suelo, mejorando la retención de agua y la aireación de las raíces. Su presentación granulada permite una liberación controlada durante 45 días sin peligro de lixivación.',
    price: 45,
    imageUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
    badges: ['Eco-Amigable', 'Nutrición Prolongada', 'NPK Balanceado'],
    specs: [
      { label: 'Composición', value: 'NPK 12-8-15 + 4% Magnesio + Micros' },
      { label: 'Presentación', value: 'Pellets deshidratados libres de malezas' },
      { label: ' pH', value: '6.5 - Estabilizador de acidez' },
      { label: 'Dosificación general', value: '300 - 500 kg por Hectárea según análisis' },
      { label: 'Certificación', value: 'Apto para agricultura orgánica OMRI' }
    ],
    stock: 450,
    rating: 4.9,
    reviewsCount: 54,
    unit: 'Saco 40 kg'
  },
  {
    id: 'fer-2',
    name: 'Fertilizante Foliar BioEstimulante de Floración',
    category: 'fertilizantes',
    description: 'Spray estimulador de cuaje foliar con extracto de algas pardas Ascophyllum nodosum y boro-zinc quelatado.',
    fullDescription: 'Este bioestimulante ultra-soluble actúa como un corrector rápido de deficiencias nutricionales críticads antes de la floración y durante la fijación del fruto. Gracias a las hormonas de crecimiento naturales presentes en las algas marinas árticas, activa el metabolismo celular de las hojas, incrementando la resistencia al choque térmico por heladas repentinas u olas de calor. El boro y el zinc incorporados aceleran la viabilidad del polen, reduciendo drásticamente la caída de flores en frutales, solanáceas y leguminosas.',
    price: 32,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    badges: ['Asimilación Inmediata', 'Extracto de Algas', 'Evita Caída de Flor'],
    specs: [
      { label: 'Aplicación', value: 'Pulverización foliar o goteo fino' },
      { label: 'Concentración Nitrógeno', value: '5% enriquecido con Ácidos Aminados' },
      { label: 'Microelementos', value: 'Boro 1.5%, Zinc 3.2% quelatados con EDTA' },
      { label: 'Frecuencia de uso', value: '2 a 3 aplicaciones por ciclo productivo' },
      { label: 'Disolución', value: '1 a 2 Litros por cada 200 Litros de agua' }
    ],
    stock: 200,
    rating: 4.8,
    reviewsCount: 26,
    unit: 'Garrafa 5 L'
  },
  {
    id: 'her-1',
    name: 'Motosierra de Altura Profesional AgroCut X',
    category: 'herramientas',
    description: 'Motosierra a gasolina ergonómica con eje telescópico de acople rápido para poda de seguridad forestal de frutales.',
    fullDescription: 'La poda de frutales y árboles forestales requiere fiabilidad y ligereza para largas jornadas elevadas. La AgroCut X posee un motor monocilíndrico de 2 tiempos de arrranque suave por descompresión inteligente, reduciendo el tirón en frío en un 60%. Su eje de fibra de carbono permite extender su longitud total hasta los 3.9 metros de forma balanceada y sin fatiga. Cuenta con lubricación automática ajustable de cadena y freno de inercia instantáneo QuickStop para máxima seguridad del trabajador agrícola.',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1590105253874-423951085335?auto=format&fit=crop&w=800&q=80',
    badges: ['Uso Profesional', 'Eje Extensible', 'Bajo Consumo Combustible'],
    specs: [
      { label: 'Cilindrada', value: '31.4 cm³' },
      { label: 'Longitud del sable', value: '30 cm / 12 pulgadas' },
      { label: 'Alcance total máximo', value: 'Hasta 5 metros incluyendo al operario' },
      { label: 'Peso en seco', value: '6.4 kg' },
      { label: 'Filtro de aire', value: 'Larga duración con sistema de pre-separación' }
    ],
    stock: 18,
    rating: 4.7,
    reviewsCount: 11,
    unit: 'Unidad'
  },
  {
    id: 'her-2',
    name: 'Analizador Portátil de Suelos 4-en-1 ProTester',
    category: 'herramientas',
    description: 'Estación de medición digital instantánea de pH, humedad, temperatura y luminosidad solar en la zona radicular.',
    fullDescription: 'Toma decisiones agronómicas fundamentadas con mediciones in situ en segundos. El ProTester cuenta con una sonda de aleación de aluminio y cobre ultra-sensible capaz de medir de forma no destructiva la acidez del suelo (pH de 3.5 a 9.0), el nivel de humedad porcentual de la tierra, la temperatura térmica del sustrato y la intensidad de la luz solar recibida en ese punto exacto. Con pantalla LCD retroiluminada de fácil lectura y calibración automática integrada.',
    price: 78,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    badges: ['Medición Instantánea', 'Sin Baterías Químicas', 'Durabilidad de Campo'],
    specs: [
      { label: 'Rango de pH', value: '3.5 - 9.0 (Precisión +/- 0.2)' },
      { label: 'Temperatura operativa', value: '-9 °C hasta +50 °C' },
      { label: 'Longitud de sonda', value: '200 mm' },
      { label: 'Alimentación', value: 'Batería 9V de bajo consumo con apagado automático' },
      { label: 'Materiales', value: 'Plástico ABS reforzado y sonda metálica anticorrosiva' }
    ],
    stock: 75,
    rating: 4.5,
    reviewsCount: 41,
    unit: 'Unidad'
  },
  {
    id: 'tec-1',
    name: 'Sistema de Riego Programable IoT SmartGrow',
    category: 'tecnologia',
    description: 'Controlador de riego inteligente conectado a Wi-Fi y Bluetooth, sincronizado con pronósticos de clima en tiempo real.',
    fullDescription: 'Lleva la agricultura de precisión a tu parcela o invernadero con el controlador SmartGrow de 8 zonas independientes. Este dispositivo se conecta a internet para descargar informes de meteorología locales y decide de manera autónoma si omitir el riego diario programado en caso de lluvia prevista o subir la tasa si se reportan vientos desecantes. Es compatible con válvulas solenoides estándar de 24VCA y se gestiona mediante una hermosa aplicación móvil con gráficas de consumo de agua por metro cúbico.',
    price: 189,
    imageUrl: 'https://images.unsplash.com/photo-1563514223300-b3b0d235e2f7?auto=format&fit=crop&w=800&q=80',
    badges: ['Agricultura de Precisión', 'Ahorro 40% Agua', 'Control Remoto APP'],
    specs: [
      { label: 'Zonas de riego', value: '8 canales ampliables a 16' },
      { label: 'Conectividad', value: 'Wi-Fi 2.4 GHz y Bluetooth LE' },
      { label: 'Tensión de salida', value: '24 VAC para electroválvulas' },
      { label: 'Gabinete exterior', value: 'Clasificación impermeable IP65' },
      { label: 'Sensores soportados', value: 'Lluvia, caudalímetros e interruptores de flujo' }
    ],
    stock: 22,
    rating: 4.9,
    reviewsCount: 15,
    unit: 'Kit Controlador'
  },
  {
    id: 'tec-2',
    name: 'Sonda Multiespectral de Suelos NPK Inalámbrica',
    category: 'tecnologia',
    description: 'Sensor electroquímico estacionario con transmisión LoRaWAN para vigilar nitrógeno, fósforo y potasio en tiempo real.',
    fullDescription: 'Deja de adivinar el estado nutricional de tus cultivos. Esta robusta sonda de enterrado permanente mide el contenido de Nitrógeno (N), Fósforo (P) y Potasio (K) mediante un arreglo electroquímico de calibración autolimpiante. Envía telemetría inalámbrica cada hora mediante protocolo LoRaWAN con un alcance de hasta 12 km hasta el router base, o vía Bluetooth directo al celular de monitoreo. Su batería interna sellada proporciona hasta 5 años de servicio sin recargas.',
    price: 310,
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    badges: ['LoRaWAN 12 km', 'Batería 5 Años', 'Sensor NPK Real'],
    specs: [
      { label: 'Rango de medición', value: '0 - 1999 mg/kg (mg/L)' },
      { label: 'Precisión', value: 'Dentro del +/- 5% margen real' },
      { label: 'Alimentación', value: 'Batería de Litio Tionilo de alta resistencia' },
      { label: 'Protección extrema', value: 'Sellado al vacío con resina epoxi IP68' },
      { label: 'Método medición', value: 'Electrodos de platino con sensor conductivo' }
    ],
    stock: 14,
    rating: 4.8,
    reviewsCount: 9,
    unit: 'Unidad'
  }
];

export const CATEGORY_LABELS: Record<Category, string> = {
  maquinaria: 'Maquinaria Pesada',
  semillas: 'Semillas Certificadas',
  fertilizantes: 'Fertilizantes y Nutrición',
  herramientas: 'Herramientas y Analizadores',
  tecnologia: 'Tecnología Agropecuaria'
};
