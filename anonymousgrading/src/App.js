import './App.css';
import MainPageTitle from './components/MainPageTitle.js'
import LoginForm from './components/LoginForm.js'
import AddProjectForm from './components/AddProjectForm'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Switch>
          <Route path='/' exact>
            <AddProjectForm />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
      </header>



    </div>
  );
}

export default App;
