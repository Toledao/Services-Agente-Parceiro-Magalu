import express from 'express'

const app = express()

app.get('/', (request, response) => response.json({ message: 'services-agente-parceiro-magalu'}))

app.listen(3333)