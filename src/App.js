
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
import { StudentsContext } from "./context/StudentsContext";
import CreateStudents from "./pages/CreateStudents";

// 1. คลิก link Students
// 2. React router library พาเราไปที่ /students
// 3. ทุกที่ ที่มี switch อยู่ใน Router จะทำการเช็คว่ามันต้อง render Route ไหน

const initialStudents = [
  { id: 1, name: 'John Doe', bio: 'John is a man' },
  { id: 2, name: 'Jane Doe', bio: 'Jane is a girl' },
  { id: 3, name: 'Marie Joshoua', bio: 'Marie is a girl/man' },
];

function App() {
  const [students, setStudents] = useState(initialStudents);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
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
    </StudentsContext.Provider>
  );
}

export default App;
