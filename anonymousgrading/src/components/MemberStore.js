import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'


class MemberStore {
    constructor(){
        this.data=[]
        this.emitter = new EventEmitter()
    }

    async getAll() {
      try{
          const response = await fetch(`${SERVER}/projects`)
          const data = await response.json()
          for (var position in data) {
              this.data.push(data[position].title) 
          }
          this.emitter.emit('GET_MEMBERS_SUCCESS')
      } catch(err){
          console.warn(err)
          this.emitter.emit('GET_MEMBERS_ERROR')
      }
  }
}

export default MemberStore