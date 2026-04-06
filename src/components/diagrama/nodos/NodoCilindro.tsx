    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoCilindro({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.cilindro
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 110, height: 90 }}
        >
        <Handle type="target" position={Position.Top} style={{ top: 4 }} />

        <svg width="110" height="90" viewBox="0 0 110 90" className="absolute inset-0">
            {/* Cuerpo */}
            <rect
            x="4" y="18" width="102" height="58"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
            {/* Tapa inferior (dibujada antes que la superior para el overlap) */}
            <ellipse
            cx="55" cy="76" rx="51" ry="12"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
            {/* Tapa superior */}
            <ellipse
            cx="55" cy="18" rx="51" ry="12"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
        </svg>

        {InputEdicion}
        {!InputEdicion && (
            <span
            className="relative z-10 text-xs font-semibold text-center px-2 leading-tight"
            style={{ color: c.texto, marginTop: 6 }}
            >
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} style={{ bottom: 4 }} />
        </div>
    )
    }