    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoRombo({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.rombo
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 140, height: 90 }}
        >
        {/* Entrada superior */}
        <Handle type="target" position={Position.Top} style={{ top: 0 }} />

        <svg width="140" height="90" viewBox="0 0 140 90" className="absolute inset-0">
            <polygon
            points="70,4 136,45 70,86 4,45"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
        </svg>

        {InputEdicion}
        {!InputEdicion && (
            <span className="relative z-10 text-[11px] font-semibold text-center px-4 leading-tight"
                style={{ color: c.texto }}>
            {data.label as string}
            </span>
        )}

        {/* Salida inferior (continuación) */}
        <Handle type="source" position={Position.Bottom} style={{ bottom: 0 }} />
        {/* Salida derecha = Sí */}
        <Handle
            type="source" position={Position.Right} id="si"
            style={{ right: 0 }}
        />
        {/* Salida izquierda = No */}
        <Handle
            type="source" position={Position.Left} id="no"
            style={{ left: 0 }}
        />
        </div>
    )
    }