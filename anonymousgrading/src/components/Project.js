import React from 'react'
import GradeStore from './GradeStore'
import './styles/Project.css'

class Project extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            grade:{
                grade:1
            },
            userId:-1
        }
        this.store = new GradeStore()
        this.saveGrade=()=>{
            let date = new Date(this.state.grade.createdAt)
            let due = new Date(date)
            due.setDate(due.getDate()+12)
            let today = new Date()
            let diff =Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24))
            if(diff > 5){
                alert('can not edit anymore')
            }else{
            let grade = {
                grade: this.state.grade.grade,
                userId:this.state.userId,
                projectId:this.props.juryFor
            }
            if(this.store.exists !== true){
                this.store.addGrade(grade)

            }else{
                this.store.editGrade(this.store.grade.id, grade)
            }
        }
    }

        this.handleChange=(evt)=> {
            const auxGrade =this.state.grade
            auxGrade[evt.target.name]=evt.target.value
            this.setState({
                grade:auxGrade
              })
        
        }
    }

    componentDidMount(){
        this.store.getByUsername(this.props.userName)
        
        this.store.emitter.addListener('GET_USER_SUCCESS',()=>{
            this.setState({
                userId:this.store.userId
            })
            this.store.getGrade( this.store.userId,this.props.juryFor)
            
        })
        this.store.emitter.addListener('GET_GRADE_SUCCESS',()=>{
            this.setState({
                grade:this.store.grade
            })
            
        })
    }

    render() { 
       
        return(
            (this.props.proj.id != this.props.juryFor) ? 
            <div className="proj_container">
                <div className= "proj_dets" >
                            <div className="proj_name">{this.props.proj.id} {this.props.proj.title}</div>
                            <div className="proj-desc">Description : {this.props.proj.description} </div>
                            <hr/>
                            <img className="icon" src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-github-1.png" alt="git-icon"/>
                            <a href={this.props.proj.githubLink} className="proj-git">{this.props.proj.githubLink} </a>
                            <br/>
                            <img className="icon" src="https://cdn.iconscout.com/icon/free/png-256/youtube-85-226402.png" alt="git-icon"/>
                            <a href={this.props.proj.linkToVid} className="proj-vid">{this.props.proj.linkToVid}</a>
                </div> 
            </div>
            :
            <div className="proj_container">
            <div className= "proj_dets" >
                        <div className="proj_name">{this.props.proj.id} {this.props.proj.title}</div>
                        <div className="proj-desc">Description : {this.props.proj.description} </div>
                        <hr/>
                        <div className="proj-git">git link: {this.props.proj.githubLink} </div>
                        <div className="proj-vid">vid link : {this.props.proj.linkToVid}</div>
                        <hr/>
                        <div>This is the project you have to grade: </div>
                        <div>
                        Your Grade: 
                        <input type='number' name='grade' min='1' max='10' value={this.state.grade.grade} onChange={this.handleChange.bind(this)}/>
                        <input type='button' value='Save' onClick={this.saveGrade}/>
                        </div>
            </div> 
        </div>
        )
    }

}

export default Project