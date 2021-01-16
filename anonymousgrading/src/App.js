import './App.css';
import MainPageTitle from './components/MainPageTitle.js'
import LoginForm from './components/LoginForm.js'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPageTitle />
        <LoginForm />
      </header>
    </div>
  );
}

export default App;
