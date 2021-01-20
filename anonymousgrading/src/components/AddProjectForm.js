import React from 'react'
import "./styles/ProjAddForm.css"
import { withRouter } from 'react-router-dom'
import { Button } from 'primereact/button'
import ProjectStore from './ProjectStore'


class AddProjectForm extends React.Component { 

    constructor(props) { 
        super(props) 
        this.store = new ProjectStore()

        this.state = { 
            title : '', 
            description : '', 
            gitlink : '', 
            vidlink : '',  
            // teamId: this.props.teamId
        }

        this.handleChange = (e) => { 
            this.setState({
                [e.target.name]: e.target.value
              })
        }

        this.addProject = () => { 
            this.store.addProj({ 
                title : this.state.title, 
                githubLink  :this.state.gitlink, 
                description : this.state.description, 
                linkToVid : this.state.vidlink,
                teamId : this.props.teamId
            })
        }
    }


    render() { 
        return(
        <div className='add-project-form'> 

        <form className="add-proj-form"> 
            <h2>Add a new project to this team </h2>
            <div className="form_field">
                <label htmlFor="projName">Project Title</label>
                <input id="projName" name="title"  value={this.state.title} onChange={this.handleChange}  />
            </div>
            
            <div className="form_field">
                <label htmlFor="description">Description</label>
                <textarea  id="description"  name="description"  value={this.state.description} onChange={this.handleChange} />
            </div>

            <div className="form_field">
                <label htmlFor="link">Github link</label>
                <input id="link" name="gitlink"  value={this.state.gitlink} onChange={this.handleChange} />
            </div>

            <div className="form_field">
                <label htmlFor="video">Video link</label>
                <input id="video" name="vidlink"  value={this.state.vidlink} onChange={this.handleChange} />
            </div>

            <div className='add_btn'>
                <Button onClick={this.addProject}> Add Project  </Button>
            </div>

        </form>
        </div>
        )
    }
}

export default withRouter(AddProjectForm)