const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')
const sequelize = new Sequelize('users', 'root', 'bagaparola', {
  dialect: 'mysql'
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

