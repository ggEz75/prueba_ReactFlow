    // Exporta todos los nodos y el objeto nodeTypes
    // DiagramaCanvas importa solo este archivo — si agregás un nodo nuevo,
    // solo tocás este index, no el canvas

    import { NodoOval }          from './NodoOval'
    import { NodoRectangulo }    from './NodoRectangulo'
    import { NodoRombo }         from './NodoRombo'
    import { NodoParalelogramo } from './NodoParalelogramo'
    import { NodoCilindro }      from './NodoCilindro'
    import { NodoDocumento }     from './NodoDocumento'
    import { NodoNube }          from './NodoNube'
    import { NodoActor }         from './NodoActor'
    import { NodoSwimLane }      from './NodoSwimLane'

    // Este objeto es lo que React Flow necesita
    // La clave debe coincidir exactamente con node.type
    export const nodeTypes = {
    oval:          NodoOval,
    rectangulo:    NodoRectangulo,
    rombo:         NodoRombo,
    paralelogramo: NodoParalelogramo,
    cilindro:      NodoCilindro,
    documento:     NodoDocumento,
    nube:          NodoNube,
    actor:         NodoActor,
    swimlane:      NodoSwimLane,
    } as const

    // Re-exportamos los componentes por si alguien los necesita individualmente
    export {
    NodoOval,
    NodoRectangulo,
    NodoRombo,
    NodoParalelogramo,
    NodoCilindro,
    NodoDocumento,
    NodoNube,
    NodoActor,
    NodoSwimLane,
    }