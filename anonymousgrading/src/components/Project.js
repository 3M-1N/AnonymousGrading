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
                            <img className="icon" src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-github-1.png" alt="git-icon"/>
                            <a href={proj.githubLink} className="proj-git">{proj.githubLink} </a>
                            <br/>
                            <img className="icon" src="https://cdn.iconscout.com/icon/free/png-256/youtube-85-226402.png" alt="git-icon"/>
                            <a href={proj.linkToVid} className="proj-vid">{proj.linkToVid}</a>
                </div> 
            </div>
        )
    }

}

export default Project