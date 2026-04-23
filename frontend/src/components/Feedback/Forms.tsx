import { useState } from 'react';
import {
    Lightbulb,
    AlertTriangle,
    Sparkles,
    ShieldAlert,
    Clock,
    Shield,
    Flame,
    User,
    Mail,
    Tag,
    Star,
    Paperclip
} from 'lucide-react';


import { checkBadWords } from '../../utils/filter';

const sugerenciaCategories = [
    'NUEVO EQUIPAMIENTO', 'CLASES & RUTINAS', 'HORARIOS',
    'APP & TECNOLOGÍA', 'INSTALACIONES', 'OTRO'
];

const quejaCategories = [
    'SERVICIO AL MIEMBRO', 'EQUIPAMIENTO DEFECTUOSO', 'INSTALACIONES',
    'PERSONAL / ENTRENADORES', 'LIMPIEZA', 'OTRO'
];

const FeedbackForm = () => {
    const [mode, setMode] = useState<'sugerencia' | 'queja'>('sugerencia');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [priority, setPriority] = useState<string>('');

    // === NUEVOS ESTADOS PARA EL FILTRO ===
    const [comment, setComment] = useState<string>('');
    const [showWarning, setShowWarning] = useState<boolean>(false);

    const isSug = mode === 'sugerencia';

    // Resetear estados al cambiar entre Sugerencia y Queja
    const handleModeChange = (newMode: 'sugerencia' | 'queja') => {
        setMode(newMode);
        setSelectedCategory('');
        setRating(0);
        setHoverRating(0);
        setPriority('');
        setComment('');
        setShowWarning(false);
    };

    // === LÓGICA DE VALIDACIÓN ===
    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (checkBadWords(comment)) {
            setShowWarning(true);
            // Ocultamos la alerta después de 4 segundos
            setTimeout(() => setShowWarning(false), 4000);
            return; // Detenemos el envío
        }

        // 2. Si pasa el filtro, simulamos el envío exitoso
        alert(`¡${isSug ? 'Sugerencia' : 'Reporte'} enviado con honor al Consejo!`);
        setComment(''); // Limpiamos el campo
    };

    return (
        <section className="relative bg-[#050505] pt-8 pb-20 md:pt-12 md:pb-28 mt-[-2rem] md:mt-[-4rem] overflow-hidden font-sans z-20">

            {/* === MODAL DE ADVERTENCIA (Aparece si hay palabras prohibidas) === */}
            {showWarning && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-[#0a0a0a] border border-red-500/40 px-6 py-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.2)] flex items-center gap-3 backdrop-blur-md">
                        <ShieldAlert className="w-5 h-5 text-red-500" strokeWidth={2} />
                        <span className="text-[10px] text-red-200 font-black tracking-[0.2em] uppercase">
                            LENGUAJE NO PERMITIDO. MANTÉN EL HONOR, INICIADO.
                        </span>
                    </div>
                </div>
            )}

            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                {/* === TOGGLE SWITCH === */}
                <div className="flex justify-center mb-16 md:mb-24 relative z-20 flex-col items-center">
                    <div className="relative p-1.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-zinc-800 rounded-full flex items-center shadow-2xl w-[320px] sm:w-[360px]">
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full transition-all duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                                ${isSug
                                ? 'translate-x-0 bg-gradient-to-r from-[#dfba76] to-[#b38b42] shadow-[0_0_10px_rgba(197,160,89,0.2)]'
                                : 'translate-x-[100%] bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] shadow-[0_0_10px_rgba(59,130,246,0.2)]'}`}
                        />
                        <button
                            type="button"
                            onClick={() => handleModeChange('sugerencia')}
                            className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-500
                                ${isSug ? 'text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <Lightbulb className="w-3.5 h-3.5" strokeWidth={isSug ? 2.5 : 2} />
                            SUGERENCIA
                        </button>
                        <button
                            type="button"
                            onClick={() => handleModeChange('queja')}
                            className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-500
                                ${!isSug ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <AlertTriangle className="w-3.5 h-3.5" strokeWidth={!isSug ? 2.5 : 2} />
                            QUEJA
                        </button>
                    </div>
                </div>

                {/* === CONTENIDO PRINCIPAL === */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

                    {/* --- COLUMNA INFO (IZQUIERDA) --- */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="relative p-8 bg-[#0a0a0a] border border-zinc-800 rounded-[2rem] overflow-hidden group shadow-lg transition-colors duration-700">
                            <div className={`absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[70px] opacity-10 pointer-events-none transition-colors duration-700
                                ${isSug ? 'bg-[#c5a059]' : 'bg-blue-500'}`}
                            />
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-[800ms] relative z-10
                                ${isSug
                                ? 'bg-gradient-to-br from-[#dfba76] to-[#b38b42] shadow-[0_10px_20px_rgba(197,160,89,0.2)]'
                                : 'bg-gradient-to-br from-[#60a5fa] to-[#2563eb] shadow-[0_10px_20px_rgba(59,130,246,0.2)]'}`}
                            >
                                {isSug ? <Sparkles className="w-7 h-7 text-black" /> : <ShieldAlert className="w-7 h-7 text-white" />}
                            </div>
                            <div className="relative z-10">
                                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase transition-colors duration-500 ${isSug ? 'text-[#c5a059]' : 'text-blue-400'}`}>
                                    MODO · {mode}
                                </span>
                                <h3 className="text-2xl lg:text-[1.75rem] font-serif font-bold text-white mt-3 mb-4 tracking-wide">
                                    {isSug ? 'INSPIRA AL OLIMPO' : 'SEÑALA LA FALLA'}
                                </h3>
                                <p className="text-[13px] text-zinc-400 leading-relaxed font-light">
                                    {isSug
                                        ? 'Tus ideas moldean el futuro de nuestro santuario. Compartir es un acto de liderazgo.'
                                        : 'Lo que no funciona, no dura. Alzar la voz es proteger a la hermandad.'}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 bg-[#0a0a0a] border border-zinc-800 rounded-[2rem]">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-8 h-[1px] transition-colors duration-500 ${isSug ? 'bg-[#c5a059]/50' : 'bg-blue-500/50'}`}></div>
                                <span className={`text-[9px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isSug ? 'text-[#c5a059]' : 'text-blue-400'}`}>
                                    PROMESA
                                </span>
                            </div>
                            <ul className="flex flex-col gap-6">
                                <PromiseItem Icon={Clock} text="Respuesta en menos de 24 horas" isSug={isSug} />
                                <PromiseItem Icon={Shield} text="Confidencialidad absoluta" isSug={isSug} />
                                <PromiseItem Icon={Flame} text="Las mejores ideas se recompensan" isSug={isSug} />
                            </ul>
                        </div>
                    </div>

                    {/* --- COLUMNA FORMULARIO (DERECHA) --- */}
                    <div className="lg:col-span-8 bg-[#0a0a0a] border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 transition-all duration-[800ms] relative overflow-hidden shadow-2xl">

                        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-10 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-[1px] transition-colors duration-500 ${isSug ? 'bg-[#c5a059] shadow-[0_0_8px_#c5a059]' : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'}`}></div>
                                <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isSug ? 'text-[#c5a059]' : 'text-blue-400'}`}>
                                    FORMULARIO · {isSug ? 'I' : 'II'}
                                </span>
                            </div>
                            <span className="text-[8px] text-zinc-600 font-bold tracking-[0.2em] uppercase">
                                PROTECCIÓN NIVEL ÉLITE
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <FormInput label="NOMBRE DE INICIADO" Icon={User} placeholder="Aquiles M." isSug={isSug} />
                            <FormInput label="CORREO" Icon={Mail} placeholder="tu@correo.com" isSug={isSug} />
                        </div>

                        <div className="mb-10">
                            <label className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase mb-5 transition-colors duration-500 ${isSug ? 'text-[#c5a059]' : 'text-blue-400'}`}>
                                <Tag className="w-3.5 h-3.5 opacity-60" /> CATEGORÍA
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {(isSug ? sugerenciaCategories : quejaCategories).map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-5 py-2.5 rounded-full border text-[9px] font-bold tracking-[0.15em] uppercase transition-all duration-300
                                            ${selectedCategory === cat
                                            ? (isSug ? 'bg-[#c5a059]/10 border-[#c5a059] text-[#c5a059]' : 'bg-blue-500/10 border-blue-500 text-blue-400')
                                            : 'bg-[#050505] border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-12 min-h-[90px]">
                            {isSug ? (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <label className="flex items-center gap-2 text-[10px] text-[#c5a059] font-bold tracking-[0.2em] uppercase mb-5">
                                        <Star className="w-3.5 h-3.5 opacity-60" /> TU EXPERIENCIA ACTUAL
                                    </label>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2.5" onMouseLeave={() => setHoverRating(0)}>
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const isActive = star <= (hoverRating || rating);
                                                return (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        className="focus:outline-none transition-transform active:scale-90"
                                                    >
                                                        <Star
                                                            className={`w-8 h-8 transition-all duration-300 
                                                            ${isActive
                                                                ? 'text-[#c5a059] fill-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.4)] scale-110'
                                                                : 'text-zinc-800'}`}
                                                            strokeWidth={1.5}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase ml-2">
                                            <span className={rating > 0 ? 'text-[#c5a059]' : ''}>{hoverRating || rating}</span> · DE · 5
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <label className="flex items-center gap-2 text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase mb-5">
                                        <Flame className="w-3.5 h-3.5 opacity-60" /> PRIORIDAD DEL REPORTE
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['BAJA', 'NORMAL', 'URGENTE'].map((p) => (
                                            <button
                                                key={p}
                                                type="button"
                                                onClick={() => setPriority(p)}
                                                className={`py-4 rounded-xl border text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300
                                                    ${priority === p
                                                    ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                                                    : 'bg-[#050505] border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Textarea (Con Binding de React) */}
                        <div className="relative mb-8">
                            <label className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 transition-colors duration-500 ${isSug ? 'text-[#c5a059]' : 'text-blue-400'}`}>
                                {isSug ? <Sparkles className="w-3.5 h-3.5 opacity-60" /> : <ShieldAlert className="w-3.5 h-3.5 opacity-60" />}
                                {isSug ? 'TU IDEA PARA EL OLIMPO' : 'DETALLES DE LA FALLA'}
                            </label>
                            <div className="relative group">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className={`w-full bg-[#050505] border rounded-2xl p-6 pb-16 min-h-[200px] text-white text-[13px] resize-none focus:outline-none transition-all duration-500 placeholder:text-zinc-700 
                                        ${showWarning
                                        ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' // Rojo si hay advertencia
                                        : (isSug ? 'border-zinc-800 focus:border-[#c5a059]/50' : 'border-zinc-800 focus:border-blue-500/50') // Normal
                                    }`}
                                    placeholder={isSug ? "Describe tu visión..." : "Explica qué sucedió..."}
                                />
                                <div className="absolute bottom-5 left-6 right-6 border-t border-zinc-900 pt-4 flex justify-between items-center">
                                    <button type="button" className={`flex items-center gap-2 text-[9px] text-zinc-500 font-bold tracking-[0.15em] uppercase transition-colors ${isSug ? 'hover:text-[#c5a059]' : 'hover:text-blue-400'}`}>
                                        <Paperclip className="w-3.5 h-3.5" /> ADJUNTAR EVIDENCIA
                                    </button>
                                    <span className="text-[9px] text-zinc-700 font-mono">{comment.length} / 1500</span>
                                </div>
                            </div>
                        </div>

                        {/* Botón de Envío (Dispara la validación) */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleFormSubmit}
                                className={`px-10 py-4 rounded-xl text-black text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500 hover:scale-[1.02] active:scale-95
                                    ${isSug
                                    ? 'bg-gradient-to-r from-[#dfba76] to-[#b38b42] shadow-[0_10px_20px_rgba(197,160,89,0.2)]'
                                    : 'bg-gradient-to-r from-[#60a5fa] to-[#2563eb] text-white shadow-[0_10px_20px_rgba(59,130,246,0.2)]'}`}
                            >
                                ENVIAR {isSug ? 'SUGERENCIA' : 'REPORTE'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const FormInput = ({ label, Icon, placeholder, isSug }: any) => (
    <div className="flex flex-col gap-4">
        <label className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isSug ? 'text-[#c5a059]' : 'text-blue-400'}`}>
            <Icon className="w-3.5 h-3.5 opacity-60" /> {label}
        </label>
        <input
            type="text"
            placeholder={placeholder}
            className={`w-full bg-[#050505] border border-zinc-800 rounded-xl px-5 py-4 text-white text-[13px] focus:outline-none transition-all duration-500 placeholder:text-zinc-800 ${isSug ? 'focus:border-[#c5a059]/50' : 'focus:border-blue-500/50'}`}
        />
    </div>
);

const PromiseItem = ({ Icon, text, isSug }: any) => (
    <li className="flex items-center gap-4 group">
        <div className={`flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-500 ${isSug ? 'border-[#c5a059]/20 bg-[#c5a059]/5 text-[#c5a059]' : 'border-blue-500/20 bg-blue-500/5 text-blue-400'}`}>
            <Icon className="w-4 h-4" strokeWidth={1.5} />
        </div>
        <span className="text-xs text-zinc-400 font-medium tracking-wide group-hover:text-zinc-200 transition-colors">{text}</span>
    </li>
);

export default FeedbackForm;