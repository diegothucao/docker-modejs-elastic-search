import cors from 'cors'
import { urlencoded, json } from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import { searhState, searhStateAndEmployer, searhNotStateAndEmployer, termAccountNumber, getAll }  from './Query'
dotenv.load()

const app = express()
app.use(urlencoded({ extended: true, limit: '500mb' }))
app.use(json({ extended: true, limit: '500mb' }))
app.use(cors())

app.get('/all', (_, res) => {
  getAll().then(data => {
    res.send(data)
  })
})

app.get('/states/:state', (req, res) => {
  searhState(req.params.state).then(data => {
    res.send(data)
  })
})

app.get('/must/states/:state/employers/:employer', (req, res) => {
  searhStateAndEmployer(req.params.state, req.params.employer).then(data => {
    res.send(data)
  })
})


app.get('/mustnot/states/:state/employers/:employer', (req, res) => {
  searhNotStateAndEmployer(req.params.state, req.params.employer).then(data => {
    res.send(data)
  })
})

app.get('/accounts/:accountNumber', (req, res) => {
  termAccountNumber(req.params.accountNumber).then(data => {
    res.send(data)
  })
})

let server = app.listen(process.env.PORT || 8080)
server.setTimeout(500000)
