    import { useState, type FC } from 'react'
    import type { Comentario } from '../../lib/diagrama/tipos'

    interface Props {
    nodoId:      string | null    // null = ningún nodo seleccionado
    nodoLabel:   string
    comentarios: Comentario[]
    cargando:    boolean
    onAgregar:   (contenido: string) => Promise<void>
    onCerrar:    () => void
    }

    // ── Avatar simple con inicial ──────────────────────────────────
    function Avatar({ nombre, apellido }: { nombre: string; apellido: string }) {
    return (
        <div className="
        w-7 h-7 rounded-full bg-blue-600
        flex items-center justify-center
        text-white text-[11px] font-bold shrink-0
        ">
        {nombre[0]}{apellido[0]}
        </div>
    )
    }

    // ── Comentario individual ──────────────────────────────────────
    function ItemComentario({ comentario }: { comentario: Comentario }) {
    const fecha = new Date(comentario.created_at).toLocaleString('es-AR', {
        day:    '2-digit',
        month:  '2-digit',
        hour:   '2-digit',
        minute: '2-digit',
    })

    const nombre   = comentario.usuario?.nombre   ?? 'Usuario'
    const apellido = comentario.usuario?.apellido ?? ''

    return (
        <div className="flex gap-2 py-2.5 border-b border-gray-100 last:border-0">
        <Avatar nombre={nombre} apellido={apellido} />
        <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5 mb-0.5">
            <span className="text-xs font-semibold text-gray-800 truncate">
                {nombre} {apellido}
            </span>
            <span className="text-[10px] text-gray-400 shrink-0">{fecha}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed break-words">
            {comentario.contenido}
            </p>
        </div>
        </div>
    )
    }

    // ── Panel derecho principal ────────────────────────────────────
    const DiagramaPanelDerecho: FC<Props> = ({
    nodoId,
    nodoLabel,
    comentarios,
    cargando,
    onAgregar,
    onCerrar,
    }) => {
    const [texto,    setTexto]    = useState('')
    const [enviando, setEnviando] = useState(false)

    // Panel cerrado cuando no hay nodo seleccionado
    if (!nodoId) return null

    const handleEnviar = async () => {
        const contenido = texto.trim()
        if (!contenido) return
        setEnviando(true)
        try {
        await onAgregar(contenido)
        setTexto('')
        } finally {
        setEnviando(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Ctrl+Enter para enviar
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleEnviar()
    }

    return (
        <aside className="
        w-64 shrink-0 h-full
        bg-white border-l border-gray-200
        flex flex-col overflow-hidden
        ">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-200">
            <div className="min-w-0">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Comentarios
            </p>
            <p className="text-xs text-gray-700 font-medium truncate mt-0.5">
                {nodoLabel}
            </p>
            </div>
            <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-600 shrink-0 ml-2 transition-colors"
            title="Cerrar panel"
            >
            ✕
            </button>
        </div>

        {/* Lista de comentarios */}
        <div className="flex-1 overflow-y-auto px-3">
            {cargando ? (
            <div className="flex items-center justify-center h-20">
                <span className="text-xs text-gray-400 animate-pulse">Cargando...</span>
            </div>
            ) : comentarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-24 gap-1">
                <span className="text-2xl">💬</span>
                <p className="text-xs text-gray-400 text-center">
                Sin comentarios en esta forma
                </p>
            </div>
            ) : (
            comentarios.map(c => (
                <ItemComentario key={c.id} comentario={c} />
            ))
            )}
        </div>

        {/* Form nuevo comentario */}
        <div className="px-3 py-2.5 border-t border-gray-200 bg-gray-50">
            <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí un comentario..."
            rows={3}
            className="
                w-full text-xs text-gray-700 resize-none
                border border-gray-300 rounded-md px-2.5 py-2
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                placeholder:text-gray-400 bg-white
            "
            />
            <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-gray-400">Ctrl+Enter para enviar</span>
            <button
                onClick={handleEnviar}
                disabled={!texto.trim() || enviando}
                className="
                text-xs font-medium px-3 py-1 rounded-md
                bg-blue-600 text-white
                hover:bg-blue-700
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors
                "
            >
                {enviando ? '...' : 'Enviar'}
            </button>
            </div>
        </div>
        </aside>
    )
    }

    export default DiagramaPanelDerecho