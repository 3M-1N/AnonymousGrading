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
            console.log(this.state.team)
            this.store.addTeam(this.state.team)
            
        }
    }

    componentDidMount(){
        //console.log(this.props.userName)
        this.store.getUserData(this.props.userName)
        setTimeout(()=>this.store.getTeam(),1000)
        this.store.emitter.addListener('GET_TEAM_SUCCESS',()=>this.setState({
            team:this.store.team
        }))
    }

    render(){
        return(
            (this.state.team.id==null) ?
            // Object.keys(this.state.team).length===0 ?
            <>
            <div>You are currently not a member of a team!</div>
            <div>Create a team yourself or wait for invitations from other teams</div>
            <label htmlFor='teamname'>Team Name</label>
            <input type='text' name='teamname' id='teamname' onChange={this.handleChange} value={this.state.team.teamName} />
            <input type='button' value='Create Team' onClick={this.createTeam} />
            </>
            :
            <>
            
            <div> Team id: {this.state.team.id} | Name: {this.state.team.teamName}</div>
            <div><ProjectComp/></div>
            <div><MemberComp/></div>
            </>
        )
    }
}

export default TeamComp