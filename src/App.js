import React, { Component } from 'react';

import Home from './components/Home';

import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";

class App extends Component {
  render(){
    return(
      <div>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/test"}>test</Link>
        </div>
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route path={"/test"}>
            <div>
              /test
            </div>
          </Route>
        </Switch>
        {/*{process.env.NODE_ENV === 'development' && <DevTools/>}*/}
      </div>
    )
  }
}

export default App;
