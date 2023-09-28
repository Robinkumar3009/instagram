import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import React,{createContext,useState} from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './component/Home';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Profile from './component/Profile';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import CreatePost from './component/CreatePost';
import { LoginContext } from './context/LoginContext';
import Modal from './component/Modal';


function App() {

  const [userLogin,setUserLogin]=useState(false)
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>

     <Navbar login={userLogin}/>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/createPost" element={<CreatePost />}></Route>
     </Routes>
      </LoginContext.Provider>
      <ToastContainer theme='dark'/>
    {/*  */}
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
    </div>
    </BrowserRouter>
  );
}

export default App;
