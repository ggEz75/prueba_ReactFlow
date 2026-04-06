    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoDocumento({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.documento
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    // La forma de documento tiene la parte inferior ondulada
    // La curva SVG simula el borde inferior de un papel doblado
    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 140, height: 80 }}
        >
        <Handle type="target" position={Position.Top} />

        <svg width="140" height="80" viewBox="0 0 140 80" className="absolute inset-0">
            <path
            d="
                M4,4
                L136,4
                L136,62
                Q118,76 105,62
                Q91,48 77,62
                Q63,76 49,62
                Q35,48 21,62
                Q14,69 4,62
                Z
            "
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
        </svg>

        {InputEdicion}
        {!InputEdicion && (
            <span
            className="relative z-10 text-xs font-semibold text-center px-3 leading-tight"
            style={{ color: c.texto, marginBottom: 10 }}
            >
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} style={{ bottom: 0 }} />
        </div>
    )
    }