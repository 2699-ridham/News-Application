import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
            {/* for remount we give route a unique key so it can refresh the with new category */}
            <Route exact path="/"><News key="general" pageSize={8} country="in" category="general"/></Route> 
            <Route exact path="/business"><News key="buisness" pageSize={8} country="in" category="buisness"/></Route>            
            <Route exact path="/entertainment"><News key="entertainment" pageSize={8} country="in" category="entertainment"/></Route>
            <Route exact path="/general"><News key="general" pageSize={8} country="in" category="general"/></Route>
            <Route exact path="/health"><News key="health" pageSize={8} country="in" category="health"/></Route>
            <Route exact path="/science"><News key="science" pageSize={8} country="in" category="science"/></Route>
            <Route exact path="/sports"><News key="sports" pageSize={8} country="in" category="sports"/></Route>
            <Route exact path="/technology"><News key="technology" pageSize={8} country="in" category="technology"/></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}


