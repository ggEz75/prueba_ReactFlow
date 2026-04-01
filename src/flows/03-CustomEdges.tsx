    // src/flows/03-CustomEdges.tsx
    import { useCallback } from 'react'
    import {
    ReactFlow, addEdge, useNodesState, useEdgesState,
    BaseEdge, EdgeLabelRenderer, getStraightPath,
    type Connection, type EdgeProps,
    } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'

    // Edge con botón de eliminar
    function DeletableEdge({
    id, sourceX, sourceY, targetX, targetY,
    }: EdgeProps) {
    const [edgePath, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY })

    return (
        <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
            <button
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)` }}
            className="absolute bg-red-500 text-white rounded-full w-5 h-5 text-xs nodrag nopan"
            >
            ×
            </button>
        </EdgeLabelRenderer>
        </>
    )
    }

    const edgeTypes = { deletable: DeletableEdge }

    const initialNodes = [
    { id: '1', position: { x: 0,   y: 0 },   data: { label: 'A' } },
    { id: '2', position: { x: 200, y: 0 },   data: { label: 'B' } },
    { id: '3', position: { x: 100, y: 200 }, data: { label: 'C' } },
    ]

    const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'deletable' },
    ]

    export default function CustomEdges() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    // Cuando el usuario conecta dos nodos manualmente
    const onConnect = useCallback(
        (connection: Connection) =>
        setEdges(eds => addEdge({ ...connection, type: 'deletable' }, eds)),
        [setEdges]
    )

    return (
        <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow
            nodes={nodes} edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            fitView
        />
        </div>
    )
    }