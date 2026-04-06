    import { Handle, Position, type NodeProps } from '@xyflow/react'
    import { COLOR_POR_TIPO } from '../../../lib/diagrama/constantes'
    import { useNodoEditable } from './useNodoEditable'

    // El swimlane es un nodo contenedor — los nodos hijos
    // tienen parentId apuntando a este id
    // El tamaño es más grande que los demás por diseño
    export function NodoSwimLane({ id, data, selected }: NodeProps) {
    const c = COLOR_POR_TIPO.swimlane
    const { onDoubleClick, InputEdicion } = useNodoEditable(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative cursor-default select-none"
        style={{ width: 600, height: 200 }}
        >
        <Handle type="target" position={Position.Top} />

        {/* Borde exterior */}
        <div
            className="absolute inset-0 rounded-lg"
            style={{
            border: `${selected ? 2.5 : 2}px solid ${selected ? '#3b82f6' : c.acento}`,
            backgroundColor: c.fondo,
            }}
        />

        {/* Header de la calle */}
        <div
            className="absolute top-0 left-0 right-0 flex items-center px-3"
            style={{
            height: 32,
            backgroundColor: c.acento,
            borderRadius: '6px 6px 0 0',
            opacity: selected ? 1 : 0.85,
            }}
        >
            {InputEdicion ? (
            <div className="relative flex-1">{InputEdicion}</div>
            ) : (
            <span className="text-white text-xs font-bold truncate">
                {data.label as string}
            </span>
            )}
        </div>

        {/* Área interna donde van los nodos hijos */}
        <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingTop: 32 }}
        >
            <span className="text-xs text-gray-300 select-none pointer-events-none">
            Arrastrá nodos acá
            </span>
        </div>

        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }