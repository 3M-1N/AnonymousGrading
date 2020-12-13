const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')
const sequelize = new Sequelize('AnonymousGrading', 'root', 'root', {
  dialect: 'mysql'
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

const User=sequelize.define('user',{
  userName:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      len:[3,30]
    }
  },
  password:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len:[5,150]
    }
  },
  isTeacher:{
    type:Sequelize.BOOLEAN,
    allowNull:false
  }
})

const users=[]

app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.post('/users', async(req , res, next)=>{
  try{
    await User.create(req.body)
    res.status(200).json({message:'created'})
  }catch(err){
    next(err)
  }
})

app.listen(8080)
