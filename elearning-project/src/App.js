import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing
// import { BrowserRouter as Bw, Routes, Route } from "react-router-dom";


// Components
import Header from './components/Header';
import Home from './components/Home';

//Styles
import { GlobalStyle } from './GlobalStyle';


const App = () => {

  return(
    <div className="App">
      <Header/>
      Start here...
      <GlobalStyle/>
    </div> 
  );
}

export default App;



