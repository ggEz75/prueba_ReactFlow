    // src/flows/02-CustomNodes.tsx
    import { ReactFlow, Handle, Position } from '@xyflow/react'
    import type { NodeProps } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'

    // Tu nodo es simplemente un componente React
    function ApprovalNode({ data }: NodeProps) {
    return (
        <div className="bg-white border-2 border-blue-500 rounded-lg p-3 shadow-md min-w-32">
        <Handle type="target" position={Position.Top} />
        <div className="text-xs text-gray-500 mb-1">Aprobación</div>
        <div className="font-bold text-sm">{data.label as string}</div>
        <div className="flex gap-1 mt-2">
            <button className="bg-green-500 text-white text-xs px-2 py-1 rounded">✓</button>
            <button className="bg-red-500 text-white text-xs px-2 py-1 rounded">✗</button>
        </div>
        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    // Registrás tus tipos custom acá
    const nodeTypes = { approval: ApprovalNode }

    const nodes = [
    { id: '1', type: 'approval', position: { x: 100, y: 100 }, data: { label: 'Revisar PR' } },
    { id: '2', type: 'approval', position: { x: 100, y: 280 }, data: { label: 'Deploy a prod' } },
    ]

    const edges = [{ id: 'e1-2', source: '1', target: '2' }]

    export default function CustomNodes() {
    return (
        <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
        </div>
    )
    }