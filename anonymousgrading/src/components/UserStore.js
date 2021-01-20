
import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'

class UserStore {
    constructor(){
        this.data=[]
        this.user=''
        this.pass=''
        this.teamId=-1
        this.juryFor=-1
        this.isTeacher=false
        this.emitter = new EventEmitter()
    }

    async getAll() {
        try{
            const response = await fetch(`${SERVER}/users`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch(err){
            window.localStorage.clear()
            window.localStorage.setItem("ERROR: " , err)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }

    async addOne(user){
        try {
            await fetch(`${SERVER}/users`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            })
           // this.getAll()
          } catch (err) {
            console.warn(err)
            //this.emitter.emit('ADD_ONE_ERROR')
        }
    }

    async getByUsername(userName){
        try{
            const response=await fetch(`${SERVER}/users/${userName}`)
            const userRes= await response.json()
            this.user=userRes.userName
            this.pass=userRes.password
            this.juryFor=userRes.juryFor
            this.isTeacher = userRes.isTeacher
            this.emitter.emit('GET_USER_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_USER_ERROR')
        }
    }

    async getUserTeam(userName){
        try{
            const response=await fetch(`${SERVER}/users`)
            const data = await response.json()
            var found = false
            console.log("In userstore")
            for (var user of data) {
                if (user.userName === userName) {
                    this.teamId = user.teamId
                    found = true
                    break
                }
            }
            if (found) this.emitter.emit('GET_USER_TEAM_SUCCESS')
            else this.emitter.emit('GET_USER_TEAM_ERROR')
            
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_USER_TEAM_ERROR')
        }
    }

    async setJuryFor(userId, projId) {
        try{
            window.localStorage.setItem("In Set Jury, projId: ", projId)
            await fetch(`${SERVER}/users/${userId}`, {
                method: 'put',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({'juryFor': projId})
              })
              this.emitter.emit('SET_JURY_FOR_SUCCESS')
        } catch(err){
            console.warn(err)
            window.localStorage.setItem("SET JURY ERROR: ", err)
            this.emitter.emit('SET_JURY_FOR_ERROR')
        }
    }
}

export default UserStore