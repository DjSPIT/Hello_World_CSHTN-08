import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing
import { BrowserRouter as Bw, Routes, Route, Link , Switch} from "react-router-dom";


// Context
import ContextProvider from './context';

// Components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';

//Styles
import { GlobalStyle } from './GlobalStyle';


const App = () => {

  return(
    <Bw>
    <ContextProvider>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <GlobalStyle/>
      </Switch>  
    </ContextProvider>
    </Bw> 
  );
}

export default App;



