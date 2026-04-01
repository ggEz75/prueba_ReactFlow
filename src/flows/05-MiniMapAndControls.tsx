    // src/flows/05-MiniMapAndControls.tsx
    import { ReactFlow, MiniMap, Controls, Background, BackgroundVariant } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'

    const nodes = [
    { id: '1', position: { x: 0,   y: 0 },   data: { label: 'Node 1' } },
    { id: '2', position: { x: 200, y: 100 }, data: { label: 'Node 2' } },
    { id: '3', position: { x: 400, y: 0 },   data: { label: 'Node 3' } },
    ]

    const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    ]

    export default function MiniMapAndControls() {
    return (
        <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls />   {/* zoom in/out + fit view + lock */}
            <MiniMap />    {/* mapa de navegación */}
        </ReactFlow>
        </div>
    )
    }