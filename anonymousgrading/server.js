const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')
const sequelize = new Sequelize('anonymousgrading', 'root', 'root', {
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
  },
  juryFor:{
    type:Sequelize.INTEGER,
    allowNull: true
  }
})

const Team = sequelize.define('team',{
  teamName:{
    type: Sequelize.STRING,
    allowNull: false
}
})

const Grade = sequelize.define('grade',{
  grade:{
    type:Sequelize.INTEGER,
    validate:{
      [Op.between]:[1,10]
    }
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
  linkToVid : { 
    type : Sequelize.STRING, 
    allowNull:true
  },
  // teamId : { 
  //   type:Sequelize.INTEGER,
  //   allowNull:true
  // }
})

Team.hasMany(User)
User.hasMany(Grade)
Team.hasMany(Project)
Project.hasMany(Grade)

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

// app.delete('/users/:usr_id', async(req, res, next)=>{
//   try{
//     const user= await User.findByPk(req.params.usr_id)
//       if(user){
//         await user.destroy()
//         res.status(202).json({ message: 'accepted' })
//       }else{
//         res.status(404).json({message:'not found'})
//       }
//     }catch(err){
//       next(err)
//     }
// })

app.get('/users/:userName', async(req,res,next)=>{
  try { 
    const user = await User.findOne({ 
      where:
      { userName : req.params.userName}
    })

    if(user !== null){
        res.status(202).json(user)
    }else{
        res.status(404).json({message: 'not found'})
    }
  }
  catch(err){
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


app.put('/projects/:proj_id', async(request, response) => {
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


app.delete('/projects/:proj_id', async(request, response) => {
  Project.findByPk(request.params.proj_id).then((proj) => {
      if(proj) {
        proj.destroy().then((response) => {
              response.status(201).json({message:'project successfully deleted'})
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

//teams
app.get('/teams', async(req,res, next)=>{
  try{
    const teams =await Team.findAll()
    res.status(200).json(teams)
  } catch(err){
    next(err)
  }
})

app.post('/teams', async(req , res, next)=>{
  try{
    await Team.create(req.body)
    res.status(200).json({message:'added'})
  }catch(err){
    next(err)
  }
})


app.get('/teams/:teamId', async(req,res,next)=>{
  try{

    const team= await Team.findByPk(req.params.teamId)
    
    if(team){
      res.status(200).json(team)
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.get('/teams/:teamId/users', async(req,res,next)=>{
  try{
    const team= await Team.findByPk(req.params.teamId)
    
    if(team){
      const users = await User.findAll({where:{teamId:req.params.teamId}})
      res.status(200).json(users)
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.get('/teams/:teamId/users/:usrId', async(req,res,next)=>{
  try{
    const team= await Team.findByPk(req.params.teamId)
    
    if(team){ 
      const users = await User.findAll({where:{id: req.params.usrId,teamId:req.params.teamId}})
      const user=users.shift()
      if(user){
        res.status(200).json(user)
      }else{
        res.status(404).json({message:'not found'})
      }
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.delete('/teams/:teamId/users/:usrId', async(req,res,next)=>{
  try{
    const team= await Team.findByPk(req.params.teamId)
    
    if(team){ 
      const users = await User.findAll({where:{id: req.params.usrId,teamId:req.params.teamId}})
      const user=users.shift()
      if(user){
        user.teamId = null 
        await user.save()
        res.status(201).json({message:'accepted'})
      }else{
        res.status(404).json({message:'not found'})
      }
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})


app.put('/teams/:teamId', async(req, res, next)=>{
  try{
  const team = await Team.findByPk(req.params.teamId)
  if(team){
      team.update(req.body)
      res.status(200).json({message:'accepted'})
    }
    else{
      res.status(400).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})


app.delete('/teams/:teamId', async(request, response) => {
  try{
   const team = await Team.findByPk(request.params.teamId)
      if(team) {
        const _users =await User.findAll({where:{teamId:request.params.teamId}})
        _users.forEach(user=>user.teamId=null)
        team.destroy()
        response.status(204).json({message:'deleted'})  
     }else {
          response.status(404).send('resource not found')
      }
  }catch(err) {
      console.log(err)
      response.status(500).send('database error')
  }
})

app.get('/teams/:teamId/projects', async(req,res,next)=>{
  try{
    const team= await Team.findByPk(req.params.teamId)
    
    if(team){
      const projects = await Project.findAll({where:{teamId:req.params.teamId}})
      res.status(200).json(projects)
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.post('/teams/:teamId/projects', async(req,res,next)=>{
  try{
    const team= await Team.findByPk(req.params.teamId)
    if(team){
      const project = new Project(req.body)
      project.teamId=req.params.teamId
      await project.save()
      res.status(200).json({message:'added'})
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.get('/teams/:teamid/projects/:projectid', async(req, res, next)=>{
  try{
    const team = Team.findByPk(req.params.teamid)
    if(team){
      const proj = await Project.findAll({where:{id: req.params.projectid,teamId:req.params.teamid}})
      const project=proj.shift()
      if(project){
      res.status(201).json(project)
    }else{
      res.status(404).json({message:'not found'})
    }
  }else{
    res.status(404).json({message:'not found'})
  }
  }catch(err){
    next(err)
  }
})

app.delete('/teams/:teamId/projects/:projectid', async(req,res,next)=>{
  try{
    const team= await Team.findByPk(req.params.teamId)
    
    if(team){ 
      const proj = await Project.findAll({where:{id: req.params.projectid,teamId:req.params.teamId}})
      const project=proj.shift()
      if(project){ 
        await project.destroy()
        res.status(201).json({message:'accepted'})
      }else{
        res.status(404).json({message:'not found'})
      }
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})

app.put('/teams/:teamId/projects/:projectid', async(req,res, next)=>{
  try{
    const team =await Team.findByPk(req.params.teamId)
    if(team){
      const projects= await Project.findAll({where:{id:req.params.projectid, teamId:req.params.teamId}})
      const project = projects.shift()
      if(project){
        await project.update(req.body)
        res.status(200).json({message:'accepted'})
      }else{
        res.status(404).json({message:'not found'})
      }
    }else{
      res.status(404).json({message:'not found'})
    }
  }catch(err){
    next(err)
  }
})


//grades
app.get('/teams/:teamid/projects/:projectid/grades', async(req, res, next)=>{
  try{
    const team =await Team.findByPk(req.params.teamid)
    if(team){
    const project = Project.findByPk(req.params.projectId)
    if(project){
      const grades = await Grade.findAll({where:{projectId: req.params.projectid}})
      if(grades){
      res.status(201).json(grades)
    }else{
      res.status(404).json({message:'no grades'})
    }
  }else{
    res.status(404).json({message:'not found'})
  }
}else{
  res.status(404).json({message:'not found'})
}
  }catch(err){
    next(err)
  }
})

app.post('/teams/:teamid/projects/:projectid/grades', async(req, res, next)=>{
  try{
    const team =await Team.findByPk(req.params.teamid)
    if(team){
    const project = Project.findByPk(req.params.projectid)
    if(project){
      const grade = new Grade(req.body)
      grade.projectId=req.params.projectid
      await grade.save()
      res.status(201).json({message:'added'})
    }else{
      res.status(404).json({message:'no grades'})
    }
  }else{
    res.status(404).json({message:'not found'})
  }
}catch(err){
    next(err)
  }
})

app.put('/teams/:teamid/projects/:projectid/grades/:gid', async(req, res, next)=>{
  try{
    const team =await Team.findByPk(req.params.teamid)
    if(team){
    const project = await Project.findByPk(req.params.projectid)
    if(project){
      const grades =await Grade.findAll({where:{id:req.params.gid,projectId:req.params.projectid}})
      const grade= grades.shift()
      if(grade){
      await grade.update(req.body)
        res.status(201).json({message:'accepted'})
      }else{
        res.status(404).json({message:'not found'})
      }
      
    }else{
      res.status(404).json({message:'not found'})
    }
  }else{
    res.status(404).json({message:'not found'})
  }
}catch(err){
    next(err)
  }
})


app.listen(8080)
