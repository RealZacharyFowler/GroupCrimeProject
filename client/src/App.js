import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from "./components/Login";
import  Register from "./components/Register";
import  Dashboard  from "./components/Dashboard";
import DisplayAll from "./components/DisplayAll";
import CrimeForm from "./components/CrimeForm";
import EditCrimeForm from './components/EditCrimeForm';

function App() {

  const [user, setUser] = useState({})

  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/allcrimes" element={<DisplayAll user={user} />} />
          <Route path='/' element={<Register setUser={setUser}/>}/>
          <Route path='/login' element={<Login setUser={setUser}/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/newcrime" element={<CrimeForm />} />
          <Route path="/edit/:id" element={<EditCrimeForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;