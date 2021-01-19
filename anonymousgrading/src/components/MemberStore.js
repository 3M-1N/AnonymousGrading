import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'


class MemberStore {
    constructor(){
        this.data=-1
        this.arrayData=[]
        this.emitter = new EventEmitter()
    }

    async getTeamIDfromUsername(userName){
        try {
            const response = await fetch(`${SERVER}/users/${userName}`)
            const data = await response.json()
            this.data = data.teamId
            this.emitter.emit('GET_TEAMID_FROM_USERNAME_SUCCESS')
        } 
        catch (err) {
            console.warn(err)
            this.emitter.emit('GET_TEAMID_FROM_USERNAME_ERROR')
        }
    }

    async getTeamMembers(teamId) {
      try{
          const response = await fetch(`${SERVER}/teams/${teamId}/users`)
          const data = await response.json()
          console.log(data)
          for (var position in data) {
              this.arrayData.push(data[position].userName) 
          }
          this.emitter.emit('GET_MEMBERS_SUCCESS')
      } catch(err){
          console.warn(err)
          this.emitter.emit('GET_MEMBERS_ERROR')
      }
  }
}

export default MemberStore