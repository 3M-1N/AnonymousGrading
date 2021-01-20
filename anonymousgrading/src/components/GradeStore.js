import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'

class GradeStore{
    constructor(){
        this.userId=-1
        this.emitter=new EventEmitter()
        this.grade={
            grade:1
        }
        this.exists=false
    }

    async getGrade(usrId, projId){
        try{
            const response = await fetch(`${SERVER}/grades/${projId}/${usrId}`)
            const grade = await response.json()
            if(grade!=null){
            this.grade.grade=grade.grade
            this.grade.userId=grade.userId
            this.grade.projectId=grade.projectId
            this.grade.createdAt=grade.createdAt
            this.grade.id=grade.id
            this.exists=true
            }
            this.emitter.emit("GET_GRADE_SUCCESS")
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_GRADE_ERROR')
        }
    }

    async getByUsername(userName){
        try{
            const response=await fetch(`${SERVER}/users/${userName}`)
            const userRes= await response.json()
            this.userId = userRes.id
            this.emitter.emit('GET_USER_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_USER_ERROR')
        }
    }

    async editGrade(gradeId, grade){
        try {
            await fetch(`${SERVER}/grades/${gradeId}`, {
              method: 'put',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(grade)
            })
           // this.getAll()
          } catch (err) {
            console.warn(err)
            //this.emitter.emit('ADD_ONE_ERROR')
        }
    }

    async addGrade(grade){
        try {
            await fetch(`${SERVER}/grades`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(grade)
            })
           // this.getAll()
          } catch (err) {
            console.warn(err)
            //this.emitter.emit('ADD_ONE_ERROR')
        }
    }
}

export default GradeStore