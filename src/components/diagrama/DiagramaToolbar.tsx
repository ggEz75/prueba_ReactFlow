    import type { FC } from 'react'

    interface Props {
    titulo:     string
    onTitulo:   (v: string) => void
    guardando:  boolean
    modificado: boolean
    onGuardar:  () => void
    }

    const DiagramaToolbar: FC<Props> = ({
    titulo,
    onTitulo,
    guardando,
    modificado,
    onGuardar,
    }) => {
    return (
        <div className="
        flex items-center gap-3 px-4 py-2
        bg-white border-b border-gray-200
        shrink-0 h-12
        ">
        {/* Título editable */}
        <input
            value={titulo}
            onChange={e => onTitulo(e.target.value)}
            placeholder="Nombre del diagrama"
            className="
            flex-1 max-w-xs text-sm font-medium text-gray-800
            border-b border-transparent hover:border-gray-300
            focus:border-blue-500 focus:outline-none
            bg-transparent py-0.5 transition-colors
            "
        />

        {/* Indicador de cambios sin guardar */}
        {modificado && !guardando && (
            <span className="text-xs text-amber-500 font-medium select-none">
            ● Sin guardar
            </span>
        )}

        {/* Botón guardar */}
        <button
            onClick={onGuardar}
            disabled={guardando || !modificado}
            className="
            flex items-center gap-1.5 px-3 py-1.5
            text-xs font-medium rounded-md transition-colors
            bg-blue-600 text-white
            hover:bg-blue-700
            disabled:opacity-40 disabled:cursor-not-allowed
            "
        >
            {guardando ? (
            <>
                <span className="animate-spin">⟳</span>
                Guardando...
            </>
            ) : (
            '💾 Guardar'
            )}
        </button>
        </div>
    )
    }

    export default DiagramaToolbar