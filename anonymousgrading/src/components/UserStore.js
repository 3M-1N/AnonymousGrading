import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'

class UserStore {
    constructor(){
        this.data=[]
        this.emitter = new EventEmitter()
    }

    async getAll() {
        try{
            const response = await fetch(`${SERVER}/users`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch(err){
            console.warn(err)
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


}

export default UserStore