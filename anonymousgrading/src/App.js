import './App.css';

import LoginForm from './components/LoginForm.js'
import AddProjectForm from './components/AddProjectForm'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';

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
          <Route path='/' exact>
            <LoginForm />
          </Route>
          <Route path='/home/:userName' >
            <HomePage />
          </Route>
        </Switch>
      </Router>
      </header>



    </div>
  );
}

export default App;
