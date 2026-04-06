    import type { ItemCatalogo } from './tipos'

    // ── Catálogo de formas disponibles en el sidebar ───────────────
    // El orden acá es el orden visual en el panel izquierdo
    export const CATALOGO_FORMAS: ItemCatalogo[] = [
    {
        tipo:         'oval',
        label:        'Inicio / Fin',
        descripcion:  'Marca el comienzo o fin de un proceso',
        labelDefault: 'Inicio',
    },
    {
        tipo:         'rectangulo',
        label:        'Proceso',
        descripcion:  'Representa una acción o paso del trámite',
        labelDefault: 'Proceso',
    },
    {
        tipo:         'rombo',
        label:        'Decisión',
        descripcion:  'Bifurcación con condición Sí / No',
        labelDefault: '¿Condición?',
    },
    {
        tipo:         'paralelogramo',
        label:        'Entrada / Salida',
        descripcion:  'Dato que ingresa o sale del proceso',
        labelDefault: 'Datos',
    },
    {
        tipo:         'cilindro',
        label:        'Base de datos',
        descripcion:  'Sistema de almacenamiento o registro',
        labelDefault: 'Base de datos',
    },
    {
        tipo:         'documento',
        label:        'Documento',
        descripcion:  'Formulario, expediente o archivo generado',
        labelDefault: 'Documento',
    },
    {
        tipo:         'nube',
        label:        'Sistema externo',
        descripcion:  'Servicio o sistema fuera del municipio',
        labelDefault: 'Sistema externo',
    },
    {
        tipo:         'actor',
        label:        'Actor / Rol',
        descripcion:  'Persona o área responsable de un paso',
        labelDefault: 'Actor',
    },
    {
        tipo:         'swimlane',
        label:        'Calle (Secretaría)',
        descripcion:  'Agrupa pasos bajo una misma área',
        labelDefault: 'Secretaría',
    },
    ]

    // ── Color por tipo de nodo ─────────────────────────────────────
    // Separado de los componentes para que sea fácil de cambiar
    // Una vez que definas el estilo visual, estos son los únicos
    // valores que hay que actualizar en todo el sistema
    export const COLOR_POR_TIPO: Record<string, {
    borde:  string   // border color (Tailwind o hex)
    fondo:  string   // background
    texto:  string   // text color
    acento: string   // color fuerte para SVG stroke
    }> = {
    oval: {
        borde:  '#16a34a',
        fondo:  '#f0fdf4',
        texto:  '#14532d',
        acento: '#16a34a',
    },
    rectangulo: {
        borde:  '#374151',
        fondo:  '#f9fafb',
        texto:  '#111827',
        acento: '#374151',
    },
    rombo: {
        borde:  '#d97706',
        fondo:  '#fffbeb',
        texto:  '#78350f',
        acento: '#f59e0b',
    },
    paralelogramo: {
        borde:  '#9333ea',
        fondo:  '#faf5ff',
        texto:  '#581c87',
        acento: '#a855f7',
    },
    cilindro: {
        borde:  '#2563eb',
        fondo:  '#eff6ff',
        texto:  '#1e3a8a',
        acento: '#3b82f6',
    },
    documento: {
        borde:  '#0891b2',
        fondo:  '#ecfeff',
        texto:  '#164e63',
        acento: '#06b6d4',
    },
    nube: {
        borde:  '#6b7280',
        fondo:  '#f3f4f6',
        texto:  '#1f2937',
        acento: '#9ca3af',
    },
    actor: {
        borde:  '#dc2626',
        fondo:  '#fef2f2',
        texto:  '#7f1d1d',
        acento: '#ef4444',
    },
    swimlane: {
        borde:  '#0369a1',
        fondo:  '#f0f9ff',
        texto:  '#0c4a6e',
        acento: '#0ea5e9',
    },
    }

    // ── Configuración general del editor ──────────────────────────
    export const CONFIG_EDITOR = {
    autosaveIntervaloMs: 30_000,   // 30 segundos
    zoomMin:             0.2,
    zoomMax:             2,
    gridSize:            16,
    } as const