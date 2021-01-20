import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'


class GradesForTeacher {
    constructor(){
        this.teamName=''
        this.grades=[]
        this.emitter = new EventEmitter()
    }

    async getTeamById(teamId){
        try{
          const response=await fetch(`${SERVER}/teamsi/${teamId}`)
          const teamRes= await response.json()
          this.teamName=teamRes.teamName
          this.emitter.emit('GET_TEAM_SUCCESS')
      }catch(err){
          console.warn(err)
          this.emitter.emit('GET_TEAM_ERROR')
      }
    }

    async getGrades(projId){
        try{
            const response=await fetch(`${SERVER}/gradesP/${projId}`)
            const grades= await response.json()
            console.log(grades)
            if(grades!=null){
            
                this.grades=grades
                console.log(this.grades)
                this.emitter.emit('GET_GRADES_SUCCESS')
            }else{
                this.emitter.emit('GET_GRADES_ERROR')
            }
           
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_TEAM_ERROR')
        }
    }
}

export default GradesForTeacher