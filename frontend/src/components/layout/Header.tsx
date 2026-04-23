import { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 sm:px-6">

            <div className="relative w-full max-w-[90rem]">
                {/* === HEADER PRINCIPAL (Píldora) === */}
                <div className="relative z-20 flex items-center justify-between px-6 md:px-10 py-3 bg-[#0a0a0a]/60 backdrop-blur-md border border-[#c5a059]/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-[#c5a059] transition-all duration-300">

                    {/* Logo y Título */}
                    <Link to="/" className="flex items-center gap-4 cursor-pointer group">
                        {/* Ícono de círculo con borde dorado */}
                        <div className="flex items-center justify-center w-11 h-11 border border-[#c5a059]/50 rounded-full group-hover:bg-[#c5a059]/10 transition-colors duration-300">
                            <Dumbbell className="w-5 h-5 text-[#c5a059]" />
                        </div>

                        {/* Texto del Logo */}
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-serif tracking-widest leading-none">
                                OLIMPO
                            </span>
                            <span className="text-[0.6rem] sm:text-xs tracking-[0.3em] font-sans opacity-70 mt-1">
                                FITNESS CLUB
                            </span>
                        </div>
                    </Link>

                    {/* Navegación y Botón de Menú */}
                    <div className="flex items-center gap-6 lg:gap-10">

                        {/* Links principales (Ocultos en móvil, visibles en pantallas grandes) */}
                        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-[0.15em]">
                            <Link to="/" className="hover:text-white transition-colors duration-300">INICIO</Link>
                            <a href="/#productos" className="hover:text-white transition-colors duration-300">PRODUCTOS</a>
                            <Link to="/feedback" className="hover:text-white transition-colors duration-300">FEEDBACK</Link>
                        </nav>

                        {/* Separador vertical para dar un toque más editorial */}
                        <div className="hidden md:block w-px h-6 bg-[#c5a059]/30"></div>

                        {/* Trigger del Menú Desplegable */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 hover:text-white transition-colors duration-300 outline-none group"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="text-xs font-semibold tracking-[0.15em] hidden sm:block">
                                MENU
                            </span>
                            {isMenuOpen ? (
                                <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
                            ) : (
                                <Menu className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                            )}
                        </button>
                    </div>
                </div>

                {/* === MENÚ DESPLEGABLE === */}
                <div
                    className={`absolute top-full right-0 mt-3 w-full md:w-64 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-[#c5a059]/30 rounded-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top-right shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
                        isMenuOpen
                            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                    }`}
                >
                    <div className="flex flex-col p-3">
                        <div className="md:hidden flex flex-col mb-2 border-b border-[#c5a059]/20 pb-2">
                            <MobileNavLink text="INICIO" to="/" onClick={() => setIsMenuOpen(false)} />
                            <MobileNavLink text="PRODUCTOS" to="/#productos" onClick={() => setIsMenuOpen(false)} />
                            <MobileNavLink text="FEEDBACK" to="/feedback" onClick={() => setIsMenuOpen(false)} />
                        </div>

                        {/* Opciones Genéricas del Menú */}
                        <div className="flex flex-col gap-1 mt-2 md:mt-0">
                            <MenuOption text="MI PERFIL" />
                            <MenuOption text="RUTINAS" />
                            <MenuOption text="NUTRIÓLOGOS" />
                            <MenuOption text="SOPORTE" />
                            <div className="my-2 border-t border-[#c5a059]/20"></div>
                            <MenuOption text="CERRAR SESIÓN" isDanger />
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
};

/* --- Subcomponentes para mantener el código limpio --- */

const MobileNavLink = ({ text, to, onClick }: { text: string; to: string; onClick: () => void }) => {
    // Si es un hash link interno
    if (to.includes('#')) {
        return (
            <a
                href={to}
                onClick={onClick}
                className="px-4 py-3 text-[#c5a059] hover:bg-[#c5a059]/10 rounded-2xl transition-all duration-300 text-sm font-semibold tracking-widest active:scale-95"
            >
                {text}
            </a>
        );
    }

    return (
        <Link
            to={to}
            onClick={onClick}
            className="px-4 py-3 text-[#c5a059] hover:bg-[#c5a059]/10 rounded-2xl transition-all duration-300 text-sm font-semibold tracking-widest active:scale-95"
        >
            {text}
        </Link>
    );
};

const MenuOption = ({ text, isDanger = false }: { text: string; isDanger?: boolean }) => (
    <button
        className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 text-xs font-semibold tracking-[0.15em] flex items-center active:scale-95 ${
            isDanger
                ? 'text-red-400 hover:bg-red-400/10'
                : 'text-[#c5a059] hover:bg-[#c5a059]/10 hover:text-white hover:translate-x-1'
        }`}
    >
        {text}
    </button>
);

export default Header;