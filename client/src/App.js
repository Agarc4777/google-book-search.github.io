import React from "react";
import "./App.css";

function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path={["/", "/books"]}>
          <Search />
        </Route>
        <Route exact path="/books/:id">
          <Detail />
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
