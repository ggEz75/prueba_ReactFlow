    // src/flows/04-InteractiveFlow.tsx
    import { useCallback } from 'react'
    import {
    ReactFlow, addEdge, useNodesState, useEdgesState,
    type Connection,
    } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'

    const initialNodes = [
    { id: '1', position: { x: 0,   y: 0 },   data: { label: 'Arrastrame' } },
    { id: '2', position: { x: 200, y: 100 }, data: { label: 'Conectame' } },
    ]

    export default function InteractiveFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect = useCallback(
        (connection: Connection) => setEdges(eds => addEdge(connection, eds)),
        [setEdges]
    )

    // Agregar nodo dinámicamente
    const addNode = () => {
        const id = `${nodes.length + 1}`
        setNodes(nds => [...nds, {
        id,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: `Nodo ${id}` },
        }])
    }

    return (
        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <button
            onClick={addNode}
            className="absolute top-2 left-2 z-10 bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
            + Agregar nodo
        </button>
        <ReactFlow
            nodes={nodes} edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        />
        </div>
    )
    }