import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/students/StudentList';
import AddStudent from './components/students/AddStudent';
import SingleStudent from './components/students/SingleStudent';
import AddCompany from './components/students/AddCompany';
import EditCompany from './components/students/EditCompany';
import Course from './components/course/Course';
import AddCourse from './components/course/AddCourse';
import EditCourse from './components/course/EditCourse';
import EditStudent from './components/students/EditStudent';
import ProtectedLayout from './components/ProtectedLayout';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
// import NewOrder from './components/course/NewOrder';

// https://bpa.st/RTHQ

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedLayout />}>

            <Route path='/' element={<StudentList />} />
            <Route path='/single_student/:student_id' element={<SingleStudent />} />
            <Route path='/add_student' element={<AddStudent />} />
            <Route path='/edit_std/:student_edit' element={<EditStudent />} />

            <Route path='/add-company/:student_id1' element={<AddCompany />} />
            <Route path='/edit-company/:edit_id' element={<EditCompany />} />

            <Route path='/course' element={<Course />} />
            <Route path='/add-course' element={<AddCourse />} />
            <Route path='/edit-course/:course_id' element={<EditCourse />} />

            {/* <Route path='/order' element={<NewOrder/>}/> */}

          </Route>

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />

        </Routes>


      </Router>

    </div>
  );
}

export default App;
