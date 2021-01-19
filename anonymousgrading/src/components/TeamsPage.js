import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import CurrentUsrTeamStore from './CurrentUsrTeamStore'
import ProjectStore from './ProjectStore'

class ProjectsPage extends Component{ 
    constructor(props){
        super(props)
        this.state={
            projects: []
        }

        this.projectStore = new ProjectStore()
        this.teamStore = new CurrentUsrTeamStore()
    }

    componentDidMount() {
        this.projectStore.getAll()
        this.projectStore.emitter.addListener('GET_PROJECTS_SUCCESS',() => {
            this.setState({
                projects: this.projectStore.data
            })
            
            //for (var project of this.state.projects) {
            //    console.log(project[0].description)
            //}
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