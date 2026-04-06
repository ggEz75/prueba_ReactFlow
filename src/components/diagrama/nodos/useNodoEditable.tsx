    import { useState, type KeyboardEvent } from 'react'
    import { useReactFlow } from '@xyflow/react'

    // Hook compartido por todos los nodos
    // Maneja la edición de label con doble click
    export function useNodoEditable(id: string, labelActual: string) {
    const [editando, setEditando] = useState(false)
    const [draft,    setDraft]    = useState(labelActual)
    const { updateNodeData }      = useReactFlow()

    const confirmar = () => {
        setEditando(false)
        updateNodeData(id, { label: draft.trim() || labelActual })
    }

    const onDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setDraft(labelActual)
        setEditando(true)
    }

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); confirmar() }
        if (e.key === 'Escape') setEditando(false)
    }

    // Textarea en lugar de input → permite labels multilínea
    const InputEdicion = editando ? (
        <textarea
        autoFocus
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={confirmar}
        onKeyDown={onKeyDown}
        onClick={e => e.stopPropagation()}
        rows={2}
        className="
            absolute inset-0 w-full h-full z-10
            text-center text-xs font-semibold resize-none
            bg-white/95 border border-blue-400 rounded
            outline-none px-1 py-1
        "
        />
    ) : null

    return { editando, onDoubleClick, InputEdicion }
    }