import { useRef, useEffect, useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

// --- DATOS DE LAS RESEÑAS ---
const reviews = [
    {
        id: 'I',
        name: 'MARCO VALDÉS',
        role: 'MIEMBRO ANUAL - CAMPEÓN REGIONAL',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop', // Avatar hombre fuerte
        text: '“Entrar al Olimpo cambió mi definición de fuerza. Los entrenadores no solo te guían, te transforman. Cada sesión es un ritual que me acerca al atleta que siempre supe que podía ser.”',
        timeAgo: 'HACE 2 DÍAS',
        likes: 284,
        comments: 12,
        isFeatured: true,
        memberSince: '3 AÑOS MIEMBRO'
    },
    {
        id: 'II',
        name: 'VALENTINA REYES',
        role: 'MIEMBRO MENSUAL - ATLETA DE CROSSFIT',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop', // Avatar mujer fitness
        text: '“La hermandad que encontré aquí es real. Nunca entreno sola, siempre hay alguien empujándome a romper mi marca anterior. El equipamiento es de otro nivel.”',
        timeAgo: 'HACE 1 SEMANA',
        likes: 196,
        comments: 8,
        isFeatured: false,
        memberSince: '18 MESES'
    },
    {
        id: 'III',
        name: 'DIEGO MONTES',
        role: 'MIEMBRO ANUAL - POWERLIFTER',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
        text: '“He pisado gimnasios en todo el mundo, pero la atmósfera del Olimpo es inigualable. El respeto por los fierros y la disciplina se respira en cada rincón.”',
        timeAgo: 'HACE 2 SEMANAS',
        likes: 312,
        comments: 24,
        isFeatured: false,
        memberSince: '4 AÑOS MIEMBRO'
    },
    {
        id: 'IV',
        name: 'SOFÍA LORENZO',
        role: 'MIEMBRO SEMANAL - RUNNER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        text: '“Vine por la curiosidad de sus instalaciones élite y me quedé por la comunidad. Los fisioterapeutas y el área de recuperación son un oasis para cualquier deportista.”',
        timeAgo: 'HACE 1 MES',
        likes: 145,
        comments: 3,
        isFeatured: false,
        memberSince: '6 MESES'
    }
];

const Resenas = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Lógica para el auto-play del carrusel (Solo móvil)
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && !isHovered && window.innerWidth < 1024) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    const cardWidth = itemRefs.current[0]?.clientWidth || 300;
                    carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
                }
            }
        }, 5000); // 5 segundos para dar tiempo a leer

        return () => clearInterval(interval);
    }, [isHovered]);

    const handleScroll = () => {
        if (carouselRef.current && itemRefs.current[0] && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const cardWidth = itemRefs.current[0].clientWidth + 24;
            const scrollPosition = container.scrollLeft + (container.clientWidth / 2);
            const currentIndex = Math.floor(scrollPosition / cardWidth);
            if (currentIndex >= 0 && currentIndex < reviews.length) {
                setActiveIndex(currentIndex);
            }
        }
    };

    const handleIndicatorClick = (index: number) => {
        if (carouselRef.current && itemRefs.current[index] && window.innerWidth < 1024) {
            const container = carouselRef.current;
            const card = itemRefs.current[index];
            if (container && card) {
                const scrollPos = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
                container.scrollTo({ left: scrollPos, behavior: 'smooth' });
                setActiveIndex(index);
            }
        }
    };

    return (
        <section className="relative bg-[#050505] pt-0 pb-24 md:pt-4 md:pb-32 overflow-hidden font-sans border-t border-[#c5a059]/10">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-px bg-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]"></div>
                                <div className="w-1 h-1 rounded-full bg-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.8)] hidden sm:block"></div>
                            </div>
                            <span className="text-[10px] text-[#c5a059] font-semibold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]">
                                VOCES DE LA HERMANDAD
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-[5rem] font-serif font-black leading-[0.9] tracking-tight drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                            <span className="block text-transparent [-webkit-text-stroke:1px_#c5a059] md:[-webkit-text-stroke:1.5px_#c5a059] opacity-80">
                                CRÓNICAS DE
                            </span>
                            <span className="block text-[#c5a059] mt-2 drop-shadow-[0_0_20px_rgba(197,160,89,0.6)]">
                                LOS INICIADOS
                            </span>
                        </h2>

                        <p className="mt-8 text-[11px] md:text-xs text-zinc-400 font-semibold tracking-[0.15em] uppercase leading-relaxed max-w-md">
                            PALABRAS DE QUIENES HAN CRUZADO EL UMBRAL. CADA TESTIMONIO, UN ECO DE LA TRANSFORMACIÓN QUE AGUARDA.
                        </p>

                        <div className="flex items-center gap-4 mt-8 px-5 py-3 border border-[#c5a059]/20 rounded-full w-fit bg-black/60 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <div className="flex items-center gap-1 drop-shadow-[0_0_5px_rgba(197,160,89,0.5)]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-[#c5a059] fill-[#c5a059]" />
                                ))}
                            </div>
                            <div className="w-px h-4 bg-zinc-600"></div>
                            <span className="text-[10px] text-[#c5a059] font-bold tracking-[0.2em] uppercase">
                                4.96 · 2,847 RESEÑAS
                            </span>
                        </div>
                    </div>
                </div>

                {/* === 2. CUADRÍCULA DE RESEÑAS (Escritorio) / CARRUSEL (Móvil) === */}
                <div
                    ref={carouselRef}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    className="flex lg:grid lg:grid-cols-2 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-smooth pb-8 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 lg:mx-0 lg:px-0"
                >
                    {reviews.map((review, idx) => (
                        <div
                            key={review.id}
                            ref={(el) => { itemRefs.current[idx] = el; }}
                            className={`w-[90vw] sm:w-[400px] lg:w-auto shrink-0 lg:shrink snap-center flex flex-col relative group rounded-[1.5rem] border p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 
                                ${review.isFeatured 
                                    ? 'border-[#c5a059]/40 bg-[#0a0a0a] shadow-[0_0_20px_rgba(197,160,89,0.1)]' 
                                    : 'border-zinc-800 bg-[#0a0a0a] hover:border-[#c5a059]/20'
                                }`}
                        >
                            {/* Comillas gigantes de fondo (Marca de agua) */}
                            <span className="absolute top-6 left-6 text-[8rem] font-serif text-white opacity-[0.03] leading-none select-none pointer-events-none">
                                “
                            </span>

                            {/* Fila Superior: Estrellas y Badge Destacado / ID */}
                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="flex items-center gap-1 drop-shadow-[0_0_3px_rgba(197,160,89,0.3)]">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 text-[#dfba76] fill-[#dfba76]" />
                                    ))}
                                </div>
                                {review.isFeatured ? (
                                    <div className="px-3 py-1 bg-gradient-to-r from-[#dfba76] to-[#b38b42] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                                        <span className="text-[8px] text-black font-black tracking-[0.2em] uppercase">
                                            DESTACADO
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-[10px] text-zinc-600 font-mono font-bold tracking-widest leading-none mt-1">
                                        {review.id}
                                    </span>
                                )}
                            </div>

                            {/* Texto de la Reseña */}
                            <p className="text-sm md:text-[15px] text-zinc-200 font-serif leading-relaxed mb-auto relative z-10">
                                {review.text}
                            </p>

                            {/* Línea divisoria sutil */}
                            <div className="w-full h-px bg-zinc-800/80 my-6 relative z-10" />

                            {/* Contenedor Inferior: Perfil e Interacciones */}
                            <div className="flex flex-col gap-5 relative z-10 w-full">
                                {/* Row 1: Profile and Stats */}
                                <div className="flex items-center justify-between">
                                    {/* Info Usuario */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border border-[#dfba76] p-0.5 shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.3)]">
                                            <img src={review.avatar} alt={review.name} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-white tracking-wide">
                                                {review.name}
                                            </span>
                                            <span className="text-[8px] text-zinc-500 font-bold tracking-[0.1em] uppercase mt-0.5">
                                                {review.role}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Interacciones (Tiempo/Likes) */}
                                    <div className="flex flex-col items-end gap-1.5">
                                        <span className="text-[8px] text-[#dfba76] font-bold tracking-widest uppercase flex items-center gap-1">
                                            {review.timeAgo}
                                        </span>
                                        <div className="flex items-center gap-3 text-zinc-400">
                                            <button className="flex items-center gap-1 hover:text-[#c5a059] transition-colors group/btn">
                                                <ThumbsUp className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                                                <span className="text-[10px] font-mono">{review.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-1 hover:text-[#c5a059] transition-colors group/btn">
                                                <MessageCircle className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Verificado */}
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#dfba76]"></div>
                                    <span className="text-[8px] text-zinc-500 font-bold tracking-[0.2em] uppercase">
                                        VERIFICADO · {review.memberSince}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* === 3. INDICADORES DEL CARRUSEL (Solo móvil) === */}
                <div className="flex lg:hidden justify-center items-center gap-3 mt-8">
                    {reviews.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleIndicatorClick(idx)}
                            className={`w-2 h-2 rounded-full border transition-all duration-500 ease-out 
                                ${activeIndex === idx
                                ? 'bg-[#c5a059] w-8 border-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                                : 'bg-transparent border-[#c5a059]/40 hover:border-[#c5a059]'
                            }`}
                            aria-label={`Ver reseña ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Resenas;