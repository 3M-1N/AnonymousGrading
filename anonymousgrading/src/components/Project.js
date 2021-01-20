import React from 'react'
import './styles/Project.css'

class Project extends React.Component { 
    constructor(props) {
        super(props)

        this.state = { 
            title : '', 
            description : '', 
            gitLink : '', 
            vidLink : ''
        }
    }


    render() { 
        const { proj } = this.props
        return(
            <div className="proj_container">
                <div className= "proj_dets" >
                            <div className="proj_name">{proj.title}</div>
                            <div className="proj-desc">Description : {proj.description} </div>
                            <hr/>
                            <div className="proj-git">git link: {proj.gitLink} </div>
                            <div className="proj-vid">vid link : {proj.vidLink}</div>
                </div> 
            </div>
        )
    }

}

export default Project