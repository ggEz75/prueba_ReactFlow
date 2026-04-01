// src/App.tsx
import { useState } from 'react'
import BasicFlow         from './flows/01-BasicFlow'
import CustomNodes       from './flows/02-CustomNodes'
import CustomEdges       from './flows/03-CustomEdges'
import InteractiveFlow   from './flows/04-InteractiveFlow'
import MiniMapAndControls from './flows/05-MiniMapAndControls'
import FlowchartShapes from './flows/06-FlowchartShapes'
import FlowchartEditor from './flows/07-FlowchartEditor'

const demos = [
  { id: 1, title: '01 · Flujo básico',          component: <BasicFlow /> },
  { id: 2, title: '02 · Nodos custom',           component: <CustomNodes /> },
  { id: 3, title: '03 · Edges custom',           component: <CustomEdges /> },
  { id: 4, title: '04 · Flujo interactivo',      component: <InteractiveFlow /> },
  { id: 5, title: '05 · MiniMap y Controls',     component: <MiniMapAndControls /> },
  { id: 6, title: '06 · Formas de diagrama', component: <FlowchartShapes /> },
  { id: 7, title: '07 · Editor interactivo', component: <FlowchartEditor /> },
]

export default function App() {
  const [active, setActive] = useState(1)
  const current = demos.find(d => d.id === active)!

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">React Flow · Playground</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {demos.map(d => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              active === d.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>

      {/* Demo activo */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {current.component}
      </div>
    </div>
  )
}