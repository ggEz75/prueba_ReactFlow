    import express  from 'express'
    import cors     from 'cors'
    import Database from 'better-sqlite3'
    import path     from 'path'
    import { fileURLToPath } from 'url'

    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const app       = express()

    // ── Base de datos ──────────────────────────────────────────────
    // El archivo .db se crea automáticamente en /server/ si no existe
    const db = new Database(path.join(__dirname, 'diagrams.db'))

    // Creamos la tabla si no existe
    // nodes y edges se guardan como JSON string (columna TEXT)
    // SQLite no tiene tipo JSON nativo, pero TEXT + JSON.parse/stringify funciona perfecto
    db.exec(`
    CREATE TABLE IF NOT EXISTS diagrams (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT    NOT NULL DEFAULT 'Sin nombre',
        nodes     TEXT    NOT NULL DEFAULT '[]',
        edges     TEXT    NOT NULL DEFAULT '[]',
        createdAt TEXT    NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT    NOT NULL DEFAULT (datetime('now'))
    )
    `)

    app.use(cors())
    app.use(express.json())

    // ── GET /api/diagrams ──────────────────────────────────────────
    // Lista todos los diagramas (sin nodes/edges para no sobrecargar)
    app.get('/api/diagrams', (req, res) => {
    const rows = db.prepare(`
        SELECT id, name, createdAt, updatedAt FROM diagrams ORDER BY updatedAt DESC
    `).all()
    res.json(rows)
    })

    // ── GET /api/diagrams/:id ──────────────────────────────────────
    // Carga un diagrama completo
    app.get('/api/diagrams/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM diagrams WHERE id = ?').get(req.params.id)
    if (!row) return res.status(404).json({ error: 'No encontrado' })

    // Parseamos los JSON strings de vuelta a arrays
    res.json({
        ...row,
        nodes: JSON.parse(row.nodes),
        edges: JSON.parse(row.edges),
    })
    })

    // ── POST /api/diagrams ─────────────────────────────────────────
    // Crea un diagrama nuevo
    app.post('/api/diagrams', (req, res) => {
    const { name = 'Sin nombre', nodes = [], edges = [] } = req.body

    const result = db.prepare(`
        INSERT INTO diagrams (name, nodes, edges) VALUES (?, ?, ?)
    `).run(name, JSON.stringify(nodes), JSON.stringify(edges))

    res.status(201).json({ id: result.lastInsertRowid, name })
    })

    // ── PUT /api/diagrams/:id ──────────────────────────────────────
    // Actualiza un diagrama existente
    app.put('/api/diagrams/:id', (req, res) => {
    const { name, nodes, edges } = req.body

    db.prepare(`
        UPDATE diagrams
        SET name = ?, nodes = ?, edges = ?, updatedAt = datetime('now')
        WHERE id = ?
    `).run(name, JSON.stringify(nodes), JSON.stringify(edges), req.params.id)

    res.json({ ok: true })
    })

    // ── DELETE /api/diagrams/:id ───────────────────────────────────
    app.delete('/api/diagrams/:id', (req, res) => {
    db.prepare('DELETE FROM diagrams WHERE id = ?').run(req.params.id)
    res.json({ ok: true })
    })

    app.listen(3001, () => {
    console.log('API corriendo en http://localhost:3001')
    })