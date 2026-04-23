import React from 'react';
import { Dumbbell, MapPin, Mail, Phone } from 'lucide-react';
import { FiInstagram as Instagram, FiFacebook as Facebook } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="relative bg-[#050505] pt-16 md:pt-20 border-t border-[#c5a059]/10 overflow-hidden font-sans">

            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                {/* === GRID PRINCIPAL === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-12 lg:mb-16">

                    {/* Columna 1: Branding y Contacto */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:pr-8">
                        {/* Logo */}
                        <div className="flex items-center gap-4 cursor-pointer group w-fit">
                            <div className="flex items-center justify-center w-10 h-10 border border-[#c5a059]/50 rounded-full group-hover:bg-[#c5a059]/10 transition-colors duration-300">
                                <Dumbbell className="w-4 h-4 text-[#c5a059]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-serif tracking-widest leading-none text-[#c5a059]">
                                    OLIMPO
                                </span>
                                <span className="text-[0.6rem] tracking-[0.3em] font-sans opacity-70 mt-1 text-[#c5a059]">
                                    FITNESS CLUB
                                </span>
                            </div>
                        </div>

                        {/* Descripción */}
                        <p className="text-[13px] text-zinc-400 leading-relaxed max-w-sm">
                            Un santuario donde el acero, el sudor y la disciplina esculpen a los dioses del mañana.
                        </p>

                        {/* Información de Contacto */}
                        <div className="flex flex-col gap-4 mt-2">
                            <ContactItem Icon={MapPin} text="Av. Olimpia 2026 - Ciudad Élite" />
                            <ContactItem Icon={Mail} text="hermandad@olimpo.fit" />
                            <ContactItem Icon={Phone} text="+52 - 55 - 0000 - 0000" />
                        </div>
                    </div>

                    {/* Columna 2: 01 OLIMPO */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <FooterHeader number="01" title="OLIMPO" />
                        <ul className="flex flex-col gap-3">
                            <FooterLink text="Historia" />
                            <FooterLink text="Filosofía" />
                            <FooterLink text="Instalaciones" />
                            <FooterLink text="Código de Honor" />
                        </ul>
                    </div>

                    {/* Columna 3: 02 SERVICIOS */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <FooterHeader number="02" title="SERVICIOS" />
                        <ul className="flex flex-col gap-3">
                            <FooterLink text="Rutinas" />
                            <FooterLink text="Nutriólogos" />
                            <FooterLink text="Fisioterapia" />
                            <FooterLink text="Campeones" />
                        </ul>
                    </div>

                    {/* Columna 4: 03 ÉLITE */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <FooterHeader number="03" title="ÉLITE" />
                        <ul className="flex flex-col gap-3">
                            <FooterLink text="Membresías" />
                            <FooterLink text="Eventos Privados" />
                            <FooterLink text="Retiros" />
                            <FooterLink text="Embajadores" />
                        </ul>
                    </div>

                    {/* Columna 5: 04 SANTUARIO y Redes Sociales */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <FooterHeader number="04" title="SANTUARIO" />

                        {/* Botón de Estatus */}
                        <div className="flex items-center gap-3 border border-[#c5a059]/30 rounded-xl px-4 py-2.5 w-fit bg-[#0a0a0a]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c5a059]"></span>
                            </span>
                            <span className="text-[10px] font-semibold tracking-widest text-zinc-300 uppercase mt-0.5">
                                ABIERTO 24 - 7
                            </span>
                        </div>

                        {/* Redes Sociales */}
                        <div className="flex items-center gap-3 mt-1">
                            <SocialIcon Icon={Facebook} />
                            <SocialIcon Icon={Instagram} />
                        </div>
                    </div>
                </div>

            </div>

            {/* === TEXTO GIGANTE DE FONDO === */}
            {/* Se redujo un poco el tamaño, se aumentó la opacidad y se añadió glow */}
            <div className="w-full flex justify-center pb-6 select-none pointer-events-none px-4">
                <h2 className="text-[18vw] lg:text-[13vw] xl:text-[11.5rem] font-serif font-black leading-none text-transparent opacity-70 [-webkit-text-stroke:1px_#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    OLIMPO
                </h2>
            </div>

            {/* === BARRA INFERIOR (SUB-FOOTER) === */}
            <div className="relative z-10 border-t border-[#c5a059]/20 bg-[#050505]">
                <div className="container max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Izquierda */}
                    <div className="text-[9px] font-medium tracking-[0.2em] text-zinc-500 flex flex-wrap items-center justify-center gap-2">
                        <span>© MMXXVI · OLIMPO FITNESS CLUB</span>
                        <span className="text-[#c5a059]">•</span>
                        <span>FORJADO PARA INMORTALES</span>
                    </div>

                    {/* Derecha */}
                    <div className="flex flex-wrap items-center justify-center gap-5 text-[9px] font-semibold tracking-[0.2em] text-zinc-400">
                        <a href="#" className="hover:text-[#c5a059] transition-colors">PRIVACIDAD</a>
                        <a href="#" className="hover:text-[#c5a059] transition-colors">TÉRMINOS</a>
                        <a href="#" className="hover:text-[#c5a059] transition-colors">CÓDIGO ÉLITE</a>
                        <div className="flex items-center gap-2 text-[#c5a059] ml-2">
                            <button className="hover:text-white transition-colors">ES</button>
                            <span>-</span>
                            <button className="hover:text-white transition-colors text-zinc-500">EN</button>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

/* --- SUBCOMPONENTES --- */

const ContactItem = ({ Icon, text }: { Icon: React.ElementType, text: string }) => (
    <div className="flex items-center gap-4 group cursor-pointer w-fit">
        <div className="flex items-center justify-center w-9 h-9 border border-[#c5a059]/20 rounded-xl group-hover:border-[#c5a059]/60 transition-colors">
            <Icon className="w-3.5 h-3.5 text-[#c5a059]" />
        </div>
        <span className="text-[13px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
            {text}
        </span>
    </div>
);

const FooterHeader = ({ number, title }: { number: string, title: string }) => (
    <div className="flex items-center gap-3">
        <span className="text-[10px] text-[#c5a059]/60 font-mono tracking-widest">{number}</span>
        <div className="w-6 h-px bg-[#c5a059]/40"></div>
        <h3 className="text-[13px] font-serif font-semibold text-[#c5a059] tracking-[0.2em] uppercase">
            {title}
        </h3>
    </div>
);

const FooterLink = ({ text }: { text: string }) => (
    <li>
        <a href="#" className="text-[13px] text-zinc-400 hover:text-[#c5a059] transition-all duration-300 hover:translate-x-2 inline-block">
            {text}
        </a>
    </li>
);

const SocialIcon = ({ Icon }: { Icon: React.ElementType }) => (
    <button className="flex items-center justify-center w-9 h-9 border border-[#c5a059]/30 rounded-full text-zinc-400 hover:text-[#c5a059] hover:bg-[#c5a059]/10 hover:border-[#c5a059] transition-all duration-300 hover:scale-110 active:scale-95">
        <Icon className="w-4 h-4" />
    </button>
);

export default Footer;