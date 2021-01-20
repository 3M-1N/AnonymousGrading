import { EventEmitter } from 'fbemitter'
import UserStore from './UserStore'
const SERVER = 'http://localhost:8080'


class ProjectStore {
    constructor(){
        this.data=[]
        this.projects=[]
        this.projId=-1
        this.emitter = new EventEmitter()
        this.userStore = new UserStore()
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
            // Assign People to grade the project
            // Step 1: Get the User Store
            // Step 2: Get all users
            window.localStorage.clear()
            this.userStore.getAll()
            this.userStore.emitter.addListener('GET_ALL_SUCCESS', () => {
                // Users recieved
                var randNumbers=[]
                if (this.userStore.data.length > 4) {
                  // Generate random numbers
                  var min = 0; var max = this.userStore.data.length;
                  for (var i=0; i<4; i++) {
                    var newNumber = 1;
                    do {
                       newNumber = Math.floor(Math.random() * (max - min) ) + min;
                    }
                    while (randNumbers.includes(newNumber))
                    randNumbers.push(newNumber)
                  }
                }
                else {
                  for (var i=0; i<this.userStore.data.length; i++) {
                    randNumbers.push(i)
                  }
                }
                // Get Project ID
                window.localStorage.setItem("proj name", proj.title)
                this.getIdFromTitle(proj.title)
                var projectId = -1;
                window.localStorage.setItem("proj name 2", proj.title)
                this.emitter.addListener('GET_PROJECT_ID_SUCCESS', () => {
                    projectId = this.projId
                    window.localStorage.setItem("HERE PROJ NR", randNumbers)
                    for (var randNr of randNumbers) {
                      this.userStore.setJuryFor(this.userStore.data[randNr].id, projectId)
                    }
                })
                // Assign users juryfor
                window.localStorage.setItem("GOT HERE!!! Random numbers:", randNumbers)
                
            })
            this.userStore.emitter.addListener('GET_ALL_ERROR', () => {
                //window.localStorage.clear()
                window.localStorage.setItem("ERROR!!!", 2)
            })
            this.userStore.emitter.addListener('SET_JURY_FOR_ERROR', () => {
              //window.localStorage.clear()
              window.localStorage.setItem("SET JURY FOR ERROR!!!", 1)
          })
            this.emitter.emit('ADDED_PROJ_SUCCESS')
          } catch (err) {
            console.warn(err)
            window.localStorage.setItem("ERROR: " + err)
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

    async getIdFromTitle(projTitle) {
      try{
          const response = await fetch(`${SERVER}/projects`)
          const data = await response.json()
          var found = false
          for (var position in data) {
            if (data[position].title == projTitle) {
                this.projId = data[position].id
                found = true
            }
          }
          if (found) {
            this.emitter.emit('GET_PROJECT_ID_SUCCESS')
          } else this.emitter.emit('GET_PROJECT_ID_ERROR')
      } catch(err){
          console.warn(err)
          this.emitter.emit('GET_PROJECT_ID_ERROR')
      }
    }

    // async getAllProjects() {
    //   try{
    //     const response = await fetch(`${SERVER}/projects`)
    //     const data = await response.json()
    //     for (var pos in data) {
    //       this.projects.push(data[pos])
    //     }
    //     this.emitter.emit('GET_ALL_PROJECTS_SUCCESS')
    //   } catch(err){
    //     console.warn(err)
    //     this.emitter.emit('GET_ALL_PROJECTS_ERROR')
    //   }
    // }

    async getProjectsForTeam(teamId) {
      try{
        const response = await fetch(`${SERVER}/teams/${teamId}/projects`)
        const data = await response.json()
        this.projects = data
        this.emitter.emit('GET_TEAM_PROJECTS_SUCCESS')
      } catch(err){
        console.warn(err)
        this.emitter.emit('GET_TEAM_PROJECTS_ERROR')
      }
    }
}

export default ProjectStore