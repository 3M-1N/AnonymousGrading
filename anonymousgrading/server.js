const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')
const sequelize = new Sequelize('AnonymousGrading', 'root', 'root', {
  dialect: 'mysql',
  host: "localhost"
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

sequelize.authenticate().then(() => {
  console.log("Connected to database")
}).catch((err) => {
  console.log(err)
  console.log("Unable to connect to database")
})


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

const Project=sequelize.define('projects',{
  title:{
    type: Sequelize.STRING,
    allowNull: false,
    validate:{
      len:[3,30]
    }
  },
  githubLink:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      len:[5,150]
    }
  },
  description:{
    type:Sequelize.TEXT,
    validate:{
      len:[5,150]
    }
  }, 
  link_towards_video : { 
    type : Sequelize.STRING, 
    allowNull:true
  },
  team_id : { 
    type:Sequelize.STRING,
    allowNull:false
  },
  final_grade: { 
    type : Sequelize.STRING,
    allowNull:true
  }
})


app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).send('Tables successfully created')
  } catch (err) {
    next(err)
  }
})

app.get('/users', async(req,res, next)=>{
  try{
    const users=await User.findAll()
    res.status(200).json(users)
  } catch(err){
    next(err)
  }
})

app.get('/users/:usr_id', async(req,res,next)=>{
  try{
    const user= await User.findByPk(req.params.usr_id)
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
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

app.put('/users/:usr_id', async(req,res,next)=>{
  try{
  const user= await User.findByPk(req.params.usr_id)
    if(user){
      await user.update(req.body)
      res.status(202).json({ message: 'accepted' })
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.delete('/users/:usr_id', async(req, res, next)=>{
  try{
    const user= await User.findByPk(req.params.usr_id)
      if(user){
        await user.destroy()
        res.status(202).json({ message: 'accepted' })
      }else{
        res.status(404).json({message:'not found'})
      }
    }catch(err){
      next(err)
    }
})


// projects 

app.get('/projects', async(req,res, next)=>{
  try{
    const projects =await Project.findAll()
    res.status(200).json(projects)
  } catch(err){
    next(err)
  }
})

app.post('/projects', async(req , res, next)=>{
  try{
    await Project.create(req.body)
    res.status(200).json({message:'added'})
  }catch(err){
    next(err)
  }
})


app.get('/projects/:proj_id', async(req,res,next)=>{
  try{
    const project= await Project.findByPk(req.params.proj_id)
    if(project){
      res.status(200).json(project)
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})


app.put('/projects/:proj_id', (request, response) => {
   Project.findByPk(request.params.proj_id).then((proj) => {
      if(proj) {
        proj.update(request.body).then((result) => {
              response.status(201).json({message:"Project successfully updated!"})
          }).catch((err) => {
              console.log(err)
              response.status(500).send('database error')
          })
      } else {
          response.status(404).send('resource not found')
      }
  }).catch((err) => {
      console.log(err)
      response.status(500).send('database error')
  })
})


app.delete('/projects/:proj_id', (request, response) => {
  Project.findByPk(request.params.proj_id).then((proj) => {
      if(proj) {
        proj.destroy().then((result) => {
              response.status(204).send('project successfully deleted')
          }).catch((err) => {
              console.log(err)
              response.status(500).send('database error')
          })
      } else {
          response.status(404).send('resource not found')
      }
  }).catch((err) => {
      console.log(err)
      response.status(500).send('database error')
  })
})


app.listen(8080)