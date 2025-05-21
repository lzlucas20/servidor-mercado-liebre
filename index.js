import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

// Configuración de rutas del sistema de archivos
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/') {
      const filePath = join(__dirname, 'views', 'home.html')
      readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end(`Error al leer el archivo ${err}`)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data)
        }
      })
    } else if (url === '/login') {
      const filePath = join(__dirname, 'views', 'login.html')
      readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end(`Error al leer el archivo ${err}`)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data)
        }
      })
    } else if (url === '/register') {
      const filePath = join(__dirname, 'views', 'register.html')
      readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end(`Error al leer el archivo ${err}`)
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data)
        }
      })
    } else {
      // Archivos estáticos
      const filePath = join(__dirname, 'public', url)
      readFile(filePath, (err, data) => {
        if (err) {
          // Si el archivo no existe, responde 404
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('Archivo no encontrado')
        } else {
          res.writeHead(200, { 'Content-Type': getContentType(filePath) })
          res.end(data)
        }
      })
    }
  } else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      res.writeHead(302, { Location: '/' })
      res.end()
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Ruta no encontrada')
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Ruta no encontrada')
  }
})

// Configuración del puerto del servidor
export default server;
const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
})
