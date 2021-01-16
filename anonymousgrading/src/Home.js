import React from 'react'
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom'


class Home extends React.Component {
    // constructor(props){
    //     super(props)
        
        

    // }

    // componentDidMount () {
    //     store.getAll()
    //     store.emitter.addListener('GET_ALL_SUCCESS', () => {
    //       this.setState({
    //         studyGroups: store.data
    //       })
    //     })
    //   }
    render(){
        return(<h1>{this.props.match.params.userName}</h1>)
    }
}

export default withRouter(Home)