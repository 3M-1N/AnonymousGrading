import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import "./styles/HomePage.css"

class HomePage extends Component{ 

    render() { 
        return (
            <div>
                <h1 id="userNameText">{this.props.match.params.userName}</h1>
            </div>
        )

    }

}

export default withRouter(HomePage)