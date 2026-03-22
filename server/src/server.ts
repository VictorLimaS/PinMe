import express from "express"
import cors from "cors"
import locationRoutes from "./routes/location.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_, res) => {
  res.send("PINME rodando 🚀")
})

app.use("/", locationRoutes)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`)
})