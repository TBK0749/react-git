
import React, { useState } from "react";
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
import Summary from "./pages/Summary";
import CreateStudents from "./pages/CreateStudents";
import EditStudents from "./pages/EditStudents";

// 1. คลิก link Students
// 2. React router library พาเราไปที่ /students
// 3. ทุกที่ ที่มี switch อยู่ใน Router จะทำการเช็คว่ามันต้อง render Route ไหน

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
              <div className="menu__item">
                <Link to="/summary">Summary</Link>
              </div>
            </div>

            <div className="content">
              <Switch>
                <Route exact path="/students/:studentId/edit">
                  <EditStudents />
                </Route>
                <Route exact path="/students/create">
                  <CreateStudents />
                </Route>
                <Route exact path="/summary">
                  <Summary />
                </Route>
                <Route exact path="/students/:studentId">
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
