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


}


export default ProjectStore