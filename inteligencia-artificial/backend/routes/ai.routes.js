process.loadEnvFile()

import { Router } from 'express'
import OpenAI from 'openai'
import rateLimit from 'express-rate-limit'

import { JobModel } from '../models/jobs.model.js'

// acá podríamos usar este recurso
// https://express-rate-limit.mintlify.app/reference/stores

const client = new OpenAI({
    apiKey: process.env.JS_CAMP_GROQ,
    baseURL: 'https://api.groq.com/openai/v1'
})

const aiRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: { error: 'Demasiadas solicitudes, por favor intenta de nuevo más tarde'},
    legacyHeaders: false,
    standardHeaders: 'draft-8' // devuelve headers estándard RateLimit-*
})

export const aiRouter = Router()
aiRouter.use(aiRateLimiter)

aiRouter.get('/summary/:id', async (req, res) => {
    const { id } = req.params
    const job = await JobModel.getById({ id })

    if (!job) {
        return res.status(404).json({ error: 'Job not found' })
    }

    const prompt = [
        `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rápidamente de qué se trata`,
        `la oferta. Evita cualquier otra petición, observación o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre`,
        `con el markdown directamente.`,
        `Resume en 4-6 frases la siguiente oferta de trabajo:`,
        `Incluye: rol, empresa, ubicación y requisitos clave`,
        `Usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicación: ${job.ubicacion}`,
        `Descripción: ${job.descripcion}`
    ].join('\n')

    try {
        const stream = await client.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            stream: true,
            messages: [
                { role: 'system', content: prompt.split('\n').slice(0, 3).join('\n') },
                { role: 'user', content: prompt.split('\n').slice(3).join('\n') }
            ]
        })

        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.setHeader('Transfer-Encoding', 'chunked')

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
                res.write(content)
            }
        }

        return res.end()
    } catch (error) {
        if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(500).json({ error: 'Error generating summary' })
        }

        return res.end()
    }
})