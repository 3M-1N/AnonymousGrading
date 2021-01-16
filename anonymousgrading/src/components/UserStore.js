
import { EventEmitter } from 'fbemitter'
const SERVER = 'http://localhost:8080'

class UserStore {
    constructor(){
        this.data=[]
        this.user=''
        this.pass=''
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

    async getByUsername(userName){
        try{
            const response=await fetch(`${SERVER}/users/${userName}`)
            const userRes= await response.json()
            this.user=userRes.userName
            this.pass=userRes.password
            this.emitter.emit('GET_USER_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_USER_ERROR')
        }
    }


}

export default UserStore