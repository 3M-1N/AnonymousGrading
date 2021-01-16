import './App.css';
import MainPageTitle from './components/MainPageTitle.js'
import LoginForm from './components/LoginForm.js'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage';



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Switch>
          <Route path='/' exact>
            <LoginForm />
          </Route>
          <Route path='/:home'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
      </header>



    </div>
  );
}

export default App;
