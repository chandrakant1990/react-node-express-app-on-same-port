import React,{useRef} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const resultRef=useRef(null);
  const getServerData=()=>{
    fetch("/getDataFromServer", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id:123})
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      if(resultRef.current!=null){
        resultRef.current.innerHTML=result.content;
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is Client side code in React. <a href='javascript:void(0)' onClick={getServerData}>Click Here</a>
        </p>
        <div>This is the example of React Nodejs.</div>
        <div ref={resultRef}></div>
        
      </header>
    </div>
  );
}

export default App;
