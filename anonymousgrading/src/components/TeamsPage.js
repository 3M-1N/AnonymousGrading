import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import MemberStore from './MemberStore'
import ProjectStore from './ProjectStore'
import UserStore from './UserStore'
import Project from './Project'
import ProjectTeacher from './ProjectTeacher'

class ProjectsPage extends Component{ 
    constructor(props){
        super(props)
        this.state={
            projects: [],
            members: [], 
        }
        
        this.projectStore = new ProjectStore()
        this.memberStore = new MemberStore()
        this.userStore = new UserStore()
        this.projectsElements = []
        this.membersElements = []
    }

    componentDidMount() {
        this.userStore.getByUsername(this.props.match.params.userName)
        // this.userStore.emitter.addListener('GET_USER_SUCCESS', ()=>console.log(this.userStore.isTeacher))
        this.projectStore.getAllProjects()
        this.projectStore.emitter.addListener('GET_ALL_PROJECTS_SUCCESS', () => 
        { 
            this.setState({ 
                projects: this.projectStore.data
            })
        })

    }

    render() { 
        return (
            (this.userStore.isTeacher !== true) ? 
            <>
                <div>All Projects:</div>
                <div>
                    {
                    this.state.projects.map(p => <Project proj={p} key={p.id} juryFor = {this.props.match.params.juryFor} userName = {this.props.match.params.userName}/>)
                    }
                </div> 
            </>
            :
            <>
                <div>All Projects:</div>
                <div>
                    {
                    this.state.projects.map(p => <ProjectTeacher proj={p} key={p.id} userName = {this.props.match.params.userName}/>)
                    }
                </div> 
            </>
        )

    }

}

export default withRouter(ProjectsPage)