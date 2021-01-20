import React, {Component} from 'react'
import "./styles/Login.css"
import UserStore from './UserStore'
import { withRouter } from 'react-router-dom'
import HomePage from './HomePage'


class LoginForm extends Component {
    constructor(props){
        super(props)
        this.store = new UserStore()

        this.state={
            username:'',
            password:'',
            isTeacher:false,

        }

        this.handleCheck = evt =>{
            this.setState({isTeacher:evt.target.checked})
        }

        this.handleChange = (evt) => {
            this.setState({
              [evt.target.name]: evt.target.value
            })
          }

        this.register=()=>{
            this.store.addOne({userName:this.state.username,password:this.state.password,
                isTeacher:this.state.isTeacher})
            this.props.history.push(`/home/${this.state.username}`)
        }

        this.login=(event)=>{
            this.store.getByUsername(this.state.username)
            window.sessionStorage.setItem("currentUser", this.state.username)
            // console.log(this.store.user, this.store.pass)
            setTimeout(()=> {if(this.state.username === this.store.user && this.state.password === this.store.pass){
                this.props.history.push(`/home/${this.state.username}`)
            }else{
                alert('wrong credentials')
            }},2000)
           
            event.preventDefault()
        }
      
    }
    render() {
        return (
            <div className="login_page_container">
              <div className="header">
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap" rel="stylesheet"></link>
                Welcome to Anonymous Grading!
              </div>

             <form>
      
                <div className="container">
                    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap" rel="stylesheet"></link>
                    
                    <label class="login_label">Username: </label>
                    <input class="input_field" type="text" placeholder="Enter Username" name="username" required value={this.state.username} onChange={this.handleChange} />
                   
                    <label class="login_label">Password: </label>
                    
                    <input class="input_field" type="password" placeholder="Enter Password" name="password" required value={this.state.password} onChange={this.handleChange} />

                    <div className="buttons_container">
                        <button type="submit" id="btn_login" class="button" onClick={this.login} >Login</button>
                        <button type="submit" id="btn_register" class="button" onClick={this.register}>Register</button>
                    </div>

                    <label class="login_label">Teacher account </label>
                    <input type="checkbox" name="teacher"  defaultChecked={this.state.isTeacher} onChange={this.handleCheck} />
                </div>
            </form>
        </div>
        );
    }


}

export default withRouter(LoginForm)