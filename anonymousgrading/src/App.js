import logo from './logo.svg';
import './App.css';
import MainPageTitle from './components/MainPageTitle.js'
import LoginForm from './components/LoginForm.js'

// function HelloWorldFunction(){ 


//   return(
//     <div>Hello world function</div>
//   )
// }


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPageTitle name="Cristina"/>
        <LoginForm />
      </header>
    </div>
  );
}

export default App;
