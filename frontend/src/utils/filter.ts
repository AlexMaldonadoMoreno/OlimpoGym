import filter from 'leo-profanity';

filter.loadDictionary('es');

// 1. Añadimos palabras malsonantes comunes en español que pueden faltar
const spanishBadWords = [
    'puta', 'puto', 'mierda', 'cabron', 'cabrón', 'pendejo', 'pendeja',
    'pito', 'verga', 'culo', 'jodido', 'joder', 'chingada', 'chingar',
    'maricon', 'maricón', 'zorra', 'perra', 'coño', 'pollas', 'polla',
    'gilipollas', 'mamada', 'culero', 'concha', 'chinga'
];
filter.add(spanishBadWords);

// 2. Filtro "Flexible": Palabras comunes en el fitness que no queremos bloquear
filter.remove(['duro', 'bestia', 'animal', 'maquina', 'fuego', 'locura']);

// 3. Exportamos una función limpia para usarla en los componentes
// Importante: verificar textos sin importar mayúsculas/minúsculas
export const checkBadWords = (text: string) => filter.check(text.toLowerCase());
