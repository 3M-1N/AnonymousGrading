import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import MemberStore from './MemberStore'
import ProjectStore from './ProjectStore'

class ProjectsPage extends Component{ 
    constructor(props){
        super(props)
        this.state={
            projects: [],
            members: []
        }

        this.projectStore = new ProjectStore()
        this.memberStore = new MemberStore()
    }

    componentDidMount() {
        this.projectStore.getAllProjects()
        this.projectStore.emitter.addListener('GET_ALL_PROJECTS_SUCCESS',() => {
            this.setState({
                projects: this.projectStore.projects
            })
            for (var proj of this.state.projects) {
                console.log("Getting teammates for: " + proj.teamId)
                this.memberStore.getTeamMembers(proj.teamId)
            }
        })

        this.memberStore.emitter.addListener('GET_MEMBERS_SUCCESS',() => {
            this.state.members.push(this.memberStore.data)
            console.log("Recieved Members! Check to see if they are correct")
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