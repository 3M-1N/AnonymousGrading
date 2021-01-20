import React from 'react'
import GradesForTeacher from './GradesForTeacher'



class ProjectTeacher extends React.Component{
    constructor(props){
        super(props) 
        this.state={
            grades:[],
            temName:''
        }       
        this.store=new GradesForTeacher()
    }

    componentDidMount(){
        let auxGrades=[]
        this.store.getTeamById(this.props.proj.teamId)
        this.store.emitter.addListener('GET_TEAM_SUCCESS',()=>{
            this.setState({
                temName:this.store.teamName
            })
        })
        this.store.getGrades(this.props.proj.id)
        this.store.emitter.addListener('GET_GRADES_SUCCESS',()=>{
             auxGrades=this.store.grades
            
            this.setState({
                grades:auxGrades
            })
        })
        
    }

    render(){
        return(
            <div className="proj_container">
                <div className= "proj_dets" >
                            <div className="proj_name">{this.props.proj.id} {this.props.proj.title}</div>
                            <div className="proj-desc">Description : {this.props.proj.description} </div>
                            <hr/>
                            <div className="proj-desc">Team Name : {this.state.temName} </div>
                            <hr/>
                            <div className="proj-git">git link: {this.props.proj.githubLink} </div>
                            <div className="proj-vid">vid link : {this.props.proj.linkToVid}</div>
                            <hr/>
                            <div>Grades:</div>
                            <div>{this.state.grades.map(grade => <div key={grade.id} >{grade.grade}</div>)}</div>
                </div> 
            </div>
        )
    }
}

export default ProjectTeacher