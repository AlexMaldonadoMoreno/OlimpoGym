import React, { useRef, useEffect, useState } from 'react';
import { Users, Activity, Clock, Trophy, ArrowUpRight } from 'lucide-react';

const Pilares = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && window.innerWidth < 1024 && !isHovered) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
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

    return (
        <section className="relative bg-[#050505] pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden font-sans">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                {/* === ENCABEZADO DE LA SECCIÓN === */}
                <div className="flex flex-col mb-12 lg:mb-24">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-8 h-px bg-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.8)]"></div>
                        <span className="text-[10px] text-[#c5a059] font-semibold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]">
                            LOS FUNDAMENTOS
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-serif font-black leading-[0.9] tracking-tight drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                        <span className="block text-transparent [-webkit-text-stroke:1px_#c5a059] md:[-webkit-text-stroke:1.5px_#c5a059] opacity-80">
                            LOS CUATRO PILARES
                        </span>
                        <span className="block text-[#c5a059] mt-2 drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                            DEL OLIMPO
                        </span>
                    </h2>

                    <p className="mt-8 text-[11px] md:text-xs text-zinc-400 font-semibold tracking-[0.15em] uppercase leading-relaxed max-w-md">
                        CUATRO DOMINIOS FORJADOS PARA TRANSFORMAR MORTALES EN LEYENDAS. CADA PILAR — UN RITO, UNA DISCIPLINA, UNA CONQUISTA.
                    </p>
                </div>

                {/* === BENTO GRID / CARRUSEL MÓVIL === */}
                {/* En móviles es un flex horizontal con snap, en desktop es la grilla asimétrica */}
                <div
                    ref={carouselRef}
                    onScroll={() => {
                        if (carouselRef.current) {
                            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                            const maxScroll = scrollWidth - clientWidth;
                            if (maxScroll > 0) {
                                // Calculamos el índice (0 a 3) basado en el porcentaje de scroll
                                const index = Math.round((scrollLeft / maxScroll) * 3);
                                setActiveIndex(index);
                            }
                        }
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    className="flex lg:grid lg:grid-cols-12 gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-8 lg:pb-0 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >

                    {/* PILAR I: Entrenamiento Personal (Desktop: Col 1-7, Fila 1-2) */}
                    <div className="w-[85vw] sm:w-[60vw] lg:w-auto shrink-0 snap-center h-[420px] lg:h-auto lg:col-span-7 lg:row-span-2 lg:min-h-[450px] relative group overflow-hidden rounded-[1.5rem] border border-[#c5a059]/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-[#c5a059]/40 hover:shadow-[0_10px_40px_-10px_rgba(197,160,89,0.15)]">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02] opacity-60 mix-blend-luminosity"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2000&auto=format&fit=crop")' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#c5a059]/10 transition-colors duration-700" />

                        <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 flex justify-between items-start">
                            <PilarBadge Icon={Users} text="PILAR I" />
                            <span className="text-[10px] text-zinc-600 font-mono transition-colors duration-500 group-hover:text-[#c5a059]/50">I</span>
                        </div>

                        <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 right-6 lg:right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="transform transition-transform duration-500 group-hover:translate-x-2">
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-2">ENTRENAMIENTO PERSONAL</h3>
                                <p className="text-[11px] lg:text-xs text-zinc-400 max-w-sm leading-relaxed">
                                    Mentores olímpicos que esculpen tu potencial. Cada sesión, un ritual de precisión y fuerza.
                                </p>
                            </div>
                            <ExploreButton />
                        </div>
                    </div>

                    {/* PILAR II: Rutinas Legendarias (Desktop: Col 8-12, Fila 1) */}
                    <div className="w-[85vw] sm:w-[60vw] lg:w-auto shrink-0 snap-center h-[420px] lg:h-auto lg:col-span-5 lg:row-span-1 lg:min-h-[220px] relative group overflow-hidden rounded-[1.5rem] border border-[#c5a059]/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-[#c5a059]/40 hover:shadow-[0_10px_40px_-10px_rgba(197,160,89,0.15)]">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02] opacity-40 mix-blend-luminosity"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop")' }}
                        />
                        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-[#dfba76] to-[#b38b42] rounded-full blur-[2px] opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(197,160,89,0.6)] transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#c5a059]/10 transition-colors duration-700" />

                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                            <PilarBadge Icon={Activity} text="PILAR II" />
                            <span className="text-[10px] text-zinc-600 font-mono transition-colors duration-500 group-hover:text-[#c5a059]/50">II</span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
                            <div className="transform transition-transform duration-500 group-hover:translate-x-2">
                                <h3 className="text-xl font-serif font-bold text-white mb-2">RUTINAS LEGENDARIAS</h3>
                                <p className="text-[11px] text-zinc-400 max-w-[200px] leading-relaxed">
                                    Blueprints diseñados como algoritmos de conquista.
                                </p>
                            </div>
                            <div className="flex lg:justify-end mt-2">
                                <ExploreButton />
                            </div>
                        </div>
                    </div>

                    {/* PILAR III: Acceso Ilimitado (Desktop: Col 8-12, Fila 2) */}
                    <div className="w-[85vw] sm:w-[60vw] lg:w-auto shrink-0 snap-center h-[420px] lg:h-auto lg:col-span-5 lg:row-span-1 lg:min-h-[220px] relative group overflow-hidden rounded-[1.5rem] border border-[#c5a059]/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-[#c5a059]/40 hover:shadow-[0_10px_40px_-10px_rgba(197,160,89,0.15)]">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02] opacity-50 mix-blend-overlay"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop")' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 group-hover:from-black/80 transition-colors duration-700" />

                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                            <PilarBadge Icon={Clock} text="PILAR III" />
                            <span className="text-[10px] text-zinc-600 font-mono transition-colors duration-500 group-hover:text-[#c5a059]/50">III</span>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4">
                            <div className="transform transition-transform duration-500 group-hover:translate-x-2">
                                <h3 className="text-xl font-serif font-bold text-white mb-2">ACCESO ILIMITADO</h3>
                                <p className="text-[11px] text-zinc-400 max-w-[200px] leading-relaxed">
                                    24/7 - 365. El tiempo no es una excusa, es un aliado.
                                </p>
                            </div>
                            <div className="flex lg:justify-end mt-2">
                                <ExploreButton />
                            </div>
                        </div>
                    </div>

                    {/* PILAR IV: Entorno de Campeones (Desktop: Col 1-12, Fila 3) */}
                    <div className="w-[85vw] sm:w-[60vw] lg:w-auto shrink-0 snap-center h-[420px] lg:h-auto lg:col-span-12 lg:row-span-1 lg:min-h-[260px] relative group overflow-hidden rounded-[1.5rem] border border-[#c5a059]/10 bg-[#0a0a0a] transition-all duration-500 hover:-translate-y-1 hover:border-[#c5a059]/40 hover:shadow-[0_10px_40px_-10px_rgba(197,160,89,0.15)]">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02] opacity-40 mix-blend-luminosity"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2500&auto=format&fit=crop")' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:from-[#c5a059]/10 transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-80" />

                        <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 flex justify-between items-start">
                            <PilarBadge Icon={Trophy} text="PILAR IV" />
                            <span className="text-[10px] text-zinc-600 font-mono transition-colors duration-500 group-hover:text-[#c5a059]/50">IV</span>
                        </div>

                        <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 right-6 lg:right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="transform transition-transform duration-500 group-hover:translate-x-2">
                                <h3 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-3">ENTORNO DE CAMPEONES</h3>
                                <p className="text-[11px] lg:text-[13px] text-zinc-400 max-w-lg leading-relaxed">
                                    Un santuario diseñado meticulosamente para la grandeza. Rodeado de acero premium, iluminación escultural y una atmósfera que respira victoria.
                                </p>
                            </div>
                            <ExploreButton />
                        </div>
                    </div>

                </div>

                {/* === INDICADORES MÓVILES === */}
                <div className="flex justify-center gap-2 mt-4 lg:hidden">
                    {[0, 1, 2, 3].map((idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                if (carouselRef.current) {
                                    const { scrollWidth, clientWidth } = carouselRef.current;
                                    const maxScroll = scrollWidth - clientWidth;
                                    const targetScroll = (maxScroll / 3) * idx;
                                    carouselRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                                }
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                activeIndex === idx ? 'w-6 bg-[#c5a059]' : 'w-2 bg-[#c5a059]/30 hover:bg-[#c5a059]/60'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* --- SUBCOMPONENTES --- */

const PilarBadge = ({ Icon, text }: { Icon: React.ElementType, text: string }) => (
    <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 lg:w-9 h-8 lg:h-9 border border-[#c5a059]/30 rounded-xl bg-black/60 backdrop-blur-md transition-colors duration-500 group-hover:border-[#c5a059]/60 group-hover:bg-[#c5a059]/10">
            <Icon className="w-3.5 lg:w-4 h-3.5 lg:h-4 text-[#c5a059]" strokeWidth={1.5} />
        </div>
        <span className="text-[9px] lg:text-[10px] text-[#c5a059] font-bold tracking-[0.2em] uppercase">
            {text}
        </span>
    </div>
);

const ExploreButton = () => (
    <button className="flex items-center gap-2 text-[9px] lg:text-[10px] text-[#c5a059] font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:text-white group/btn relative overflow-hidden px-4 py-2 w-fit">
        <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-1">EXPLORAR</span>
        <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        <div className="absolute inset-0 bg-[#c5a059]/10 rounded-full scale-0 opacity-0 transition-all duration-500 group-hover/btn:scale-100 group-hover/btn:opacity-100" />
    </button>
);

export default Pilares;
