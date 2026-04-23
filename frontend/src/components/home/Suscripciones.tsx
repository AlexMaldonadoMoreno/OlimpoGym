import React, { useRef, useEffect, useState } from 'react';
import {
    Clock,
    Zap,
    Trophy,
    Star,
    CheckCircle2,
    ArrowUpRight,
    Dumbbell,
    Users,
    Droplets,
    ClipboardList
} from 'lucide-react';

const plans = [
    {
        id: 'I',
        title: 'VISITA',
        price: '70',
        period: '/día',
        desc: 'Perfecto para conocer nuestras instalaciones.',
        features: ['Acceso al santuario', '1 sesión cardio', 'Vestidor'],
        btnText: 'ACCESO POR 1 DÍA COMPLETO',
        icon: Clock,
        isPopular: false,
        isValue: false,
    },
    {
        id: 'II',
        title: 'SEMANAL',
        price: '239',
        period: '/semana',
        desc: 'Flexibilidad para entrenar por una semana.',
        features: ['Acceso completo 7 días', '2 clases grupales', 'Evaluación inicial'],
        btnText: 'ACCESO COMPLETO POR 7 DÍAS',
        icon: Zap,
        isPopular: false,
        isValue: false,
    },
    {
        id: 'III',
        title: 'MENSUAL',
        price: '519',
        period: '/mes',
        desc: 'La opción más elegida por nuestros miembros.',
        features: ['Acceso ilimitado 30 días', 'Entrenador olímpico 2x/sem', 'Rutina personalizada', 'Nutriólogo incluido'],
        btnText: 'ACCESO COMPLETO 30 DÍAS',
        icon: Trophy,
        isPopular: true, // Activa el estilo dorado completo
        isValue: false,
        badgeText: 'MÁS POPULAR'
    },
    {
        id: 'IV',
        title: 'ANUAL',
        price: '4999',
        period: '/año',
        desc: 'Máximo ahorro para los inmortales.',
        features: ['Acceso ilimitado 365 días', 'Fisioterapia mensual', 'Retiro élite anual', 'Invitado gratis 4x'],
        btnText: 'ACCESO 365 DÍAS',
        icon: Star,
        isPopular: false,
        isValue: true, // Activa un brillo sutil y la cápsula
        badgeText: 'MAYOR VALOR'
    }
];

const Suscripciones = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const planRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Lógica para el auto-scroll y sincronización de indicadores
    useEffect(() => {
        // 1. Lógica para empezar en la tarjeta "Mensual" en móvil/tablet
        const findMonthlyIndex = plans.findIndex(plan => plan.isPopular);
        if (carouselRef.current && planRefs.current[findMonthlyIndex] && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const monthlyCard = planRefs.current[findMonthlyIndex];
            if (container && monthlyCard) {
                container.scrollTo({ left: monthlyCard.offsetLeft - container.offsetLeft, behavior: 'auto' });
                setActiveIndex(findMonthlyIndex); // Establecemos el indicador inicial
            }
        }

        // 2. Lógica para el auto-play
        const interval = setInterval(() => {
            if (carouselRef.current && window.innerWidth < 1024 && !isHovered) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                // Si llegamos al final (con un margen), regresamos al inicio
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Hacemos scroll por el ancho de la ventana
                    carouselRef.current.scrollBy({ left: clientWidth * 0.85, behavior: 'smooth' });
                }
            }
        }, 4000); // Cambia de tarjeta cada 4 segundos

        return () => clearInterval(interval);
    }, [isHovered]);

    // Lógica para sincronizar el indicador al hacer scroll (automático o manual)
    const handleScroll = () => {
        if (carouselRef.current && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const { scrollLeft, clientWidth } = container;
            const index = Math.round(scrollLeft / (clientWidth * 0.85)); // 0.85 es el ancho relativo de las cards
            if (index >= 0 && index < plans.length) {
                setActiveIndex(index);
            }
        }
    };

    const handleIndicatorClick = (index: number) => {
        if (carouselRef.current && planRefs.current[index] && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const card = planRefs.current[index];
            if (container && card) {
                container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
                setActiveIndex(index);
            }
        }
    };

    return (
        <section className="relative bg-[#050505] pt-0 pb-24 md:pt-4 md:pb-32 overflow-hidden font-sans">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                {/* === 1. ENCABEZADO === */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-px bg-[#c5a059]"></div>
                            <span className="text-[10px] text-[#c5a059] font-semibold tracking-[0.3em] uppercase">
                                RITO DE MEMBRESÍA
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-serif font-black leading-[0.9] tracking-tight drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                            <span className="block text-transparent [-webkit-text-stroke:1px_#c5a059] md:[-webkit-text-stroke:1.5px_#c5a059] opacity-80">
                                ELIGE TU
                            </span>
                            <span className="block text-[#c5a059] mt-2">
                                PACTO DIVINO
                            </span>
                        </h2>
                    </div>

                    <p className="text-[11px] md:text-xs text-zinc-400 font-semibold tracking-[0.15em] uppercase leading-relaxed max-w-md lg:pb-3">
                        CUATRO CAMINOS, UNA SOLA META: LA GRANDEZA. CADA PACTO SELLA TU LUGAR ENTRE LOS ESCOGIDOS.
                    </p>
                </div>

                {/* === 2. BANNER: INCLUIDO EN CADA MEMBRESÍA === */}
                <div className="w-full bg-[#0a0a0a] border border-[#c5a059]/20 rounded-[2rem] p-8 md:p-10 mb-16 shadow-2xl">
                    {/* Divisor con texto centrado */}
                    <div className="flex items-center justify-center gap-6 mb-10">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c5a059]/30"></div>
                        <span className="text-[10px] md:text-xs text-[#c5a059] font-bold tracking-[0.3em] uppercase whitespace-nowrap">
                            INCLUIDO EN CADA MEMBRESÍA
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c5a059]/30"></div>
                    </div>

                    {/* Iconos de beneficios - Información ampliada */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <IncludedFeature Icon={Dumbbell} text="Todas las áreas del gimnasio" />
                        <IncludedFeature Icon={Users} text="Entrenadores de élite" />
                        <IncludedFeature Icon={Droplets} text="Vestidores y duchas" />
                        <IncludedFeature Icon={ClipboardList} text="Catálogo de rutinas" />
                    </div>
                </div>

                {/* === 3. GRILLA DE PRECIOS / CARRUSEL MÓVIL === */}
                {/* En móviles es un flex horizontal con snap, en desktop es la grilla asimétrica */}
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    className="flex lg:grid lg:grid-cols-12 gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {plans.map((plan, idx) => (
                        <div
                            key={plan.id}
                            ref={(el) => { planRefs.current[idx] = el; }}
                            className={`w-[85vw] sm:w-[60vw] lg:w-auto shrink-0 snap-center lg:col-span-3 lg:min-h-[450px] relative group overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 lg:hover:shadow-[0_10px_40px_-10px_rgba(197,160,89,0.15)]
                ${plan.isPopular
                                ? 'border-[#c5a059]/50 shadow-[0_0_40px_rgba(197,160,89,0.15)] bg-[#0a0a0a] lg:scale-105 lg:-translate-y-3 lg:hover:z-10'
                                : plan.isValue
                                    ? 'border-[#c5a059]/30 shadow-[0_0_30px_rgba(197,160,89,0.05)] bg-[#0a0a0a]'
                                    : 'border-[#c5a059]/10 bg-[#0a0a0a]/50 hover:border-[#c5a059]/30'
                            }`}
                        >

                            {/* Contenedor interno para los brillos (Glows) */}
                            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
                                {plan.isPopular && (
                                    <>
                                        {/* Brillo Top-Right, más esquinado */}
                                        <div className="absolute top-[-5rem] right-[-5rem] w-64 h-64 bg-[#c5a059]/10 rounded-full blur-[90px]" />
                                        {/* Brillo Bottom-Left, más esquinado */}
                                        <div className="absolute bottom-[-5rem] left-[-5rem] w-64 h-64 bg-[#c5a059]/10 rounded-full blur-[90px]" />
                                    </>
                                )}
                                {plan.isValue && (
                                    <div className="absolute top-0 left-0 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-[60px]" />
                                )}
                            </div>

                            {/* Cápsula superior (Flotante) */}
                            {(plan.isPopular || plan.isValue) && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#c5a059] rounded-full shadow-lg z-20">
                                    <span className="text-[9px] text-black font-black tracking-[0.2em] uppercase whitespace-nowrap">
                                        {plan.badgeText}
                                    </span>
                                </div>
                            )}

                            {/* Contenido de la Tarjeta */}
                            <div className="relative z-10 flex flex-col h-full p-8">

                                {/* Header Tarjeta: Icono y Número Romano */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center justify-center w-12 h-12 border border-[#c5a059]/30 rounded-xl bg-black/40">
                                        <plan.icon className="w-5 h-5 text-[#c5a059]" strokeWidth={1.5} />
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-mono font-bold">{plan.id}</span>
                                </div>

                                {/* Título y Precio */}
                                <h3 className="text-xl font-serif font-bold text-white tracking-[0.1em] mb-2">
                                    {plan.title}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-[#c5a059] font-serif text-2xl">$</span>
                                    <span className="text-[#c5a059] font-serif text-5xl font-bold">{plan.price}</span>
                                    <span className="text-zinc-500 text-[10px] tracking-widest font-semibold ml-1">{plan.period}</span>
                                </div>

                                {/* Descripción */}
                                <p className="text-[11px] text-zinc-400 leading-relaxed mb-8 h-8 transform transition-transform duration-500 group-hover:translate-x-1">
                                    {plan.desc}
                                </p>

                                {/* Lista de Features */}
                                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 transform transition-transform duration-500 group-hover:translate-x-1">
                                            <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                                            <span className="text-[11px] text-zinc-300 font-medium tracking-wide">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Botón de Acción */}
                                <button
                                    className={`w-full group relative overflow-hidden flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300
                    ${plan.isPopular
                                        ? 'bg-gradient-to-r from-[#dfba76] to-[#b38b42] text-black shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] lg:group-hover:-translate-y-1'
                                        : 'border border-[#c5a059]/30 text-[#c5a059] hover:bg-[#c5a059]/10'
                                    }`}
                                >
                                    <span className={`text-[9px] font-black tracking-[0.2em] uppercase relative z-10 ${plan.isPopular ? 'text-black' : 'text-[#c5a059]'}`}>
                                        {plan.btnText}
                                    </span>
                                    <ArrowUpRight className={`w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${plan.isPopular ? 'text-black' : 'text-[#c5a059]'}`} />
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

                {/* === INDICADORES DEL CARRUSEL (Móvil) === */}
                <div className="flex lg:hidden justify-center items-center gap-3 mt-6">
                    {plans.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleIndicatorClick(idx)}
                            className={`w-2.5 h-2.5 rounded-full border border-[#c5a059]/30 transition-all duration-300 ${activeIndex === idx ? 'bg-[#c5a059] w-6 border-[#c5a059]' : 'bg-black'}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

/* --- SUBCOMPONENTE PARA EL BANNER (Información ampliada) --- */
const IncludedFeature = ({ Icon, text }: { Icon: React.ElementType, text: string }) => (
    <div className="flex items-center gap-4 group cursor-default">
        <div className="flex items-center justify-center w-11 h-11 border border-[#c5a059]/20 rounded-[10px] bg-black/50 transition-all duration-300 group-hover:border-[#c5a059]/60">
            <Icon className="w-4.5 h-4.5 text-[#c5a059]" strokeWidth={1.5} />
        </div>
        <span className="text-[13px] text-zinc-300 font-medium tracking-wide">
            {text}
        </span>
    </div>
);

export default Suscripciones;