    import { useState, useCallback, useEffect } from 'react'
    import { ReactFlowProvider, useNodesState, useEdgesState } from '@xyflow/react'
    import type { Edge } from '@xyflow/react'

    import DiagramaToolbar          from './DiagramaToolbar'
    import DiagramaSidebarIzquierdo from './DiagramaSidebarIzquierdo'
    import DiagramaCanvas           from './DiagramaCanvas'
    import DiagramaPanelDerecho     from './DiagramaPanelDerecho'

    import type { NododiagramaTipo, Comentario } from '../../lib/diagrama/tipos'

    // ── Usuario mock ───────────────────────────────────────────────
    // TODO: reemplazar con useUser() de Supabase Auth al migrar
    const USUARIO_MOCK = {
    id:        'user-1',
    nombre:    'Juan',
    apellido:  'Pérez',
    avatar_url: null,
    }

    // ── Nodos iniciales de ejemplo ─────────────────────────────────
    const NODOS_INICIALES: NododiagramaTipo[] = [
    {
        id:       '1',
        type:     'oval',
        position: { x: 250, y: 40 },
        data:     { label: 'Inicio' },
    },
    {
        id:       '2',
        type:     'rectangulo',
        position: { x: 240, y: 160 },
        data:     { label: 'Recibir solicitud' },
    },
    {
        id:       '3',
        type:     'rombo',
        position: { x: 230, y: 290 },
        data:     { label: '¿Documentación completa?' },
    },
    {
        id:       '4',
        type:     'oval',
        position: { x: 250, y: 430 },
        data:     { label: 'Fin' },
    },
    ]

    const EDGES_INICIALES: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    ]

    // ── Comentarios mock ───────────────────────────────────────────
    // TODO: reemplazar con useComentarios() hook al migrar
    const COMENTARIOS_MOCK: Record<string, Comentario[]> = {
    '2': [
        {
        id:          'c1',
        diagrama_id: 'diagrama-1',
        node_id:     '2',
        usuario_id:  'user-1',
        contenido:   'Verificar que el formulario incluya número de expediente',
        created_at:  new Date(Date.now() - 3600000).toISOString(),
        usuario:     USUARIO_MOCK,
        },
    ],
    }

    // ── Componente interno (necesita estar dentro de ReactFlowProvider) ──
    function EditorInterno() {
    const [titulo,     setTitulo]     = useState('Nuevo diagrama')
    const [modificado, setModificado] = useState(false)
    const [guardando,  setGuardando]  = useState(false)

    // Estado del nodo seleccionado
    const [nodoSeleccionado, setNodoSeleccionado] = useState<string | null>(null)

    // Comentarios del nodo seleccionado
    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [cargandoCom, setCargandoCom] = useState(false)

    // Estado de nodos y edges (manejado por React Flow)
    const [nodes, setNodes, onNodesChange] = useNodesState(NODOS_INICIALES)
    const [edges, setEdges, onEdgesChange] = useEdgesState(EDGES_INICIALES)

    // Cuando cambia el nodo seleccionado → cargar sus comentarios
    useEffect(() => {
        if (!nodoSeleccionado) {
        setComentarios([])
        return
        }

        setCargandoCom(true)
        // TODO: reemplazar con llamada real a Supabase
        setTimeout(() => {
        setComentarios(COMENTARIOS_MOCK[nodoSeleccionado] ?? [])
        setCargandoCom(false)
        }, 300)
    }, [nodoSeleccionado])

    // Label del nodo seleccionado (para el header del panel)
    const nodoActivo = nodes.find(n => n.id === nodoSeleccionado)
    const labelActivo = nodoActivo?.data.label ?? ''

    const marcarModificado = useCallback(() => setModificado(true), [])

    // Guardar
    const handleGuardar = useCallback(async () => {
        setGuardando(true)
        try {
        // TODO: reemplazar con useDiagramaSync al migrar
        await new Promise(r => setTimeout(r, 800))
        console.log('Guardado:', { titulo, nodes, edges })
        setModificado(false)
        } finally {
        setGuardando(false)
        }
    }, [titulo, nodes, edges])

    // Agregar comentario
    const handleAgregarComentario = useCallback(async (contenido: string) => {
        // TODO: reemplazar con llamada real a Supabase
        const nuevo: Comentario = {
        id:          `c-${Date.now()}`,
        diagrama_id: 'diagrama-1',
        node_id:     nodoSeleccionado!,
        usuario_id:  USUARIO_MOCK.id,
        contenido,
        created_at:  new Date().toISOString(),
        usuario:     USUARIO_MOCK,
        }
        setComentarios(prev => [...prev, nuevo])
    }, [nodoSeleccionado])

    return (
        <div className="flex flex-col h-full">

        {/* Toolbar superior */}
        <DiagramaToolbar
            titulo={titulo}
            onTitulo={v => { setTitulo(v); setModificado(true) }}
            guardando={guardando}
            modificado={modificado}
            onGuardar={handleGuardar}
        />

        {/* Área principal: sidebar + canvas + panel */}
        <div className="flex flex-1 overflow-hidden">

            <DiagramaSidebarIzquierdo />

            <div className="flex-1 relative overflow-hidden">
            <DiagramaCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onSetNodes={setNodes as any}
                onSetEdges={setEdges as any}
                onSeleccionar={setNodoSeleccionado}
                onModificado={marcarModificado}
            />
            </div>

            <DiagramaPanelDerecho
            nodoId={nodoSeleccionado}
            nodoLabel={labelActivo}
            comentarios={comentarios}
            cargando={cargandoCom}
            onAgregar={handleAgregarComentario}
            onCerrar={() => setNodoSeleccionado(null)}
            />

        </div>
        </div>
    )
    }

    // ── Componente raíz exportado ──────────────────────────────────
    // ReactFlowProvider es obligatorio: permite que DiagramaCanvas
    // use useReactFlow() y sus hooks internos
    export default function DiagramaEditor() {
    return (
        <ReactFlowProvider>
        <EditorInterno />
        </ReactFlowProvider>
    )
    }