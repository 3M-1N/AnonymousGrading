import { EventEmitter } from 'fbemitter'
import React from 'react'
const SERVER = 'http://localhost:8080'


class CurrentUsrTeamStore extends React.Component{
    constructor(usrName){
        super(usrName)
        this.loggedUser={}
        this.usrName=usrName
        this.team={}
        this.emitter = new EventEmitter()
    }

    async getUserData(usrName){
        try{
            const response=await fetch(`${SERVER}/users/${usrName}`)
            const userRes= await response.json()
            this.loggedUser=userRes
            this.emitter.emit('GET_USER_SUCCESS')
        }catch(err){
            console.warn(err)
            this.emitter.emit('GET_USER_ERROR')
        }
    }

    async getTeam(){
        try{
            const response=await fetch(`${SERVER}/teamsi/${this.loggedUser.teamId}`)
            const team = await response.json()
            if (!team.toString().includes('not found'))
            {
              Object.assign(this.team,team)
              this.emitter.emit('GET_TEAM_SUCCESS')
            } 
            else this.emitter.emit('GET_TEAM_ERROR')
            } catch(err){
            console.warn(err)
            this.emitter.emit('GET_TEAM_ERROR')
        }
    }

    async getTeamByName(teamName){
      try{
        const response=await fetch(`${SERVER}/teams/${teamName}`)
        const teamRes= await response.json()
        this.team={}
        Object.assign(this.team,teamRes)
        this.emitter.emit('GET_TEAM_SUCCESS')
    }catch(err){
        console.warn(err)
        this.emitter.emit('GET_TEAM_ERROR')
    }
    }

    async editUser(){
        try {
            await fetch(`${SERVER}/users/${this.loggedUser.id}`, {
              method: 'put',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.loggedUser)
              
            })
            this.emitter.emit("UPDATE_USER_SUCCESS")
          } catch (err) {
            console.warn(err)
            this.emitter.emit('SAVE_ONE_ERROR')
          }
        }
    
    async addTeam(team){
        try {
            await fetch(`${SERVER}/teams`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(team)
            })
            this.emitter.emit("ADD_TEAM_SUCCESS")
            //this.getAll()
          } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_ONE_ERROR')
          }
    }
}

export default CurrentUsrTeamStore
