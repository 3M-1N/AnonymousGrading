import './App.css';

import LoginForm from './components/LoginForm.js'
import {HashRouter as Router, Route, Switch} from 'react-router-dom' 
import Home from './Home'

// function HelloWorldFunction(){ 


//   return(
//     <div>Hello world function</div>
//   )
// }


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Router>
            <Switch>
              <Route path = '/' exact>
                <LoginForm />
              </Route>
              <Route path='/home/:userName' >
                <Home />
              </Route>
            </Switch>
          </Router>
      </header>
    </div>
  );
}

export default App;
