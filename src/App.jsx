import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { useState, createContext, useEffect } from "react";

import "./App.css";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Price from "./pages/Price";
import Contact from "./pages/Contact";
import RootLayouts from "./layouts/RootLayouts";
import NotFound from "./pages/NotFound";

import Student from "./pages/signin/Student";
import Lecturer from "./pages/signin/Lecturer";
import Register_Institution, {
  institutionRegister,
} from "./pages/Register_Institution";
import InstitutionMain from "./pages/institution/InstitutionMain";
import StudentLayout from "./layouts/StudentLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import Signin from "./pages/Signin";
import LecturerLayout from "./layouts/LecturerLayout";
import LecturerMain from "./pages/Lecturer/LecturerMain";
import StudentMain from "./pages/student/StudentMain";
import LecturerHome from "./pages/Lecturer/LecturerHome";
import InstitutionLayout from "./layouts/InstitutionLayout";
import Construction from "./pages/Construction";
import InstitutionHome from "./pages/institution/InstitutionHome";
import ProtectedRoute from "./layouts/ProtectedRoute";
import LecturerCode from "./features/lecturer/LecturerCode";

import StudentPinPage from "./features/student/StudentPinPage";
import StudentLogin from "./Login/StudentLogin";
import StudentSuccess from "./features/student/StudentSuccess";
import StudentList from "./features/student/studentList";
import LecturerLogin from "./Login/LecturerLogin";
import { selectCurrentToken as selectStudentToken } from "./features/studentAuth/studentAuthSlice"
import { selectCurrentToken as selectLecturerToken } from "./features/lecturerAuth/lecturerAuthSlice"
import PersistLecturerLogin from "./Login/PersistLecturerLogin";
import PersistStudentLogin from "./Login/PersistStudentLogin";
import StudentHome from "./pages/student/StudentHome";
import Demo from "./pages/Demo";
import AttendanceForm from "./pages/student/AttendanceForm";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayouts />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="price" element={<Price />} />
        <Route path="contact" element={<Contact />} />

        <Route
          path="register-institution"
          element={<Register_Institution />}
          action={institutionRegister}
        />
      </Route>
      <Route path="signin" element={<RegisterLayout />}>
        <Route index element={<Signin />} />
        <Route
          path="student"
          element={<Student />}
          // action={studentRegister}
        />
        <Route
          path="lecturer"
          element={<Lecturer />}
          // action={lecturerRegister}
        />
      </Route>
      <Route element={<PersistLecturerLogin />}>
      <Route
        path="lecturer/:id"
        element={
          <ProtectedRoute roles={['Lecturer']} selector={selectLecturerToken} requiredRole="Lecturer">
            <LecturerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LecturerHome />} />
        <Route path="new" element={<LecturerMain />} />
      </Route>
      </Route>
      <Route element={<PersistStudentLogin/>}>
      <Route
        path="student/:id"
        element={
          <ProtectedRoute roles={['Student']} selector={selectStudentToken} requiredRole="Student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentHome />} />
        <Route path="new" element={<StudentMain />} />
      </Route>
      </Route>
      <Route path="institution" element={<InstitutionLayout />}>
        <Route index element={<InstitutionMain />} />
        <Route path="home" element={<InstitutionHome />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="construction" element={<Construction />} />
        <Route path="demo" element={<Demo />} />
     
      
      <Route path="student/login" element={<StudentLogin />}></Route>
      <Route path="lecturer/login" element={<LecturerLogin />}></Route>
      <Route path="pin/:id" element={<StudentPinPage />}>
        {" "}
      </Route>
      <Route path="code/:id" element={<LecturerCode />}>
        {" "}
      </Route>
      <Route path='submit-attendance' element={<AttendanceForm/>}></Route>
    </>
  )
);

function App() {
  
  return (
      <RouterProvider router={router} />
  );
}

export default App;
