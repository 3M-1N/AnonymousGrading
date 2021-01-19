import { Button } from 'primereact/button'
import React  from  'react'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import MemberComp from './MemberComp'
import ProjectComp from './ProjectComp'
import ProjectStore from './ProjectStore'

class TeamComp extends React.Component{
    constructor(props){
        super(props)

        this.state={
            team:{
               teamName:''
            }
        }

        this.store = new CurrentUsrTeamStore(this.props.userName)

        this.handleChange = (evt) => {
            const team = this.state.team
            team[evt.target.name] = evt.target.value
            this.setState({
              team: team
            })
          }

        this.createTeam =() =>{
            let addedTeam={
                teamName: this.state.team.teamName
            }
            console.log(addedTeam)
            this.store.addTeam(addedTeam)
            this.store.emitter.addListener('ADD_TEAM_SUCCESS',()=>this.store.getTeamByName(addedTeam.teamName))
            // this.store.getTeamByName(addedTeam.teamName)
            this.store.emitter.addListener('GET_TEAM_SUCCESS',()=>{
         
                this.store.loggedUser.teamId=this.store.team.id
                console.log( this.store.loggedUser.teamId)
                this.store.editUser(this.store.loggedUser)
            })
            this.store.emitter.addListener('UPDATE_USER_SUCCESS',()=>{
                this.setState({
                    team:this.store.team
                })
            })
        }
    }

    componentDidMount(){
        this.store.getUserData(this.props.userName)
        setTimeout(()=>this.store.getTeam(),1000)
        this.store.emitter.addListener('GET_TEAM_SUCCESS',()=>this.setState({
            team:this.store.team
        }))
        console.log(this.store.loggedUser)
        
    }

    render(){
        return(
            (this.state.team.id==null) ?
            <>
            <div>You are currently not a member of a team!</div>
            <div>Create a team yourself or wait for invitations from other teams</div>
            <label htmlFor='teamname'>Team Name</label>
            <input type='text' name='teamName' id='teamName' onChange={this.handleChange} value={this.state.team.teamName} />
            <input type='button' value='Create Team' onClick={this.createTeam} />
            </>
            :
            <>
            <div> Team id: {this.state.team.id} | Name: {this.state.team.teamName}</div>
            <div><ProjectComp/></div>
            <div><MemberComp userName={this.store.usrName}/></div>
            </>
        )
    }
}

export default TeamComp