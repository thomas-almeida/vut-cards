import api from "./routes"

import express from "express"
import cors from "cors"

const app = express()
const port = 3005

app.use(express.json())
app.use(cors())
app.use(api)

app.listen(port, () => {
    console.log(`VUT CARDS online on ${port}`)
} )