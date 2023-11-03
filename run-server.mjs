#!/usr/bin/env node

import http from 'http'
import cluster from 'cluster'
import { availableParallelism } from 'os'

if (cluster.isPrimary) {
  const numberOfCPUs = availableParallelism()
  console.log('Number of available CPUs:', numberOfCPUs)
  console.log('Primary', process.pid, 'started')

  for (let i = 0; i < numberOfCPUs; i++) cluster.fork()

  // automatically restart if a node exists due to an exception
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker', worker.process.pid, 'died - reforking')
    cluster.fork()
  })
} else {
  http.createServer((req, res) => {
    if (req.url === '/error') {
      throw new Error('Testing cluster ability to auto-restart nodes')
    } else if (req.url === '/about') {
      res.end('from node.js!\n')
    } else {
      res.end('Hello, world!\n')
    }
  }).listen(9000)

  console.log('Worker', process.pid, 'started. Server listening on port 9000...')
}
