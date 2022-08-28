import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import GitHubUsers from './components/GitHubUsers';
import Avatar from './components/Avatar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <main>
      <div className='flex-container'>
          <Avatar username="erradi" picName='abdelkarim_erradi02.jpg'/>
          <Avatar username="abdulla-alali" picName='Abdulla_Khalid.jpg'/>
      </div>

      <Welcome appName="My first React App"></Welcome>
      <Counter startValue={3} onChange={count => console.log(`Count from the child component: ${count}`)}/>
      <GitHubUsers />
      <App />
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
