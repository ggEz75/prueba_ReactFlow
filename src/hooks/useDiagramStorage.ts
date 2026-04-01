    import { useState } from 'react'
    import type { Node, Edge } from '@xyflow/react'

    interface DiagramMeta {
    id: number
    name: string
    createdAt: string
    updatedAt: string
    }

    export function useDiagramStorage() {
    const [saving,    setSaving]    = useState(false)
    const [loading,   setLoading]   = useState(false)
    const [diagrams,  setDiagrams]  = useState<DiagramMeta[]>([])
    const [currentId, setCurrentId] = useState<number | null>(null)

    // Listar diagramas guardados
    const fetchList = async () => {
        const res  = await fetch('/api/diagrams')
        const data = await res.json()
        setDiagrams(data)
    }

    // Guardar — si hay currentId actualiza, si no crea uno nuevo
    const save = async (name: string, nodes: Node[], edges: Edge[]) => {
        setSaving(true)
        try {
        if (currentId) {
            await fetch(`/api/diagrams/${currentId}`, {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ name, nodes, edges }),
            })
        } else {
            const res  = await fetch('/api/diagrams', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ name, nodes, edges }),
            })
            const data = await res.json()
            setCurrentId(data.id)
        }
        } finally {
        setSaving(false)
        }
    }

    // Cargar un diagrama por id
    const load = async (id: number) => {
        setLoading(true)
        try {
        const res  = await fetch(`/api/diagrams/${id}`)
        const data = await res.json()
        setCurrentId(id)
        return { nodes: data.nodes as Node[], edges: data.edges as Edge[], name: data.name }
        } finally {
        setLoading(false)
        }
    }

    // Eliminar
    const remove = async (id: number) => {
        await fetch(`/api/diagrams/${id}`, { method: 'DELETE' })
        if (currentId === id) setCurrentId(null)
        await fetchList()
    }

    return { save, load, remove, fetchList, diagrams, saving, loading, currentId }
    }