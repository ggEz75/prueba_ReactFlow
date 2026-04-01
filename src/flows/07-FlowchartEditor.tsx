    import { useState, useCallback, useRef, type DragEvent, type KeyboardEvent } from 'react'
    import {
    ReactFlow, ReactFlowProvider, Background, Controls, MiniMap,
    addEdge, useNodesState, useEdgesState, useReactFlow,
    BackgroundVariant, type Connection, type NodeProps,
    Handle, Position,
    } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'
    import { useDiagramStorage } from '../hooks/useDiagramStorage'

    // ─────────────────────────────────────────────────────────────
    // HOOK: editar label con doble click
    // Lo extraemos como hook para reutilizarlo en cada forma
    // ─────────────────────────────────────────────────────────────

    function useEditableLabel(id: string, initialLabel: string) {
    const [editing, setEditing]   = useState(false)
    const [draft,   setDraft]     = useState(initialLabel)
    const { updateNodeData }      = useReactFlow()

    const confirm = () => {
        setEditing(false)
        // Actualiza el label en el estado global del canvas
        updateNodeData(id, { label: draft || initialLabel })
    }

    const onDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation() // evita que React Flow interprete el doble click
        setDraft(initialLabel)
        setEditing(true)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')  confirm()
        if (e.key === 'Escape') setEditing(false)
    }

    // El input que se muestra al editar
    const EditInput = editing ? (
        <input
        autoFocus
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={confirm}
        onKeyDown={onKeyDown}
        onClick={e => e.stopPropagation()}
        className="absolute inset-0 w-full h-full text-center text-xs font-semibold
                    bg-white/90 border border-blue-400 rounded outline-none z-10 px-1"
        />
    ) : null

    return { editing, onDoubleClick, EditInput }
    }

    // ─────────────────────────────────────────────────────────────
    // FORMAS — cada una usa useEditableLabel
    // ─────────────────────────────────────────────────────────────

    function RectNode({ id, data, selected }: NodeProps) {
    const { onDoubleClick, EditInput } = useEditableLabel(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className={`relative flex items-center justify-center w-36 h-14
                    bg-white border-2 rounded text-sm font-medium cursor-default
                    transition-colors select-none
                    ${selected ? 'border-blue-500 shadow-lg' : 'border-gray-600'}`}
        >
        <Handle type="target" position={Position.Top} />
        {EditInput}
        {!EditInput && <span>{data.label as string}</span>}
        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    function DiamondNode({ id, data, selected }: NodeProps) {
    const { onDoubleClick, EditInput } = useEditableLabel(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 120, height: 80 }}
        >
        <Handle type="target" position={Position.Top}    style={{ top: 0 }} />
        <Handle type="source" position={Position.Bottom} style={{ bottom: 0 }} />
        <Handle type="source" position={Position.Right}  id="yes" style={{ right: 0 }} />
        <Handle type="source" position={Position.Left}   id="no"  style={{ left: 0 }} />

        <svg width="120" height="80" viewBox="0 0 120 80">
            <polygon
            points="60,4 116,40 60,76 4,40"
            fill="white"
            stroke={selected ? '#3b82f6' : '#f59e0b'}
            strokeWidth={selected ? 3 : 2}
            />
        </svg>

        {EditInput}
        {!EditInput && (
            <span className="absolute text-xs font-semibold text-center px-2 leading-tight">
            {data.label as string}
            </span>
        )}
        </div>
    )
    }

    function OvalNode({ id, data, selected }: NodeProps) {
    const { onDoubleClick, EditInput } = useEditableLabel(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 120, height: 50 }}
        >
        <Handle type="target" position={Position.Top} />
        <svg width="120" height="50" viewBox="0 0 120 50">
            <ellipse cx="60" cy="25" rx="58" ry="23"
            fill="#dcfce7"
            stroke={selected ? '#3b82f6' : '#16a34a'}
            strokeWidth={selected ? 3 : 2}
            />
        </svg>
        {EditInput}
        {!EditInput && (
            <span className="absolute text-xs font-semibold">{data.label as string}</span>
        )}
        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    function DatabaseNode({ id, data, selected }: NodeProps) {
    const { onDoubleClick, EditInput } = useEditableLabel(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 90, height: 80 }}
        >
        <Handle type="target" position={Position.Top} />
        <svg width="90" height="80" viewBox="0 0 90 80">
            <rect x="4" y="16" width="82" height="52"
            fill="#eff6ff"
            stroke={selected ? '#2563eb' : '#3b82f6'}
            strokeWidth={selected ? 3 : 2}
            />
            <ellipse cx="45" cy="16" rx="41" ry="10"
            fill="#dbeafe"
            stroke={selected ? '#2563eb' : '#3b82f6'}
            strokeWidth={selected ? 3 : 2}
            />
            <ellipse cx="45" cy="68" rx="41" ry="10"
            fill="#dbeafe"
            stroke={selected ? '#2563eb' : '#3b82f6'}
            strokeWidth={selected ? 3 : 2}
            />
        </svg>
        {EditInput}
        {!EditInput && (
            <span
            className="absolute text-xs font-semibold text-center px-1 leading-tight"
            style={{ top: '30%' }}
            >
            {data.label as string}
            </span>
        )}
        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    function ParallelogramNode({ id, data, selected }: NodeProps) {
    const { onDoubleClick, EditInput } = useEditableLabel(id, data.label as string)

    return (
        <div
        onDoubleClick={onDoubleClick}
        className="relative flex items-center justify-center cursor-default select-none"
        style={{ width: 130, height: 55 }}
        >
        <Handle type="target" position={Position.Top} />
        <svg width="130" height="55" viewBox="0 0 130 55">
            <polygon
            points="20,4 126,4 110,51 4,51"
            fill="#fdf4ff"
            stroke={selected ? '#3b82f6' : '#a855f7'}
            strokeWidth={selected ? 3 : 2}
            />
        </svg>
        {EditInput}
        {!EditInput && (
            <span className="absolute text-xs font-semibold">{data.label as string}</span>
        )}
        <Handle type="source" position={Position.Bottom} />
        </div>
    )
    }

    // ─────────────────────────────────────────────────────────────
    // CATÁLOGO DEL SIDEBAR
    // ─────────────────────────────────────────────────────────────

    const SHAPE_CATALOG = [
    {
        type: 'oval', label: 'Inicio / Fin', defaultLabel: 'Inicio',
        preview: (
        <svg width="80" height="36" viewBox="0 0 120 50">
            <ellipse cx="60" cy="25" rx="58" ry="23" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="60" y="29" textAnchor="middle" fontSize="14" fill="#166534">Inicio</text>
        </svg>
        ),
    },
    {
        type: 'rect', label: 'Proceso', defaultLabel: 'Proceso',
        preview: (
        <svg width="80" height="36" viewBox="0 0 120 50">
            <rect x="4" y="4" width="112" height="42" fill="white" stroke="#374151" strokeWidth="2" rx="4" />
            <text x="60" y="29" textAnchor="middle" fontSize="14" fill="#111827">Proceso</text>
        </svg>
        ),
    },
    {
        type: 'diamond', label: 'Decisión', defaultLabel: '¿Condición?',
        preview: (
        <svg width="80" height="50" viewBox="0 0 120 80">
            <polygon points="60,4 116,40 60,76 4,40" fill="white" stroke="#f59e0b" strokeWidth="2" />
            <text x="60" y="44" textAnchor="middle" fontSize="12" fill="#92400e">¿Sí/No?</text>
        </svg>
        ),
    },
    {
        type: 'parallelogram', label: 'Entrada / Salida', defaultLabel: 'Datos',
        preview: (
        <svg width="80" height="36" viewBox="0 0 130 55">
            <polygon points="20,4 126,4 110,51 4,51" fill="#fdf4ff" stroke="#a855f7" strokeWidth="2" />
            <text x="65" y="33" textAnchor="middle" fontSize="13" fill="#6b21a8">I/O</text>
        </svg>
        ),
    },
    {
        type: 'database', label: 'Base de datos', defaultLabel: 'DB',
        preview: (
        <svg width="60" height="50" viewBox="0 0 90 80">
            <rect x="4" y="16" width="82" height="52" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <ellipse cx="45" cy="16" rx="41" ry="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <ellipse cx="45" cy="68" rx="41" ry="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
            <text x="45" y="46" textAnchor="middle" fontSize="12" fill="#1e40af">DB</text>
        </svg>
        ),
    },
    ]

    const nodeTypes = {
    rect:          RectNode,
    diamond:       DiamondNode,
    oval:          OvalNode,
    database:      DatabaseNode,
    parallelogram: ParallelogramNode,
    }

    // ─────────────────────────────────────────────────────────────
    // SIDEBAR ITEM
    // ─────────────────────────────────────────────────────────────

    function SidebarItem({ type, label, defaultLabel, preview }: typeof SHAPE_CATALOG[0]) {
    const onDragStart = (e: DragEvent) => {
        e.dataTransfer.setData('application/reactflow-type',  type)
        e.dataTransfer.setData('application/reactflow-label', defaultLabel)
        e.dataTransfer.effectAllowed = 'move'
    }

    return (
        <div
        draggable
        onDragStart={onDragStart}
        className="flex flex-col items-center gap-1 p-2 rounded-lg border border-gray-200
                    bg-white cursor-grab hover:border-blue-400 hover:shadow-md
                    transition-all active:cursor-grabbing select-none"
        >
        {preview}
        <span className="text-xs text-gray-600 text-center leading-tight">{label}</span>
        </div>
    )
    }

    // ─────────────────────────────────────────────────────────────
    // CANVAS
    // ─────────────────────────────────────────────────────────────

    let nodeIdCounter = 10

    function Canvas() {
    const reactFlowWrapper          = useRef<HTMLDivElement>(null)
    const { screenToFlowPosition }  = useReactFlow()
    const { save, load, remove, fetchList, diagrams, saving } = useDiagramStorage()
const [diagramName,  setDiagramName]  = useState('Mi diagrama')
const [showLoadMenu, setShowLoadMenu] = useState(false)

const handleSave = () => save(diagramName, nodes, edges)

    const handleLoad = async (id: number) => {
    const data = await load(id)
    if (data) {
        setNodes(data.nodes.filter(node => node.type !== undefined) as typeof nodes)
        setEdges(data.edges.map(edge => ({ ...edge, animated: true })))
        setDiagramName(data.name)
        setShowLoadMenu(false)
    }
    }

    const handleOpenLoadMenu = () => {
    fetchList()
    setShowLoadMenu(true)
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([
        { id: '1', type: 'oval',  position: { x: 200, y: 50  }, data: { label: 'Inicio' } },
        { id: '2', type: 'rect',  position: { x: 195, y: 160 }, data: { label: 'Proceso' } },
        { id: '3', type: 'oval',  position: { x: 200, y: 280 }, data: { label: 'Fin' } },
    ])

    const [edges, setEdges, onEdgesChange] = useEdgesState([
        // animated: true en todos los edges iniciales
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
    ])

    const onConnect = useCallback(
        (connection: Connection) =>
        // animated: true en cada edge nuevo que el usuario crea
        setEdges(eds => addEdge({ ...connection, animated: true }, eds)),
        [setEdges]
    )

    const onDragOver = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback((e: DragEvent) => {
        e.preventDefault()
        const type  = e.dataTransfer.getData('application/reactflow-type')
        const label = e.dataTransfer.getData('application/reactflow-label')
        if (!type) return

        const position = screenToFlowPosition({ x: e.clientX, y: e.clientY })
        setNodes(nds => [...nds, {
        id:   `node-${++nodeIdCounter}`,
        type,
        position,
        data: { label },
        }])
    }, [screenToFlowPosition, setNodes])

// Justo antes del return de Canvas, reemplazá el return completo:
    return (
    <div ref={reactFlowWrapper} className="w-full h-full flex flex-col">

        {/* ── Barra de herramientas ── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-200 shrink-0">
        <input
            value={diagramName}
            onChange={e => setDiagramName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-44 focus:outline-blue-400"
            placeholder="Nombre del diagrama"
        />

        <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50
                    text-white text-xs px-3 py-1.5 rounded font-medium transition-colors"
        >
            {saving ? 'Guardando...' : '💾 Guardar'}
        </button>

        <button
            onClick={handleOpenLoadMenu}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700
                    text-xs px-3 py-1.5 rounded font-medium transition-colors"
        >
            📂 Cargar
        </button>

        {/* Menú desplegable de diagramas guardados */}
        {showLoadMenu && (
            <div className="absolute top-24 left-56 z-50 bg-white border border-gray-200
                            rounded-lg shadow-xl w-72 max-h-80 overflow-y-auto">
            <div className="flex justify-between items-center p-3 border-b">
                <span className="text-sm font-semibold text-gray-700">Diagramas guardados</span>
                <button onClick={() => setShowLoadMenu(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {diagrams.length === 0 ? (
                <p className="text-xs text-gray-400 p-4 text-center">No hay diagramas guardados</p>
            ) : (
                diagrams.map(d => (
                <div key={d.id}
                    className="flex items-center justify-between px-3 py-2
                                hover:bg-gray-50 border-b border-gray-100">
                    <div>
                    <p className="text-sm font-medium text-gray-800">{d.name}</p>
                    <p className="text-xs text-gray-400">
                        {new Date(d.updatedAt).toLocaleString('es-AR')}
                    </p>
                    </div>
                    <div className="flex gap-1">
                    <button
                        onClick={() => handleLoad(d.id)}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                    >
                        Cargar
                    </button>
                    <button
                        onClick={() => remove(d.id)}
                        className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                    >
                        ✕
                    </button>
                    </div>
                </div>
                ))
            )}
            </div>
        )}
        </div>

        {/* ── Canvas ── */}
        <div className="flex-1">
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode="Delete"
        >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e5e7eb" />
            <Controls />
            <MiniMap nodeStrokeWidth={3} zoomable pannable />
        </ReactFlow>
        </div>
    </div>
    )
    }

    // ─────────────────────────────────────────────────────────────
    // RAÍZ
    // ─────────────────────────────────────────────────────────────

    export default function FlowchartEditor() {
    return (
        <div className="flex" style={{ height: '650px' }}>
        <aside className="w-52 shrink-0 bg-gray-50 border-r border-gray-200
                            p-3 flex flex-col gap-2 overflow-y-auto">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
            Formas
            </p>
            {SHAPE_CATALOG.map(shape => (
            <SidebarItem key={shape.type} {...shape} />
            ))}
            <div className="mt-4 p-2 bg-blue-50 rounded text-xs text-blue-700 leading-relaxed">
            <strong>Tip:</strong> Arrastrá una forma al canvas.<br />
            Conectá nodos desde los puntos.<br />
            <kbd className="bg-white border px-1 rounded">Doble click</kbd> para editar texto.<br />
            <kbd className="bg-white border px-1 rounded">Delete</kbd> para eliminar.
            </div>
        </aside>

        <div className="flex-1">
            <ReactFlowProvider>
            <Canvas />
            </ReactFlowProvider>
        </div>
        </div>
    )
    }