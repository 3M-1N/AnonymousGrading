
import React  from  'react'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import MemberComp from './MemberComp'
import ProjectComp from './ProjectComp'
import './styles/TeamComp.css'

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
        
    }

    render(){
        return(  
            (this.state.team.id==null) ?
            <>
            <div className="info">
              <img src="https://www.flaticon.com/svg/vstatic/svg/681/681494.svg?token=exp=1611071722~hmac=3d952880283cb4fa8ae7dc32b19e094a" 
              alt="team_icon" className="team_icon"/>
                <div>You are currently not a member of a team!</div>
                <div>Create a team yourself or wait for invitations from other teams</div>
                <hr></hr>
                <label className="text-label" htmlFor='teamName'>Team Name</label>
                <input className="input-text" type='text' name='teamName' id='teamName' onChange={this.handleChange} value={this.state.team.teamName} />
                <input className="input-btn" type='button' value='Create Team' onClick={this.createTeam} />
            </div>
            </>
            :
            <>
            <div className="info">
                <div> Team id: {this.state.team.id} | Name: {this.state.team.teamName}</div>
                <div><MemberComp userName={this.store.usrName}/></div>
                <div><ProjectComp teamId={this.state.team.id}/></div>
            </div>

            </>
        )
    }
}

export default TeamComp