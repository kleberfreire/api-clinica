const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5000

const routes = require('./src/routes')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(routes)




app.listen(port, () => console.log('funcionando ma porta' , port))
