    import { nodeTypes } from './nodos'
    import { useCallback, useRef, type DragEvent } from 'react'
    import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
    BackgroundVariant,
    type Connection,
    type Node,
    type Edge,
    type OnNodesChange,
    type OnEdgesChange,
    } from '@xyflow/react'
    import '@xyflow/react/dist/style.css'
    import type { TipoNodo, NododiagramaTipo } from '../../lib/diagrama/tipos'
    import { CONFIG_EDITOR } from '../../lib/diagrama/constantes'
    

    interface Props {
    nodes:          NododiagramaTipo[]
    edges:          Edge[]
    onNodesChange:  OnNodesChange
    onEdgesChange:  OnEdgesChange
    onSetNodes:     (fn: (nds: NododiagramaTipo[]) => NododiagramaTipo[]) => void
    onSetEdges:     (fn: (eds: Edge[]) => Edge[]) => void
    onSeleccionar:  (id: string | null) => void
    onModificado:   () => void
    }

    let contadorId = 100

    function generarId(): string {
    return `nodo-${++contadorId}-${Date.now()}`
    }

    const DiagramaCanvas = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onSetNodes,
    onSetEdges,
    onSeleccionar,
    onModificado,
    }: Props) => {
    const wrapper                  = useRef<HTMLDivElement>(null)
    const { screenToFlowPosition } = useReactFlow()

    // Cuando el usuario conecta dos nodos
    const onConnect = useCallback(
        (connection: Connection) => {
        onSetEdges(eds => addEdge({ ...connection, animated: true }, eds))
        onModificado()
        },
        [onSetEdges, onModificado]
    )

    // Necesario para permitir el drop del browser
    const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }, [])

    // Cuando se suelta una forma desde el sidebar
    const onDrop = useCallback(
        (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()

        const tipo  = e.dataTransfer.getData('application/diagrama-tipo')  as TipoNodo
        const label = e.dataTransfer.getData('application/diagrama-label')

        if (!tipo) return

        // Convertir coordenadas de pantalla → canvas
        // Respeta zoom y pan del diagrama
        const position = screenToFlowPosition({
            x: e.clientX,
            y: e.clientY,
        })

        const nuevoNodo: NododiagramaTipo = {
            id:       generarId(),
            type:     tipo,
            position,
            data:     { label },
        }

        onSetNodes(nds => [...nds, nuevoNodo])
        onModificado()
        },
        [screenToFlowPosition, onSetNodes, onModificado]
    )

    // Al hacer click en un nodo → abre panel derecho
    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
        onSeleccionar(node.id)
        },
        [onSeleccionar]
    )

    // Click en el fondo → deselecciona
    const onPaneClick = useCallback(() => {
        onSeleccionar(null)
    }, [onSeleccionar])

    // Cuando el usuario mueve/elimina nodos → marcar como modificado
    const handleNodesChange: OnNodesChange = useCallback(
        (changes) => {
        onNodesChange(changes)
        // Solo marcamos modificado si hay cambios reales (no solo selección)
        const tienesCambiosReales = changes.some(
            c => c.type === 'position' || c.type === 'remove' || c.type === 'add'
        )
        if (tienesCambiosReales) onModificado()
        },
        [onNodesChange, onModificado]
    )

    const handleEdgesChange: OnEdgesChange = useCallback(
        (changes) => {
        onEdgesChange(changes)
        const tienesCambiosReales = changes.some(
            c => c.type === 'remove' || c.type === 'add'
        )
        if (tienesCambiosReales) onModificado()
        },
        [onEdgesChange, onModificado]
    )

    return (
        <div ref={wrapper} className="w-full h-full">
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            deleteKeyCode="Delete"
            minZoom={CONFIG_EDITOR.zoomMin}
            maxZoom={CONFIG_EDITOR.zoomMax}
            fitView
        >
            <Background
            variant={BackgroundVariant.Dots}
            gap={CONFIG_EDITOR.gridSize}
            size={1}
            color="#e5e7eb"
            />
            <Controls />
            <MiniMap
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="!border-gray-200 !rounded-lg !shadow-sm"
            />
        </ReactFlow>
        </div>
    )
    }

    export default DiagramaCanvas