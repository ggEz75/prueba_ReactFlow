    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'
    import type { DatosNodo } from '../../../lib/diagrama/tipos'

    export function NodoOval({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.oval
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 140, height: 56 }}
        >
        <Handle type="target" position={Position.Top} />

        <svg width="140" height="56" viewBox="0 0 140 56" className="absolute inset-0">
            <ellipse
            cx="70" cy="28" rx="67" ry="25"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
        </svg>

        {InputEdicion}
        {!InputEdicion && (
            <span className="relative z-10 text-xs font-semibold text-center px-3 leading-tight"
                style={{ color: c.texto }}>
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }