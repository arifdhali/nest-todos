import { Link, Outlet } from 'react-router'
import './App.css'


function App() {


  return <>
    <Link to={"/auth/login"}>Login</Link>
    <Link to={"/auth/register"}>Register</Link>
    <Link to={"/dashboard"}>Dashboard</Link>
    <Outlet />
  </>
}

export default App
