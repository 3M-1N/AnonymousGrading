import React, {Component} from 'react'
import "./styles/Login.css"
import UserStore from './UserStore'
import { withRouter } from 'react-router-dom'
import HomePage from './HomePage'

class LoginForm extends Component {
    constructor(){
        super()
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
        }
      
    }
    render() {
        return (<form>
            <div className="container">
                <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@500&display=swap" rel="stylesheet"></link>
                <label>Username : </label>
                <input type="text" placeholder="Enter Username" name="username" required value={this.state.username} onChange={this.handleChange} />
                <label>Password : </label>
                <input type="password" placeholder="Enter Password" name="password" required value={this.state.password} onChange={this.handleChange} />

                <div className="buttons_container">
                    <button type="submit" id="btn_login" class="button" onClick={<HomePage />}>Login</button>
                    <button type="submit" id="btn_register" class="button" onClick={this.register}  >Register</button>
                </div>

                <label>Teacher account </label>
                <input type="checkbox" name="teacher"  defaultChecked={this.state.isTeacher} onChange={this.handleCheck} />
            </div>
        </form>);
    }


}

export default withRouter(LoginForm)