    import type { Node, Edge } from '@xyflow/react'

    // ── Tipos de nodo disponibles ──────────────────────────────────
    export type TipoNodo =
    | 'oval'
    | 'rectangulo'
    | 'rombo'
    | 'paralelogramo'
    | 'cilindro'
    | 'documento'
    | 'nube'
    | 'actor'
    | 'swimlane'

    // ── Data interna de cada nodo ──────────────────────────────────
    // Es lo que vive en node.data dentro de React Flow
    export interface DatosNodo {
    label:       string
    descripcion?: string   // uso futuro: tooltip o panel derecho
    color?:      string    // personalización por nodo
    }

    // ── Nodo tipado (extiende el Node genérico de React Flow) ──────
    export type NododiagramaTipo = Node<DatosNodo, TipoNodo>

    // ── Comentario por nodo ────────────────────────────────────────
    export interface Comentario {
    id:          string
    diagrama_id: string
    node_id:     string    // id del nodo en React Flow
    usuario_id:  string
    contenido:   string
    created_at:  string
    // Join con la tabla usuarios (se resuelve en el hook)
    usuario?: {
        nombre:     string
        apellido:   string
        avatar_url: string | null
    }
    }

    // ── Estado del editor (lo que vive en Zustand) ─────────────────
    export interface EstadoEditor {
    diagramaId:       string | null
    titulo:           string
    nodes:            NododiagramaTipo[]
    edges:            Edge[]
    nodoSeleccionado: string | null  // id del nodo con foco
    guardando:        boolean
    modificado:       boolean        // hay cambios sin guardar
    }

    // ── Item del catálogo del sidebar ─────────────────────────────
    export interface ItemCatalogo {
    tipo:          TipoNodo
    label:         string
    descripcion:   string           // tooltip explicativo
    labelDefault:  string           // texto inicial al crear
    }

    // ── Diagrama completo (estructura para guardar/cargar) ─────────
    export interface DiagramaGuardado {
    id:            string
    titulo:        string
    secretaria_id: string
    formulario_id: string | null
    nodes:         NododiagramaTipo[]
    edges:         Edge[]
    creado_por:    string
    created_at:    string
    updated_at:    string
    }