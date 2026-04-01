    // src/flows/01-BasicFlow.tsx
    import { ReactFlow } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'

    const nodes = [
    { id: '1', position: { x: 0, y: 0 },   data: { label: 'Inicio' } },
    { id: '2', position: { x: 0, y: 150 },  data: { label: 'Proceso' } },
    { id: '3', position: { x: 0, y: 300 },  data: { label: 'Fin' } },
    ]

    const edges = [
    { id: 'e1-2', source: '1', target: '2', label: 'paso 1' },
    { id: 'e2-3', source: '2', target: '3', label: 'paso 2' },
    ]

    export default function BasicFlow() {
    return (
        <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView />
        </div>
    )
    }