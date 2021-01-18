import React  from  'react'
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
        this.store.getAll();
        this.store.emitter.addListener('GET_PROJECTS_SUCCESS',() => {
            this.setState({
                names: this.store.data
            })
            this.listNames = this.state.names.map((name) => <li key={name}>{name}</li>)
            this.setState({})
        })
    }

    render(){
        return(
            <>
            <div>Projects:</div>
            <ul>{this.listNames}</ul>
            </>
        )
    }
}

export default ProjectComp