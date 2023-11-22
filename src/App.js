import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/dashboard/Dashboard.js'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Activity from './Components/dashboard/Activity';
import Withdrawal from './Components/dashboard/Withdrawal';

function App() {
  return (
    <>

      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/withdrawal' element={<Withdrawal />} />
      </Routes>

    </>
  );
}

export default App;
