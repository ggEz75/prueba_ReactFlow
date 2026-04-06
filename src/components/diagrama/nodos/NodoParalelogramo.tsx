    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoParalelogramo({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.paralelogramo
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 150, height: 60 }}
        >
        <Handle type="target" position={Position.Top} />

        <svg width="150" height="60" viewBox="0 0 150 60" className="absolute inset-0">
            <polygon
            points="24,4 146,4 126,56 4,56"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
        </svg>

        {InputEdicion}
        {!InputEdicion && (
            <span className="relative z-10 text-xs font-semibold text-center px-5 leading-tight"
                style={{ color: c.texto }}>
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }