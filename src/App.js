
import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StudentDetails from './pages/StudentDetails';
import Students from './pages/Students';
import Home from './pages/Home';

function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <div className="menu">
            <div className="menu__item">
              <Link to="/">Home</Link>
            </div>
            <div className="menu__item">
              <Link to="/students">Students</Link>
            </div>
          </div>

          <div className="content">
            <Switch>
              <Route exact path="/students/:id">
                <StudentDetails />
              </Route>
              <Route exact path="/students">
                <Students />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
