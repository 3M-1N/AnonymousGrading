import React, {Component} from 'react'
import "./Login.css"
import UserStore from './UserStore'


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
                <label>Username : </label>
                <input type="text" placeholder="Enter Username" name="username" required value={this.state.username} onChange={this.handleChange} />
                <label>Password : </label>
                <input type="password" placeholder="Enter Password" name="password" required value={this.state.password} onChange={this.handleChange} />

                <div className="buttons_container">
                    <button type="submit" id="btn_login" >Login</button>
                    <button type="submit" id="btn_register" onClick={this.register}  >Register</button>
                </div>

                <label>Teacher account </label>
                <input type="checkbox" name="teacher"  defaultChecked={this.state.isTeacher} onChange={this.handleCheck} />
            </div>
        </form>);
    }


}

export default LoginForm