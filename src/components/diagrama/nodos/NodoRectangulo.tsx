    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    export function NodoRectangulo({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.rectangulo
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 160, height: 60 }}
        >
        <Handle type="target" position={Position.Top} />
        <Handle type="target" position={Position.Left} id="left-in" />

        <svg width="160" height="60" viewBox="0 0 160 60" className="absolute inset-0">
            <rect
            x="2" y="2" width="156" height="56" rx="6"
            fill={c.fondo}
            stroke={selected ? '#3b82f6' : c.acento}
            strokeWidth={selected ? 2.5 : 2}
            />
        </svg>

        {InputEdicion}
        {!InputEdicion && (
            <span className="relative z-10 text-xs font-semibold text-center px-4 leading-tight"
                style={{ color: c.texto }}>
            {data.label as string}
            </span>
        )}

        <Handle type="source" position={Position.Bottom} />
        <Handle type="source" position={Position.Right} id="right-out" />
        </div>
    )
    }