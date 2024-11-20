import express from 'express'
import { readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()
const folderPath = __dirname

const importRoutes = () => {
  const files = readdirSync(folderPath)

  files.forEach((file) => {
    if (file.endsWith('.js') && file !== 'index.js') {
      const filePath = join(folderPath, file)
      import(filePath)
        .then((module) => {
          const routePath = `/${file.split('.')[0]}`
          router.use(routePath, module.default)
        })
        .catch((err) => console.error(`Error importing ${file}:`, err))
    }
  })
}

importRoutes()

export default router
