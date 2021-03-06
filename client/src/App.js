import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/"]}>
            <Search />
          </Route>
          <Route exact path="/books">
            <Books />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
