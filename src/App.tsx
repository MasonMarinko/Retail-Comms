import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ItemHome} from "./Pages/ItemHome";
import Nav from './Components/Nav';
import {Login} from "./Pages/Login";

const App: React.FC = () => {
    return (
        <Router>
        <div className="App">
            <Nav/>
            <Switch>
            <Route exact path="/" component={ItemHome} />
              <Route exact path="/Login" component={Login} />
              {/* <Route exact path="/signup" component={Signup} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/admin" component={Admin} />
              <Route component={NoMatch} /> */}
            </Switch>
        </div>
        </Router>
    )
}

export default App
