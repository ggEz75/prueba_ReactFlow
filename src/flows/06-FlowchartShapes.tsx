    import { ReactFlow, Handle, Position, type NodeProps } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'

    // ─── FORMA: Rectángulo (proceso normal) ───────────────────────────────────────
    function RectNode({ data }: NodeProps) {
    return (
        <div className="relative flex items-center justify-center
                        w-36 h-14 bg-white border-2 border-gray-700 rounded text-sm font-medium">
        <Handle type="target" position={Position.Top} />
        {data.label as string}
        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    // ─── FORMA: Rombo (decisión) ───────────────────────────────────────────────────
    // El truco: SVG con polygon + texto absoluto centrado encima
    function DiamondNode({ data }: NodeProps) {
    return (
        <div className="relative flex items-center justify-center" style={{ width: 120, height: 80 }}>
        <Handle type="target" position={Position.Top} style={{ top: 0 }} />

        {/* La forma SVG */}
        <svg width="120" height="80" viewBox="0 0 120 80">
            <polygon
            points="60,4 116,40 60,76 4,40"
            fill="white"
            stroke="#f59e0b"
            strokeWidth="2"
            />
        </svg>

        {/* Texto centrado encima del SVG */}
        <span className="absolute text-xs font-semibold text-center px-2 leading-tight">
            {data.label as string}
        </span>

        <Handle type="source" position={Position.Bottom} style={{ bottom: 0 }} />
        {/* Salidas laterales para Sí/No */}
        <Handle type="source" position={Position.Right} id="yes" style={{ right: 0 }} />
        <Handle type="source" position={Position.Left}  id="no"  style={{ left: 0 }} />
        </div>
    )
    }

    // ─── FORMA: Óvalo (inicio / fin) ───────────────────────────────────────────────
    function OvalNode({ data }: NodeProps) {
    return (
        <div className="relative flex items-center justify-center"
            style={{ width: 120, height: 50 }}>
        <Handle type="target" position={Position.Top} />

        <svg width="120" height="50" viewBox="0 0 120 50">
            <ellipse cx="60" cy="25" rx="58" ry="23"
            fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        </svg>

        <span className="absolute text-xs font-semibold">
            {data.label as string}
        </span>

        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    // ─── FORMA: Cilindro (base de datos) ──────────────────────────────────────────
    function DatabaseNode({ data }: NodeProps) {
    return (
        <div className="relative flex items-center justify-center"
            style={{ width: 90, height: 80 }}>
        <Handle type="target" position={Position.Top} />

        <svg width="90" height="80" viewBox="0 0 90 80">
            {/* Cuerpo */}
            <rect x="4" y="16" width="82" height="52"
            fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            {/* Tapa superior */}
            <ellipse cx="45" cy="16" rx="41" ry="10"
            fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            {/* Tapa inferior */}
            <ellipse cx="45" cy="68" rx="41" ry="10"
            fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        </svg>

        <span className="absolute text-xs font-semibold text-center px-1 leading-tight"
                style={{ top: '30%' }}>
            {data.label as string}
        </span>

        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    // ─── FORMA: Paralelogramo (entrada/salida de datos) ────────────────────────────
    function ParallelogramNode({ data }: NodeProps) {
    return (
        <div className="relative flex items-center justify-center"
            style={{ width: 130, height: 55 }}>
        <Handle type="target" position={Position.Top} />

        <svg width="130" height="55" viewBox="0 0 130 55">
            <polygon
            points="20,4 126,4 110,51 4,51"
            fill="#fdf4ff" stroke="#a855f7" strokeWidth="2"
            />
        </svg>

        <span className="absolute text-xs font-semibold">
            {data.label as string}
        </span>

        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    // ─── Registro de tipos ─────────────────────────────────────────────────────────
    const nodeTypes = {
    rect:          RectNode,
    diamond:       DiamondNode,
    oval:          OvalNode,
    database:      DatabaseNode,
    parallelogram: ParallelogramNode,
    }

    // ─── Nodos del diagrama de ejemplo ────────────────────────────────────────────
    const nodes = [
    { id: '1', type: 'oval',          position: { x: 160, y: 0   }, data: { label: 'Inicio' } },
    { id: '2', type: 'parallelogram', position: { x: 145, y: 90  }, data: { label: 'Ingresar datos' } },
    { id: '3', type: 'rect',          position: { x: 162, y: 190 }, data: { label: 'Procesar' } },
    { id: '4', type: 'diamond',       position: { x: 150, y: 300 }, data: { label: '¿Es válido?' } },
    { id: '5', type: 'database',      position: { x: 330, y: 295 }, data: { label: 'DB guardar' } },
    { id: '6', type: 'rect',          position: { x: 10,  y: 295 }, data: { label: 'Mostrar error' } },
    { id: '7', type: 'oval',          position: { x: 162, y: 440 }, data: { label: 'Fin' } },
    ]

    const edges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    // Salida "Sí" del rombo → base de datos
    { id: 'e4-5', source: '4', target: '5', sourceHandle: 'yes', label: 'Sí', animated: true },
    // Salida "No" del rombo → error
    { id: 'e4-6', source: '4', target: '6', sourceHandle: 'no',  label: 'No' },
    { id: 'e5-7', source: '5', target: '7' },
    ]

    // ─── Componente principal ──────────────────────────────────────────────────────
    export default function FlowchartShapes() {
    return (
        <div style={{ width: '100%', height: '600px' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
        />
        </div>
    )
    }