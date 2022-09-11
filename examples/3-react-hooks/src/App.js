import logo from './logo.svg';
import './App.css';
import FavoriteColor from './components/1-UseState-UseEffect';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import GitHubUsers from './components/GitHubUsers';
import Avatar from './components/Avatar';
import Bulb from './components/Bulb';
import Surahs from './components/Surahs';
import SurahExplorer from './components/SurahExplorer';
import FriendsList from './components/FriendsList';
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';
import ProductForm2 from './components/ProductForm-Reducer';
import Counter2 from './components/CounterReducer';
import UseContextApp from './components/UseContextApp';
import UseContextExample from './components/UseContextExample';
import SurahSelector from './components/SurahSelector';
import WindowSize from './components/2-Useffect-Cleanup';
import FocusInput from './components/4-UseRef';
import HookTimer from './components/4-UseRef2';

function App() {
  return (
    <div className="App">
      <FavoriteColor />

    { /* 
      <LoginForm />
      <Welcome name="Fatima Saida" age="18">
        <h2>Welcome to QU</h2>
        <img src="http://www.qu.edu.qa/static_file/qu/About/images/logotype.png" alt='QU Logo'/>
        <br></br>
      </Welcome>

      <Welcome name="Sara Faleh" age="20">
      </Welcome>

     <SurahExplorer />
     <Bulb />
     <Welcome appName="Salam from first React App"></Welcome>

      <div className='flex-container'>
          <Avatar username="erradi" picName='abdelkarim_erradi02.jpg'/>
          <Avatar username="abdulla-alali" picName='Abdulla_Khalid.jpg'/>
      </div>

      
      <Counter startValue={3} onChange={count => console.log(`Count from the child component: ${count}`)}/>
      <GitHubUsers />
      <App /> */ }
    </div>
  );
}

export default App;
