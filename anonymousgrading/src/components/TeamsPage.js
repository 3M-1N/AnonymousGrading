import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import MemberStore from './MemberStore'
import ProjectStore from './ProjectStore'
import UserStore from './UserStore'

class ProjectsPage extends Component{ 
    constructor(props){
        super(props)
        this.state={
            projects: [],
            members: []
        }

        this.projectStore = new ProjectStore()
        this.memberStore = new MemberStore()
        this.userStore = new UserStore()
        this.projectsElements = []
        this.membersElements = []
    }

    componentDidMount() {
        this.userStore.getUserTeam(window.sessionStorage.getItem("currentUser"))
        
        this.userStore.emitter.addListener('GET_USER_TEAM_SUCCESS', () => {
            this.projectStore.getProjectsForTeam(this.userStore.teamId)
        })

        this.projectStore.emitter.addListener('GET_TEAM_PROJECTS_SUCCESS',() => {
            this.setState({
                projects: this.projectStore.projects
            })

            this.memberStore.getTeamMembers(this.state.projects[0].teamId)
        })

        this.memberStore.emitter.addListener('GET_MEMBERS_SUCCESS',() => {
            this.state.members.push(this.memberStore.arrayData)
            console.log("Project" + this.state.projects[0])
            console.log("Members" + this.state.members[0])
            this.setState({})
        })
    }

    render() { 
        return (
            <>
            <div>All Projects:</div>
            </>
        )

    }

}

export default withRouter(ProjectsPage)