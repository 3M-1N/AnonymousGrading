import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import MemberStore from './MemberStore'
import ProjectStore from './ProjectStore'
import UserStore from './UserStore'
import Project from './Project'
import './styles/TeamComp.css'


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

        this.projectStore.getAllProjects()
        this.projectStore.emitter.addListener('GET_ALL_PROJECTS_SUCCESS', () => 
        { 
            this.setState({ 
                projects: this.projectStore.data
            })

            console.log(this.state.projects)

        })

    }

    render() { 
        return (
            <>
                <div className="page-title">All Projects:</div>
                <div>
                    {
                    this.state.projects.map(p => <Project proj={p} key={p.id} />)
                    }
                </div> 
            </>
        )

    }

}

export default withRouter(ProjectsPage)