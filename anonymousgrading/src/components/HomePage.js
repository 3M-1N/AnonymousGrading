import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'
import TeamComp from './TeamComp'
import UserStore from './UserStore'


class HomePage extends Component{ 
    constructor(props){
        super(props)
        this.state={
            juryFor:'',
            isTeacher:false
        }
        this.store = new UserStore(this.props.match.params.userName)
    }

    componentDidMount(){
        this.store.getByUsername(this.props.match.params.userName)
        this.store.emitter.addListener('GET_USER_SUCCESS', ()=>{
            this.setState({
                juryFor:this.store.juryFor,
                isTeacher:this.store.isTeacher
            })
        })
        
    }

    render() { 
        return (
            (this.state.isTeacher === false)?
            
            (this.state.juryFor ===-1)?
            <>
            <div><Nav userName={this.props.match.params.userName}/></div>
            <p>You have not been elected to grade a project yet</p>
            <div><TeamComp userName={this.props.match.params.userName} /></div>

            </>
            :
            <>
            <div><Nav userName={this.props.match.params.userName} juryFor={this.state.juryFor}/></div>
            <p>You are a member of the jury for project with id: {this.state.juryFor}</p>
            <div><TeamComp userName={this.props.match.params.userName} /></div>
            </>
            
            :
            <>
            <div><Nav userName={this.props.match.params.userName} juryFor={this.state.juryFor}/></div>
            <h1>Hello teacher!</h1>
            <h3>Click on "See all Projects to see students' progress</h3>
            </>
        )

    }

}

export default withRouter(HomePage)