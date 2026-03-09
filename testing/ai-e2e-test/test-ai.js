process.loadEnvFile()

import { test } from 'node:test'
import { Stagehand, AISdkClient } from '@browserbasehq/stagehand'
import { createOpenAI } from '@ai-sdk/openai'

test('Un usuario puede entrar a la JSConf y acceder a los patrocinadores', async () => {
    const groq = createOpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
})

const stagehand = new Stagehand({
    env: 'LOCAL',
    llmClient: new AISdkClient({
        model: groq.chat('meta-llama/llama-4-scout-17b-16e-instruct'),
    }),
    })

    await stagehand.init()

    const [ page ] = stagehand.context.pages()
    await page.goto('https://jsconf.es')
    
    await stagehand.act('Click the "Patrocinadores" button')

    const { extraction } = await stagehand.extract('Keep the information of the cards at "Nuestros Patrocinadores"')
    console.log(extraction)

    await stagehand.close()
})