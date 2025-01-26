import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Verify from "./pages/Auth/verify";
import Footer from "./components/footer/footer";
import About from  "./pages/about/about";
import Account from './pages/account/account';
import { useUserData } from './context/userContext';
import Courses from './pages/courses/Courses';
import CourseDescription from './pages/courseDescription/CourseDescripton';
import Lectures from './pages/home/lectures/lecture';
import AddLecture from './pages/home/lectures/addLecture';
import AddCourse from './pages/courses/AddCourse';
import Dashboard from './pages/dashboard/Dashboard';
function App() {
   const {isAuth}=useUserData();
   return (
      <BrowserRouter>
      <Header isAuth={isAuth}/>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/courses/:id" element={<CourseDescription/>}/>
        <Route path="/courses/study/:id" element={<Lectures/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/lecture/add/:id" element={<AddLecture/>}/>
        <Route path="/courses/add" element={<AddCourse/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
   )
}

export default App
