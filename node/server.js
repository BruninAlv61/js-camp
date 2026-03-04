import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'

process.loadEnvFile()
const port = process.env.PORT ?? 3000

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.end(JSON.stringify(data))
}

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
]

const server = createServer( async (req, res) => {
    const { method, url } = req

    const [ pathname, querystring ] = url.split('?')

    const searchParams = new URLSearchParams(querystring)

    if (method === 'GET') {
        if (pathname === '/users') {
            const limit = Number(searchParams.get('limit')) || users.length
            const offset = Number(searchParams.get('offset')) || 0

            const paginatedUsers = users.slice(offset, offset + limit)
            return sendJson(res, 200, paginatedUsers)
        }

        if (pathname === '/health') {
            return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
        }
    }

    if (method === 'POST') {
        if (pathname === '/users') {
            const body = await json(req)

            if (!body || !body.name) {
                return sendJson(res, 400, { error: 'Name is required' })
            }

            const newUser = {
                id: randomUUID(),
                name: body.name
            }

            users.push(newUser)
            return sendJson(res, 201, { message: 'User created', user: newUser })
        }
    }

    return sendJson(res, 404, { error: 'Not Found' })
})

server.listen(port, () => {
    const address = server.address()
    console.log(`Server running at http://localhost:${address.port}`)
})