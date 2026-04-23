import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Star, Plus, Flame } from 'lucide-react';

const products = [
    {
        id: 'I',
        category: 'PROTEÍNA WHEY',
        title: 'PROTEÍNA WHEY',
        price: '1,249',
        rating: '4.9',
        sold: '2.4K',
        image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=800&auto=format&fit=crop', // Botella oscura/suplemento
        badge: 'BESTSELLER',
        badgeIcon: Flame
    },
    {
        id: 'II',
        category: 'PRE-ENTRENO',
        title: 'PRE-ENTRENO',
        price: '899',
        rating: '4.8',
        sold: '1.8K',
        image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop', // Abstracto oscuro energía
        badge: 'NUEVO',
        badgeIcon: Flame
    },
    {
        id: 'III',
        category: 'CREATINA PURA',
        title: 'CREATINA PURA',
        price: '649',
        rating: '4.9',
        sold: '3.1K',
        image: 'https://images.unsplash.com/photo-1622031093150-511a9eb4db23?q=80&w=800&auto=format&fit=crop', // Polvo/textura oscura
        badge: null
    },
    {
        id: 'IV',
        category: 'AMINOÁCIDOS BCAA',
        title: 'AMINOÁCIDOS BCAA',
        price: '749',
        rating: '4.7',
        sold: '950',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop', // Gym oscuro
        badge: 'POPULAR',
        badgeIcon: Flame
    },
    {
        id: 'V',
        category: 'CREATINA PURA',
        title: 'CREATINA PURA',
        price: '999',
        rating: '4.6',
        sold: '1.2K',
        image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop', // Textura abstracta/fuego
        badge: null
    },
    {
        id: 'VI',
        category: 'MULTIVITAMÍNICO',
        title: 'AMINOÁCIDOS BCAA',
        price: '549',
        rating: '4.9',
        sold: '2.8K',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5e4a13d05?q=80&w=800&auto=format&fit=crop', // Cápsulas oscuras
        badge: 'ESENCIAL',
        badgeIcon: Star
    }
];

const Productos = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Lógica para el auto-play del carrusel (solo actúa en móvil gracias a la validación de innerWidth)
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && !isHovered && window.innerWidth < 1024) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                // Si llegamos al final, volvemos al inicio
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Calculamos el ancho de una tarjeta (aprox) para avanzar
                    const cardWidth = itemRefs.current[0]?.clientWidth || 300;
                    carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' }); // 24 es el gap
                }
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isHovered]);

    // Sincronizar indicadores con el scroll manual (solo en móvil)
    const handleScroll = () => {
        if (carouselRef.current && itemRefs.current[0] && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const cardWidth = itemRefs.current[0].clientWidth + 24; // ancho + gap
            const scrollPosition = container.scrollLeft + (container.clientWidth / 2);

            const currentIndex = Math.floor(scrollPosition / cardWidth);
            if (currentIndex >= 0 && currentIndex < products.length) {
                setActiveIndex(currentIndex);
            }
        }
    };

    // Navegación al hacer clic en un indicador
    const handleIndicatorClick = (index: number) => {
        if (carouselRef.current && itemRefs.current[index] && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const card = itemRefs.current[index];
            if (container && card) {
                // Centramos la tarjeta seleccionada
                const scrollPos = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
                container.scrollTo({ left: scrollPos, behavior: 'smooth' });
                setActiveIndex(index);
            }
        }
    };

    return (
        <section className="relative bg-[#050505] pt-0 pb-24 md:pt-4 md:pb-32 overflow-hidden font-sans">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                {/* === 1. ENCABEZADO === */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-px bg-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]"></div>
                            <span className="text-[10px] text-[#c5a059] font-semibold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]">
                                ARSENAL DEL OLIMPO
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-black leading-[0.9] tracking-tight drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                            <span className="block text-transparent [-webkit-text-stroke:1px_#c5a059] md:[-webkit-text-stroke:1.5px_#c5a059] opacity-80">
                                RELIQUIAS PARA
                            </span>
                            <span className="block text-[#c5a059] mt-2 drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">
                                DIOSES EN FORJA
                            </span>
                        </h2>

                        <p className="mt-8 text-[11px] md:text-xs text-zinc-400 font-semibold tracking-[0.15em] uppercase leading-relaxed max-w-md">
                            LOS SEIS MÁS CODICIADOS POR LA HERMANDAD. EQUIPAMIENTO FORJADO PARA QUIENES NO ACEPTAN LO ORDINARIO.
                        </p>
                    </div>

                    {/* Botón Ver Catálogo Completo */}
                    <button className="group flex items-center justify-center gap-3 px-6 py-3.5 border border-[#c5a059]/40 rounded-full text-[9px] text-[#c5a059] font-bold tracking-[0.2em] uppercase hover:bg-[#c5a059]/10 transition-all duration-300 w-fit">
                        VER CATÁLOGO COMPLETO
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                </div>

                {/* === 2. CARRUSEL (Móvil) / CUADRÍCULA 3x2 (Escritorio) === */}
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-smooth pb-8 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 lg:mx-0 lg:px-0"
                >
                    {products.map((product, idx) => (
                        <div
                            key={product.id}
                            ref={(el) => { itemRefs.current[idx] = el; }}
                            className="w-[85vw] sm:w-[320px] lg:w-auto shrink-0 lg:shrink snap-center flex flex-col relative group rounded-[2rem] border border-[#c5a059]/15 bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#c5a059]/40 hover:shadow-[0_15px_40px_-10px_rgba(197,160,89,0.15)]"
                        >
                            {/* --- ÁREA DE LA IMAGEN --- */}
                            <div className="relative h-[280px] w-full overflow-hidden bg-zinc-900">
                                {/* Imagen de fondo con zoom suave */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105 opacity-70 mix-blend-luminosity"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                />
                                {/* Gradiente inferior para fundir con la tarjeta */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

                                {/* Badge (Bestseller, Nuevo, etc) */}
                                {product.badge && (
                                    <div className="absolute top-5 left-5 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#dfba76] to-[#b38b42] rounded-full shadow-[0_0_20px_rgba(197,160,89,0.4)]">
                                        {product.badgeIcon && <product.badgeIcon className="w-3 h-3 text-black" strokeWidth={2.5} />}
                                        <span className="text-[8px] text-black font-black tracking-[0.2em] uppercase">
                                            {product.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Número Romano (Top Right) */}
                                <span className="absolute top-5 right-5 text-[9px] text-[#c5a059]/40 font-mono font-bold tracking-widest">
                                    {product.id}
                                </span>

                                {/* Pill de Rating / Vendidos (Bottom Left) */}
                                <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 px-3 py-1.5 bg-[#050505]/80 backdrop-blur-md border border-[#c5a059]/30 rounded-full">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
                                        <span className="text-[10px] text-white font-bold">{product.rating}</span>
                                    </div>
                                    <div className="w-px h-3 bg-zinc-600"></div>
                                    <span className="text-[8px] text-zinc-400 font-bold tracking-[0.1em] uppercase">
                                        {product.sold} Vendidos
                                    </span>
                                </div>
                            </div>

                            {/* --- ÁREA DE CONTENIDO --- */}
                            <div className="flex flex-col p-6 flex-grow justify-between bg-[#0a0a0a]">
                                <div className="flex flex-col gap-2 mb-8">
                                    <span className="text-[9px] text-[#c5a059]/80 font-bold tracking-[0.2em] uppercase">
                                        {product.category}
                                    </span>
                                    <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                                        {product.title}
                                    </h3>
                                    {/* Línea separadora sutil */}
                                    <div className="w-full h-px bg-gradient-to-r from-[#c5a059]/20 to-transparent mt-4" />
                                </div>

                                {/* Fila Inferior: Precio y Botón (+) */}
                                <div className="flex items-end justify-between">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[#c5a059] font-serif text-lg">$</span>
                                        <span className="text-[#c5a059] font-serif text-3xl font-bold">{product.price}</span>
                                        <span className="text-zinc-600 text-[9px] font-bold tracking-widest ml-1">MXN</span>
                                    </div>

                                    {/* Botón Circular (+) */}
                                    <button className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#dfba76] to-[#b38b42] text-black shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.6)] hover:scale-105 active:scale-95 transition-all duration-300">
                                        <Plus className="w-5 h-5" strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* === 3. INDICADORES DEL CARRUSEL (Solo móvil) === */}
                {/* Se ocultan en lg (escritorio) porque ya es una grilla */}
                <div className="flex lg:hidden justify-center items-center gap-3 mt-8">
                    {products.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleIndicatorClick(idx)}
                            className={`w-2 h-2 rounded-full border transition-all duration-500 ease-out 
                                ${activeIndex === idx
                                ? 'bg-[#c5a059] w-8 border-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                                : 'bg-transparent border-[#c5a059]/40 hover:border-[#c5a059]'
                            }`}
                            aria-label={`Ir al producto ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Productos;