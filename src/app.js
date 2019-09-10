import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import  { Client } from'@elastic/elasticsearch'

dotenv.load()

const client = new Client({ node: process.env.EL_URL })
const app = express()
app.use(urlencoded({ extended: true, limit: '500mb'}))
app.use(json({ extended: true, limit: '500mb'}))
app.use(cors())

app.get('/', (_, res) => {
  searhState("CA").then( data => {
    console.log(data)
    res.send(data)
  } ) 
  })

let server = app.listen(process.env.PORT || 8080)
server.setTimeout(500000)

async function searhState(search) {
  const { body } = await client.search({
    index: 'bank',
    body: {
      query: {
        match: { state: search }
      }
    }
  })

  return body.hits.hits
}




