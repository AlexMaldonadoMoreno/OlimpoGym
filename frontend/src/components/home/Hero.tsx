import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Dumbbell, ArrowUpRight } from 'lucide-react';

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // Ajusta el multiplicador para más o menos movimiento
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-sans pt-25">

            <div
                className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=2500&auto=format&fit=crop")' }}
            />

            {/* Capa de oscurecimiento general */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/60 to-[#050505] z-0" />

            {/* GLOWS (Brillos atmosféricos) - Más difusos y sutiles */}
            <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#c5a059]/10 rounded-full blur-[120px] z-0 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[50rem] h-[50rem] bg-[#c5a059]/5 rounded-full blur-[150px] z-0 pointer-events-none" />

            {/* === CONTENIDO PRINCIPAL === */}
            <div className="container relative z-10 w-full max-w-7xl px-6 flex-grow flex flex-col justify-between pb-12">

                {/* TÍTULO PRINCIPAL: "FORJA TU LEYENDA" */}
                <div className="flex-1 flex justify-center items-center mt-8 md:mt-12">
                    <h1
                        className="text-[14vw] sm:text-6xl md:text-7xl lg:text-[7rem] font-serif font-black tracking-widest text-center text-transparent opacity-90 select-none drop-shadow-[0_0_20px_rgba(197,160,89,0.8)] sm:drop-shadow-[0_0_25px_rgba(197,160,89,1)] transition-transform duration-75 ease-out"
                        style={{
                            WebkitTextStroke: '1px #c5a059',
                            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                        }}
                    >
                        FORJA TU LEYENDA
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mt-12">

                    {/* --- COLUMNA IZQUIERDA: Botón contorno + Tarjeta --- */}
                    <div className="flex flex-col items-start gap-6 lg:w-1/2">

                        {/* Botón superior de la tarjeta */}
                        <button className="flex items-center gap-2 px-6 py-2.5 border border-[#c5a059]/40 rounded-full text-[#c5a059] text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#c5a059]/10 active:scale-95 transition-all backdrop-blur-sm">
                            — DONDE ENTRENAN LOS DIOSES
                        </button>

                        {/* TARJETA ESTATUS ÉLITE */}
                        <div className="relative w-full max-w-xl bg-[#0a0a0a]/20 border border-[#c5a059]/20 rounded-[2rem] p-8 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

                            {/* Encabezado Tarjeta */}
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-[1px] bg-[#c5a059]"></div>
                                <span className="text-[11px] text-[#c5a059] font-medium tracking-[0.3em] uppercase">
                  ESTATUS ÉLITE
                </span>
                            </div>

                            {/* Descripción */}
                            <p className="mt-6 text-[15px] text-zinc-300 leading-relaxed font-light">
                                Asciende al <span className="text-[#c5a059] font-medium">OLIMPO</span>. Equipamiento de élite y hermandad que te impulsa hacia la grandeza.
                            </p>

                            {/* Separador */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent my-8" />

                            {/* Íconos y Estadísticas */}
                            <div className="flex items-start justify-between gap-4">
                                <StatusItem Icon={Clock} label="ACCESO" value="24/7" />
                                <StatusItem Icon={Trophy} label="ENTRENADORES" value="OLÍMPICOS" />
                                <StatusItem Icon={Dumbbell} label="EQUIPO" value="VANGUARDIA" />
                            </div>

                            {/* Separador */}
                            <div className="w-full h-px bg-[#c5a059]/10 my-8" />

                            {/* Llamada a la acción inferior */}
                            <p className="text-[13px] text-zinc-400 font-light tracking-wide text-center lg:text-left">
                                ¿QUÉ TANTO ESTÁS DISPUESTO A <span className="text-[#c5a059] font-medium">SACRIFICAR?</span>
                            </p>
                        </div>
                    </div>

                    {/* --- COLUMNA DERECHA: Botón Orbital (START JOURNEY) --- */}
                    <div className="flex flex-col items-center justify-center lg:items-end w-full lg:w-auto pb-8 lg:pb-0">
                        <button className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center text-black text-center transition-all duration-500 hover:scale-105 active:scale-95">

                            {/* Brillo externo del botón */}
                            <div className="absolute inset-0 rounded-full bg-[#c5a059] blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

                            {/* Fondo sólido del botón */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#dfba76] to-[#b38b42] shadow-inner" />

                            {/* Contenido del botón */}
                            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.2em] leading-none">
                  START
                </span>
                                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] uppercase opacity-80">
                  JOURNEY
                </span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>

            {/* === PIE DE PÁGINA DEL HERO === */}
            <div className="w-full relative z-10 border-t border-[#c5a059]/10 bg-[#050505]/50 backdrop-blur-sm">
                <div className="container max-w-7xl mx-auto px-6 py-5 flex items-center justify-between text-[9px] sm:text-[10px] text-zinc-500 font-medium tracking-[0.3em] uppercase">
                    <span>MMXXVI · ÉLITE</span>
                    <span className="hidden sm:block">SCROLL · DESCUBRE LA GRANDEZA</span>
                    <span>01 / 04</span>
                </div>
            </div>

        </section>
    );
};

/* --- Subcomponente para los ítems de estatus en la tarjeta --- */
const StatusItem = ({ Icon, label, value }: { Icon: React.ElementType, label: string, value: string }) => (
    <div className="flex flex-col items-start lg:items-center flex-1 gap-4">
        {/* Contenedor del ícono con borde redondeado estilo squircle */}
        <div className="flex items-center justify-center w-12 h-12 border border-[#c5a059]/30 rounded-[14px] bg-[#c5a059]/5 shadow-[inset_0_0_10px_rgba(197,160,89,0.05)]">
            <Icon className="w-5 h-5 text-[#c5a059]" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-start lg:items-center gap-1">
      <span className="text-[9px] text-zinc-500 font-bold tracking-[0.2em] uppercase">
        {label}
      </span>
            <span className="text-[13px] text-white font-serif tracking-widest">
        {value}
      </span>
        </div>
    </div>
);

export default Hero;

