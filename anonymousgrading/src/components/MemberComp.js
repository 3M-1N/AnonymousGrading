import React  from  'react'
import MemberStore from './MemberStore'

class MemberComp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            names: []
        }

        this.memberNames = []
        this.store = new MemberStore()
    }

    componentDidMount() {
        this.store.getAll();
        this.store.emitter.addListener('GET_MEMBERS_SUCCESS',() => {
            this.setState({
                names: this.store.data
            })
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