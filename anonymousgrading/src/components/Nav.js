import React from 'react'
import './styles/Nav.css'
import {Link} from 'react-router-dom'


class Nav extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const navStyle={
            color: `white`
        }
        return(
            <nav>
                <h3>Anonymous Grading : {this.props.userName}</h3>
                <ul className="navItems">
                    
                    <Link to={`/projects/${this.props.userName}/${this.props.juryFor}`} style={navStyle}><li>See all projects</li></Link>
                </ul>
            </nav>
        )
    }
}

export default Nav