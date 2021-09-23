import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing
import { BrowserRouter as Bw, Routes, Route, Link , Switch} from "react-router-dom";


// Context
import ContextProvider from './context';

// Components
import Header from './components/Header';
import Home from './components/Home';
import Exercises from './components/Exercises';
import Tutorials from './components/Tutorials';
import Material from './components/Material';
import Login from './components/Login';
import SideNav from './components/SideNav';

//Styles
import { GlobalStyle } from './GlobalStyle';


const App = () => {

  return(
    <Bw>
    <ContextProvider>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/tutorials" component={Tutorials}/>
        <Route path="/exercises" component={Exercises}/>
        <Route path="/material" component={Material}/>
        <Route path="/login" component={Login}/>
        <GlobalStyle/>
      </Switch>  
    </ContextProvider>
    </Bw> 
  );
}

export default App;



