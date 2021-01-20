import React  from  'react'
import AddProjectForm from './AddProjectForm'
import Project from './Project'
import ProjectStore from './ProjectStore'

class ProjectComp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            names: []
        }

        this.listNames = []
        this.store = new ProjectStore()
    }

    componentDidMount() {
        console.log(this.props.teamId)
        this.store.getProjectsForTeam(this.props.teamId);
        this.store.emitter.addListener('GET_TEAM_PROJECTS_SUCCESS',() => {
            this.setState({
                names: this.store.projects
            })
            this.listNames = this.state.names.map(p => <Project proj={p} key={p.id}></Project>)

            // this.listNames = this.state.names.map((name) => <li key={name.id}>Title: {name.title} | Description:{name.description}
            // <br></br> Link: {name.githubLink} <br></br> Video: {name.linkToVid}</li>)
            console.log(this.state.names)
            console.log(this.listNames)
            this.setState({})
        })
    }

    render(){
        return(
            // (this.listNames != null) ?
            (Object.keys(this.listNames).length!==0)?
            <>
            <div>Projects:</div>
            <ul>{
                this.listNames
                }
            </ul>

            <AddProjectForm teamId={this.props.teamId} />
            </>
            :
            <>
            <div>
                Your team has not uploaded any projects yet

            </div>
            <div>
                <AddProjectForm teamId={this.props.teamId} />
            </div>
            </>
        )
    }
}

export default ProjectComp