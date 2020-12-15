import React from 'react'
import "./Login.css"


class LoginForm extends React.Component {

    render() {
        return (<form>
            <div class="container">
                <label>Username : </label>
                <input type="text" placeholder="Enter Username" name="username" required />
                <label>Password : </label>
                <input type="password" placeholder="Enter Password" name="password" required />

                <div class="buttons_container">
                    <button type="submit" id="btn_login">Login</button>
                    <button type="submit" id="btn_register">Register</button>
                </div>

                <label>Teacher account </label>
                <input type="checkbox" name="teacher" value="Teacher Account" />
            </div>
        </form>);
    }


}

export default LoginForm