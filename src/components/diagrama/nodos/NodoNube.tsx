    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoNube({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.nube
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 150, height: 90 }}
        >
        <Handle type="target" position={Position.Top} style={{ top: 14 }} />

        <svg width="150" height="90" viewBox="0 0 150 90" className="absolute inset-0">
            <path
            d="
                M36,68
                Q12,68 12,48
                Q12,30 28,26
                Q30,10 48,10
                Q60,10 68,20
                Q76,8 94,10
                Q116,12 116,30
                Q134,32 136,50
                Q138,68 116,68
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
            className="relative z-10 text-xs font-semibold text-center px-4 leading-tight"
            style={{ color: c.texto, marginBottom: 8 }}
            >
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} style={{ bottom: 12 }} />
        </div>
    )
    }