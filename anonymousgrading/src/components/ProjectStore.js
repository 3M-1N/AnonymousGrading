import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'


class ProjectStore {
    constructor(){
        this.data=[]
        this.emitter = new EventEmitter()
    }

    async addProj(proj){
        try {
            await fetch(`${SERVER}/projects`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(proj)
            })
          } catch (err) {
        console.warn(err)
        }
    }

    async getAll() {
      try{
          const response = await fetch(`${SERVER}/projects`)
          const data = await response.json()
          for (var position in data) {
            this.data.push(data[position].title)
          }
          this.emitter.emit('GET_PROJECTS_SUCCESS')
      } catch(err){
          console.warn(err)
          this.emitter.emit('GET_PROJECTS_ERROR')
      }
  }
}

export default ProjectStore