import './App.css';
import LoginForm from './components/LoginForm.js'
import AddProjectForm from './components/AddProjectForm'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './components/HomePage';
import ProjectsPage from './components/TeamsPage'


function App() {
  return (
    <div className="">  
      <header className="">
      <Router>
        <Switch>
          <Route path='/' exact>
            <LoginForm />
          </Route>
          <Route path='/home/:userName' >
            <HomePage />
          </Route>
          <Route path='/projects/:userName/:juryFor' >
            <ProjectsPage />
          </Route>
        </Switch>
      </Router>
      </header>

    </div>
  );
}

export default App;
