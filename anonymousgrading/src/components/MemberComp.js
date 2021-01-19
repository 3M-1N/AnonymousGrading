import React  from  'react'
import MemberStore from './MemberStore'

class MemberComp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            names: []
        }

        this.teamID = -1
        this.memberNames = []
        this.store = new MemberStore()
    }

    componentDidMount() {
        this.store.getTeamIDfromUsername(this.props.userName)
        this.store.emitter.addListener('GET_TEAMID_FROM_USERNAME_SUCCESS',() => {
            this.teamID = this.store.data
            this.store.getTeamMembers(this.teamID)
        })
        this.store.emitter.addListener('GET_MEMBERS_SUCCESS',() => {
            this.setState({
                names: this.store.arrayData
            })
            console.log(this.store.arrayData)
            this.memberNames = this.state.names.map((name) => <li key={name}>{name}</li>)
            this.setState({})
        })
    }

    render(){
        return(
            <>
            <div>Members:</div>
            <ul>{this.memberNames}</ul>
            </>
        )
    }
}

export default MemberComp