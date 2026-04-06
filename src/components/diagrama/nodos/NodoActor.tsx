    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoActor({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.actor
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)
    const stroke = selected ? '#3b82f6' : c.acento

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex flex-col items-center cursor-default select-none"
        style={{ width: 80, height: 100 }}
        >
        <Handle type="target" position={Position.Top} style={{ top: 0 }} />

        <svg width="80" height="100" viewBox="0 0 80 100" className="absolute inset-0">
            {/* Cabeza */}
            <circle cx="40" cy="18" r="14"
            fill={c.fondo} stroke={stroke} strokeWidth="2" />
            {/* Cuerpo */}
            <line x1="40" y1="32" x2="40" y2="66"
            stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            {/* Brazos */}
            <line x1="16" y1="48" x2="64" y2="48"
            stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            {/* Pierna izquierda */}
            <line x1="40" y1="66" x2="20" y2="90"
            stroke={stroke} strokeWidth="2" strokeLinecap="round" />
            {/* Pierna derecha */}
            <line x1="40" y1="66" x2="60" y2="90"
            stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Label debajo de la figura */}
        {InputEdicion ? (
            <div className="absolute inset-0">{InputEdicion}</div>
        ) : (
            <span
            className="absolute text-[11px] font-semibold text-center w-full leading-tight px-1"
            style={{ color: c.texto, bottom: -2 }}
            >
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} style={{ bottom: 0 }} />
        </div>
    )
    }