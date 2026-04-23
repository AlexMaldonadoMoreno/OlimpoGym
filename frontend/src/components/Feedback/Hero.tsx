const FeedbackHero = () => {
    return (
        <section className="relative w-full pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center justify-center bg-[#050505] overflow-hidden font-sans border-b border-[#c5a059]/10">

            {/* === CAPA DE FONDO === */}
            {/* Imagen oscura con mezcla de luminosidad para que se vea como textura sutil */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center mix-blend-luminosity opacity-20"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop")' }}
            />
            {/* Gradientes para oscurecer la imagen y asegurar que el texto sea el protagonista */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/50 to-[#050505] z-0" />

            {/* === GLOW CENTRAL === */}
            {/* Resplandor dorado muy difuso justo detrás del texto principal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[40rem] h-[15rem] md:h-[20rem] bg-[#c5a059]/10 rounded-full blur-[100px] md:blur-[120px] z-0 pointer-events-none" />

            {/* === CONTENIDO PRINCIPAL === */}
            <div className="container relative z-10 w-full px-6 flex flex-col items-center text-center">

                {/* Sub-título superior con líneas laterales */}
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <div className="w-8 md:w-12 h-[1px] bg-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,1)]"></div>
                    <span className="text-[9px] md:text-[10px] text-[#c5a059] font-bold tracking-[0.3em] uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(197,160,89,0.8)]">
            CANAL DE LA HERMANDAD
          </span>
                    <div className="w-8 md:w-12 h-[1px] bg-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,1)]"></div>
                </div>

                {/* Título Principal (Hueco y Sólido) */}
                <h1 className="flex flex-col items-center font-serif font-black leading-[1.1] md:leading-[1] tracking-wide mb-6 md:mb-8">
                    {/* Texto Hueco (Outline) */}
                    <span className="text-6xl md:text-7xl lg:text-[7.5rem] text-transparent [-webkit-text-stroke:1px_#c5a059] md:[-webkit-text-stroke:2px_#c5a059] drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]">
            TU VOZ
          </span>
                    {/* Texto Sólido */}
                    <span className="text-6xl md:text-7xl lg:text-[7.5rem] text-[#c5a059] drop-shadow-[0_0_35px_rgba(197,160,89,0.5)]">
            FORJA EL OLIMPO
          </span>
                </h1>

                {/* Párrafo descriptivo */}
                <p className="text-[9px] md:text-[11px] text-zinc-400 font-semibold tracking-[0.2em] md:tracking-[0.25em] uppercase leading-loose md:leading-loose max-w-2xl px-4">
                    CADA SUGERENCIA, CADA QUEJA — UN CINCEL QUE TALLA ESTE TEMPLO.<br className="hidden md:block" />
                    <span className="block mt-1 md:mt-2">ESCRÍBENOS CON RESPETO.</span>
                </p>

            </div>
        </section>
    );
};

export default FeedbackHero;