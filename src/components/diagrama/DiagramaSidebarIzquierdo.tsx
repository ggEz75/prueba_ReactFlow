    import type { FC, DragEvent } from 'react'
    import { CATALOGO_FORMAS, COLOR_POR_TIPO } from '../../lib/diagrama/constantes'
    import type { ItemCatalogo } from '../../lib/diagrama/tipos'

    // ── Preview SVG por tipo ───────────────────────────────────────
    // Renderiza una miniatura de la forma en el sidebar
    function PreviewForma({ tipo }: { tipo: string }) {
    const c = COLOR_POR_TIPO[tipo]

    switch (tipo) {
        case 'oval':
        return (
            <svg width="72" height="32" viewBox="0 0 120 50">
            <ellipse cx="60" cy="25" rx="57" ry="22"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            </svg>
        )
        case 'rectangulo':
        return (
            <svg width="72" height="32" viewBox="0 0 120 50">
            <rect x="4" y="4" width="112" height="42"
                rx="4" fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            </svg>
        )
        case 'rombo':
        return (
            <svg width="72" height="44" viewBox="0 0 120 80">
            <polygon points="60,4 116,40 60,76 4,40"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            </svg>
        )
        case 'paralelogramo':
        return (
            <svg width="72" height="32" viewBox="0 0 130 55">
            <polygon points="20,4 126,4 110,51 4,51"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            </svg>
        )
        case 'cilindro':
        return (
            <svg width="56" height="44" viewBox="0 0 90 80">
            <rect x="4" y="16" width="82" height="48"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            <ellipse cx="45" cy="16" rx="41" ry="10"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            <ellipse cx="45" cy="64" rx="41" ry="10"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            </svg>
        )
        case 'documento':
        return (
            <svg width="56" height="44" viewBox="0 0 90 80">
            <path
                d="M4,4 L86,4 L86,64 Q68,80 50,64 L4,64 Z"
                fill={c.fondo} stroke={c.acento} strokeWidth="2"
            />
            </svg>
        )
        case 'nube':
        return (
            <svg width="72" height="44" viewBox="0 0 120 70">
            <path
                d="M30,55 Q10,55 10,38 Q10,22 25,20 Q28,8 42,8 Q52,8 58,16
                Q64,8 76,10 Q90,10 90,24 Q104,26 104,40 Q104,55 88,55 Z"
                fill={c.fondo} stroke={c.acento} strokeWidth="2"
            />
            </svg>
        )
        case 'actor':
        return (
            <svg width="40" height="52" viewBox="0 0 60 80">
            <circle cx="30" cy="16" r="12"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            <path d="M10,72 Q10,44 30,44 Q50,44 50,72"
                fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            </svg>
        )
        case 'swimlane':
        return (
            <svg width="72" height="44" viewBox="0 0 120 70">
            <rect x="4" y="4" width="112" height="62"
                rx="4" fill={c.fondo} stroke={c.acento} strokeWidth="2" />
            <rect x="4" y="4" width="112" height="20"
                rx="4" fill={c.acento} opacity="0.15" />
            <line x1="4" y1="24" x2="116" y2="24"
                stroke={c.acento} strokeWidth="1.5" />
            </svg>
        )
        default:
        return null
    }
    }

    // ── Item individual del catálogo ───────────────────────────────
    function ItemCatalogo({ item }: { item: ItemCatalogo }) {
    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        // Pasamos tipo y label por dataTransfer
        // DiagramaCanvas los leerá en onDrop
        e.dataTransfer.setData('application/diagrama-tipo',  item.tipo)
        e.dataTransfer.setData('application/diagrama-label', item.labelDefault)
        e.dataTransfer.effectAllowed = 'move'
    }

    return (
        <div
        draggable
        onDragStart={onDragStart}
        title={item.descripcion}
        className="
            flex flex-col items-center gap-1.5 p-2 rounded-lg
            border border-gray-200 bg-white
            cursor-grab active:cursor-grabbing
            hover:border-blue-400 hover:shadow-sm
            transition-all select-none
        "
        >
        <PreviewForma tipo={item.tipo} />
        <span className="text-[11px] text-gray-600 text-center leading-tight font-medium">
            {item.label}
        </span>
        </div>
    )
    }

    // ── Sidebar principal ──────────────────────────────────────────
    const DiagramaSidebarIzquierdo: FC = () => {
    return (
        <aside className="
        w-48 shrink-0 h-full
        bg-gray-50 border-r border-gray-200
        flex flex-col overflow-hidden
        ">
        {/* Header */}
        <div className="px-3 py-2.5 border-b border-gray-200">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Formas
            </p>
        </div>

        {/* Catálogo scrolleable */}
        <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-2 content-start">
            {CATALOGO_FORMAS.map(item => (
            <ItemCatalogo key={item.tipo} item={item} />
            ))}
        </div>

        {/* Tip inferior */}
        <div className="p-2 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 leading-relaxed text-center">
            Arrastrá una forma al canvas para agregarla
            </p>
        </div>
        </aside>
    )
    }

    export default DiagramaSidebarIzquierdo